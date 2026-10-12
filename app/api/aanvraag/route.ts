import { z } from "zod";
import { respond, serverError, tooManyRequests } from "@/lib/api";
import { getMailer } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { aanvraagSchema, ATTACHMENT_RULES, HONEYPOT_FIELD, validateAttachments } from "@/lib/schemas";
import { getStorage } from "@/lib/storage";

/** Upper bound for the whole multipart body: all attachments plus form fields. */
const MAX_BODY = ATTACHMENT_RULES.maxFiles * ATTACHMENT_RULES.maxFileSize + 1024 * 1024;

export async function POST(request: Request) {
  if (!rateLimit(`aanvraag:${clientKey(request)}`)) return tooManyRequests();

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) {
    return respond({ ok: false, errors: { form: ["De bijlagen zijn samen te groot."] } }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond({ ok: false, errors: { form: ["Het formulier kon niet worden gelezen."] } }, 400);
  }

  // Honeypot filled: pretend success so bots learn nothing
  if (String(form.get(HONEYPOT_FIELD) ?? "").length > 0) return respond({ ok: true });

  const text = (key: string) => String(form.get(key) ?? "");
  const parsed = aanvraagSchema.safeParse({
    bedrijfsnaam: text("bedrijfsnaam"),
    organisatieType: text("organisatieType"),
    contactpersoon: text("contactpersoon"),
    functie: text("functie"),
    email: text("email"),
    telefoon: text("telefoon"),
    project: text("project"),
    aantalKeukens: text("aantalKeukens"),
    leverperiode: text("leverperiode"),
    specificaties: text("specificaties"),
    opmerkingen: text("opmerkingen"),
    privacy: text("privacy") === "true",
  });

  if (!parsed.success) {
    return respond({ ok: false, errors: z.flattenError(parsed.error).fieldErrors }, 422);
  }

  const files = form.getAll("bijlagen").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const fileError = validateAttachments(files);
  if (fileError) return respond({ ok: false, errors: { form: [fileError] } }, 422);

  try {
    const data = parsed.data;
    const folder = `aanvragen/${Date.now()}-${data.bedrijfsnaam.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
    const storage = getStorage();
    const stored = await Promise.all(files.map((file) => storage.save(file, folder)));

    await getMailer().send({
      subject: `Nieuwe aanvraag: ${data.project} (${data.aantalKeukens} keukens)`,
      replyTo: data.email,
      text: [
        `Bedrijf: ${data.bedrijfsnaam} (${data.organisatieType || "type niet opgegeven"})`,
        `Contact: ${data.contactpersoon}${data.functie ? `, ${data.functie}` : ""}`,
        `E-mail: ${data.email}`,
        `Telefoon: ${data.telefoon}`,
        `Project: ${data.project}`,
        `Aantal keukens: ${data.aantalKeukens}`,
        `Leverperiode: ${data.leverperiode || "niet opgegeven"}`,
        `Specificaties: ${data.specificaties || "geen"}`,
        `Opmerkingen: ${data.opmerkingen || "geen"}`,
        `Bijlagen: ${stored.map((file) => `${file.name}${file.url ? ` (${file.url})` : ""}`).join(", ") || "geen"}`,
      ].join("\n"),
    });

    return respond({ ok: true });
  } catch (error) {
    console.error("[api/aanvraag]", error);
    return serverError();
  }
}
