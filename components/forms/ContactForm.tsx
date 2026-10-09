"use client";

import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, describedBy } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { easeOut } from "@/lib/motion";
import { contactSchema, HONEYPOT_FIELD, type ContactInput, type FormResponse } from "@/lib/schemas";
import { Honeypot } from "./Honeypot";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: "onTouched", defaultValues: { naam: "", email: "", bericht: "" } });

  const onSubmit = async (values: ContactInput, event?: BaseSyntheticEvent) => {
    setStatus("submitting");
    const formElement = event?.target instanceof HTMLFormElement ? event.target : null;
    const trap = formElement ? String(new FormData(formElement).get(HONEYPOT_FIELD) ?? "") : "";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: trap }),
      });
      const result = (await response.json().catch(() => null)) as FormResponse | null;
      if (!result?.ok) throw new Error();
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="border border-line-strong bg-elevated p-7 md:p-10"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center bg-accent text-bg">
            <Check aria-hidden className="h-5 w-5" strokeWidth={2} />
          </span>
          <h2 className="mt-6 text-2xl font-light">Bedankt voor uw bericht.</h2>
          <p className="mt-3 text-muted">Wij reageren zo snel mogelijk.</p>
          <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
            Nog een bericht sturen
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative flex flex-col gap-6"
          aria-busy={submitting}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field id="naam" label="Naam" required error={errors.naam?.message}>
              <Input id="naam" autoComplete="name" {...describedBy("naam", { error: errors.naam?.message })} {...register("naam")} />
            </Field>
            <Field id="contact-email" label="E-mailadres" required error={errors.email?.message}>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                {...describedBy("contact-email", { error: errors.email?.message })}
                {...register("email")}
              />
            </Field>
          </div>
          <Field id="bericht" label="Bericht" required error={errors.bericht?.message}>
            <Textarea id="bericht" rows={6} {...describedBy("bericht", { error: errors.bericht?.message })} {...register("bericht")} />
          </Field>
          <Honeypot />

          {status === "error" && (
            <p role="alert" className="flex items-start gap-3 border border-error/50 bg-error/10 p-4 text-ink">
              <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-error" strokeWidth={1.5} />
              Uw bericht is niet verzonden. Probeer het opnieuw of neem telefonisch contact op.
            </p>
          )}

          <div>
            <Button type="submit" size="lg" disabled={submitting} arrow={!submitting}>
              {submitting ? (
                <>
                  <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                  Bezig met verzenden
                </>
              ) : (
                "Bericht versturen"
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
