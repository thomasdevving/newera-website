import { z } from "zod";

/**
 * Shared validation for the request and contact forms.
 * Imported by the client (react-hook-form) and by the API route handlers.
 */

export const organisationTypes = [
  "Aannemer",
  "Projectontwikkelaar",
  "Woningcorporatie",
  "Installateur/bouwpartner",
  "Anders",
] as const;

/** Name of the hidden spam trap field. Real visitors never fill it. */
export const HONEYPOT_FIELD = "website";

/** Accepts Dutch numbers (06, 010, +31, 0031) and other international numbers. */
const phonePattern = /^(\+|00)?[0-9]{9,15}$/;
const normalisePhone = (value: string) => value.replace(/[\s\-().]/g, "");

const required = (message: string) => z.string().trim().min(1, message);

export const aanvraagSchema = z.object({
  bedrijfsnaam: required("Vul uw bedrijfsnaam in").max(120, "Gebruik maximaal 120 tekens"),
  organisatieType: z.enum(organisationTypes, { message: "Kies het type organisatie" }),
  contactpersoon: required("Vul de naam van de contactpersoon in").max(120, "Gebruik maximaal 120 tekens"),
  functie: z.string().trim().max(120, "Gebruik maximaal 120 tekens"),
  email: required("Vul uw e-mailadres in").pipe(z.email("Voer een geldig e-mailadres in")),
  telefoon: required("Vul uw telefoonnummer in").refine(
    (value) => phonePattern.test(normalisePhone(value)),
    "Voer een geldig telefoonnummer in, bijvoorbeeld 06 12345678",
  ),
  project: required("Vul de projectnaam of locatie in").max(160, "Gebruik maximaal 160 tekens"),
  aantalKeukens: required("Vul het aantal keukens in")
    .regex(/^\d+$/, "Voer een heel getal in")
    .refine((value) => Number(value) >= 1, "Het aantal keukens is minimaal 1")
    .refine((value) => Number(value) <= 10000, "Controleer het aantal keukens"),
  leverperiode: z.string().trim().max(80, "Gebruik maximaal 80 tekens"),
  specificaties: z.string().trim().max(4000, "Gebruik maximaal 4000 tekens"),
  opmerkingen: z.string().trim().max(4000, "Gebruik maximaal 4000 tekens"),
  privacy: z.boolean().refine((value) => value, "Ga akkoord met de privacyverklaring om verder te gaan"),
});

export type AanvraagInput = z.infer<typeof aanvraagSchema>;

export const contactSchema = z.object({
  naam: required("Vul uw naam in").max(120, "Gebruik maximaal 120 tekens"),
  email: required("Vul uw e-mailadres in").pipe(z.email("Voer een geldig e-mailadres in")),
  bericht: required("Schrijf een bericht").max(4000, "Gebruik maximaal 4000 tekens"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ---------- Attachments ---------- */

export const ATTACHMENT_RULES = {
  maxFiles: 5,
  maxFileSize: 10 * 1024 * 1024,
  extensions: [".pdf", ".jpg", ".jpeg", ".png", ".dwg"],
  accept: ".pdf,.jpg,.jpeg,.png,.dwg",
} as const;

type FileLike = { name: string; size: number };

/** Returns a Dutch error message per invalid file, or null when the set is valid. */
export function validateAttachments(files: FileLike[]): string | null {
  if (files.length > ATTACHMENT_RULES.maxFiles) {
    return `U kunt maximaal ${ATTACHMENT_RULES.maxFiles} bestanden toevoegen`;
  }
  for (const file of files) {
    const error = validateAttachment(file);
    if (error) return error;
  }
  return null;
}

export function validateAttachment(file: FileLike): string | null {
  const name = file.name.toLowerCase();
  if (!ATTACHMENT_RULES.extensions.some((ext) => name.endsWith(ext))) {
    return `${file.name}: alleen PDF, JPG, PNG of DWG is toegestaan`;
  }
  if (file.size > ATTACHMENT_RULES.maxFileSize) {
    return `${file.name}: het bestand is groter dan 10 MB`;
  }
  if (file.size === 0) {
    return `${file.name}: het bestand is leeg`;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/** API response contract for both form endpoints. */
export type FormResponse =
  | { ok: true }
  | { ok: false; errors: Record<string, string[] | undefined> & { form?: string[] } };
