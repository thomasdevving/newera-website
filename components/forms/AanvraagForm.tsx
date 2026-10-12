"use client";

import Link from "next/link";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, LoaderCircle, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field, describedBy } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { aanvraagSchema, formatFileSize, HONEYPOT_FIELD, organisationTypes, type AanvraagInput, type FormResponse } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";
import { FileDrop } from "./FileDrop";
import { Honeypot } from "./Honeypot";

type Status = "idle" | "submitting" | "success" | "error";

const OPTIONAL_FIELDS = ["organisatieType", "functie", "leverperiode", "specificaties", "opmerkingen"] as const;

const defaultValues: AanvraagInput = {
  bedrijfsnaam: "",
  organisatieType: "" as AanvraagInput["organisatieType"],
  contactpersoon: "",
  functie: "",
  email: "",
  telefoon: "",
  project: "",
  aantalKeukens: "",
  leverperiode: "",
  specificaties: "",
  opmerkingen: "",
  privacy: false,
};

export function AanvraagForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const [submitted, setSubmitted] = useState<{ values: AanvraagInput; files: File[] } | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AanvraagInput>({ resolver: zodResolver(aanvraagSchema), mode: "onTouched", defaultValues });

  // Errors inside the collapsed section must never stay hidden
  const hiddenError = OPTIONAL_FIELDS.some((name) => errors[name]);
  if (hiddenError && !moreOpen) setMoreOpen(true);

  const onSubmit = async (values: AanvraagInput, event?: BaseSyntheticEvent) => {
    setStatus("submitting");
    setServerError(null);

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) body.append(key, String(value));
    const formElement = event?.target instanceof HTMLFormElement ? event.target : null;
    body.append(HONEYPOT_FIELD, String(formElement ? (new FormData(formElement).get(HONEYPOT_FIELD) ?? "") : ""));
    for (const file of files) body.append("bijlagen", file);

    try {
      const response = await fetch("/api/aanvraag", { method: "POST", body });
      if (response.status === 413) {
        throw new Error("De bijlagen zijn samen te groot om te verzenden. Verwijder een of meer bestanden en dien de aanvraag opnieuw in; u kunt ze later nasturen.");
      }
      const result = (await response.json().catch(() => null)) as FormResponse | null;
      if (result?.ok) {
        setSubmitted({ values, files });
        setStatus("success");
        reset(defaultValues);
        setFiles([]);
        setMoreOpen(false);
        document.getElementById("aanvraag-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (result && !result.ok) {
        const { form, ...fieldErrors } = result.errors;
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (messages?.[0] && field in defaultValues) setError(field as keyof AanvraagInput, { message: messages[0] });
        }
        throw new Error(form?.[0] ?? "Controleer de gemarkeerde velden en probeer het opnieuw.");
      }
      throw new Error("Er ging iets mis bij het verzenden.");
    } catch (error) {
      setServerError(error instanceof Error && error.message !== "Failed to fetch" ? error.message : "Er ging iets mis bij het verzenden. Controleer uw verbinding en probeer het opnieuw.");
      setStatus("error");
    }
  };

  const submitting = status === "submitting";
  const field = (name: keyof AanvraagInput, hint?: string) => ({
    id: name,
    ...describedBy(name, { hint, error: errors[name]?.message }),
  });

  return (
    <div id="aanvraag-top" className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" && submitted ? (
          <Confirmation key="success" submitted={submitted} onReset={() => setStatus("idle")} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: easeOut }}
            aria-busy={submitting}
          >
            <p className="mb-8 text-sm text-muted">
              Velden met <span className="text-accent">*</span> zijn verplicht.
            </p>

            <fieldset className="grid gap-5 md:grid-cols-2">
              <legend className="sr-only">Uw gegevens en project</legend>
              <Field id="bedrijfsnaam" label="Bedrijfsnaam" required error={errors.bedrijfsnaam?.message}>
                <Input {...field("bedrijfsnaam")} autoComplete="organization" {...register("bedrijfsnaam")} />
              </Field>
              <Field id="contactpersoon" label="Contactpersoon" required error={errors.contactpersoon?.message}>
                <Input {...field("contactpersoon")} autoComplete="name" {...register("contactpersoon")} />
              </Field>
              <Field id="email" label="E-mailadres" required error={errors.email?.message}>
                <Input {...field("email")} type="email" autoComplete="email" inputMode="email" {...register("email")} />
              </Field>
              <Field id="telefoon" label="Telefoonnummer" required error={errors.telefoon?.message}>
                <Input {...field("telefoon")} type="tel" autoComplete="tel" inputMode="tel" placeholder="06 12345678" {...register("telefoon")} />
              </Field>
              <Field id="project" label="Projectnaam of locatie" required error={errors.project?.message}>
                <Input {...field("project")} {...register("project")} />
              </Field>
              <Field id="aantalKeukens" label="Aantal keukens" required error={errors.aantalKeukens?.message}>
                <Input {...field("aantalKeukens")} type="number" min={1} step={1} inputMode="numeric" {...register("aantalKeukens")} />
              </Field>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="mb-3 flex w-full items-baseline justify-between text-[15px]">
                <span>Plattegronden en bijlagen</span>
                <span className="text-xs text-muted">Optioneel</span>
              </legend>
              <FileDrop files={files} onChange={setFiles} disabled={submitting} />
            </fieldset>

            {/* Optional details, collapsed by default */}
            <div className="mt-8 border-y border-line">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-controls="meer-details"
                className="group flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] transition-colors hover:text-accent"
              >
                <span>
                  Meer details <span className="text-muted">(optioneel)</span>
                </span>
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center border transition-[transform,border-color,background-color,color] duration-500 ease-out-expo",
                    moreOpen ? "rotate-45 border-accent bg-accent text-bg" : "border-line-strong group-hover:border-accent",
                  )}
                >
                  <Plus aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
              <motion.div
                id="meer-details"
                initial={false}
                animate={{ height: moreOpen ? "auto" : 0, opacity: moreOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="overflow-hidden"
                inert={!moreOpen}
              >
                <fieldset className="grid gap-5 pb-6 pt-1 md:grid-cols-2">
                  <legend className="sr-only">Meer details</legend>
                  <Field id="organisatieType" label="Type organisatie" error={errors.organisatieType?.message}>
                    <Select {...field("organisatieType")} {...register("organisatieType")}>
                      <option value="">Kies een type</option>
                      {organisationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field id="functie" label="Functie" error={errors.functie?.message}>
                    <Input {...field("functie")} autoComplete="organization-title" placeholder="Bijvoorbeeld werkvoorbereider" {...register("functie")} />
                  </Field>
                  <Field id="leverperiode" label="Gewenste leverweek of periode" hint="Bijvoorbeeld week 40 2026" error={errors.leverperiode?.message}>
                    <Input {...field("leverperiode", "Bijvoorbeeld week 40 2026")} {...register("leverperiode")} />
                  </Field>
                  <Field id="specificaties" label="Merkvoorkeur of specificaties" error={errors.specificaties?.message} className="md:col-span-2">
                    <Textarea rows={3} {...field("specificaties")} placeholder="Merk, kleur, apparatuur of andere eisen" {...register("specificaties")} />
                  </Field>
                  <Field id="opmerkingen" label="Opmerkingen" error={errors.opmerkingen?.message} className="md:col-span-2">
                    <Textarea rows={3} {...field("opmerkingen")} {...register("opmerkingen")} />
                  </Field>
                </fieldset>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <Checkbox
                id="privacy"
                {...describedBy("privacy", { error: errors.privacy?.message })}
                label={
                  <>
                    Ik ga akkoord met de{" "}
                    <Link href="/privacy" target="_blank" className="text-accent underline">
                      privacyverklaring
                    </Link>
                    <span className="text-accent" aria-hidden>
                      {" "}
                      *
                    </span>
                  </>
                }
                {...register("privacy")}
              />
              {errors.privacy?.message && (
                <p id="privacy-error" role="alert" className="flex items-center gap-2 pl-8 text-sm text-error">
                  {errors.privacy.message}
                </p>
              )}
            </div>
            <Honeypot />

            <AnimatePresence>
              {status === "error" && serverError && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 flex gap-4 border border-error/50 bg-error/10 p-5">
                    <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-error" strokeWidth={1.5} />
                    <div>
                      <p className="text-ink">Uw aanvraag is niet verzonden.</p>
                      <p className="mt-1 text-muted">{serverError}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">Wij gebruiken uw gegevens alleen om uw aanvraag te behandelen.</p>
              <Button type="submit" size="lg" disabled={submitting} arrow={!submitting}>
                {submitting ? (
                  <>
                    <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                    Bezig met verzenden
                  </>
                ) : status === "error" ? (
                  <>
                    <RotateCcw aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                    Opnieuw verzenden
                  </>
                ) : (
                  "Aanvraag indienen"
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Confirmation({ submitted, onReset }: { submitted: { values: AanvraagInput; files: File[] }; onReset: () => void }) {
  const { values, files } = submitted;
  const summary: Array<[string, string]> = [
    ["Bedrijfsnaam", values.bedrijfsnaam],
    ["Type organisatie", values.organisatieType || "Niet opgegeven"],
    ["Contactpersoon", [values.contactpersoon, values.functie].filter(Boolean).join(", ")],
    ["E-mailadres", values.email],
    ["Telefoonnummer", values.telefoon],
    ["Project", values.project],
    ["Aantal keukens", values.aantalKeukens],
    ["Leverperiode", values.leverperiode || "Niet opgegeven"],
    ["Bijlagen", files.length ? files.map((file) => `${file.name} (${formatFileSize(file.size)})`).join(", ") : "Geen, u kunt later aanvullen"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="border border-line-strong bg-elevated"
      role="status"
    >
      <div className="relative overflow-hidden border-b border-line p-7 md:p-10">
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
        />
        <motion.span
          className="inline-flex h-12 w-12 items-center justify-center bg-accent text-bg"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
        >
          <Check aria-hidden className="h-6 w-6" strokeWidth={2} />
        </motion.span>
        <h2 className="mt-8 text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight tracking-[-0.02em]">Bedankt voor uw aanvraag.</h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          Wij hebben uw gegevens ontvangen en nemen binnen {siteConfig.responseDays} werkdagen contact met u op.
        </p>
      </div>
      <div className="p-7 md:p-10">
        <h3 className="label-caps text-accent">Samenvatting</h3>
        <dl className="mt-6 border-t border-line">
          {summary.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="text-muted">{label}</dt>
              <dd className="break-words text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" arrow>
            Terug naar home
          </Button>
          <Button variant="secondary" onClick={onReset}>
            Nieuwe aanvraag
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
