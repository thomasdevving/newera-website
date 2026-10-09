import { z } from "zod";
import { respond, serverError, tooManyRequests } from "@/lib/api";
import { getMailer } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactSchema, HONEYPOT_FIELD } from "@/lib/schemas";

const MAX_BODY = 32 * 1024;

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`)) return tooManyRequests();

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return respond({ ok: false, errors: { form: ["Het bericht is te lang."] } }, 413);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return respond({ ok: false, errors: { form: ["Het formulier kon niet worden gelezen."] } }, 400);
  }

  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].length > 0) return respond({ ok: true });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return respond({ ok: false, errors: z.flattenError(parsed.error).fieldErrors }, 422);

  try {
    const { naam, email, bericht } = parsed.data;
    await getMailer().send({
      subject: `Contactformulier: ${naam}`,
      replyTo: email,
      text: `Naam: ${naam}\nE-mail: ${email}\n\n${bericht}`,
    });
    return respond({ ok: true });
  } catch (error) {
    console.error("[api/contact]", error);
    return serverError();
  }
}
