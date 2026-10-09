import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label, control, helper text and error, linked through ids for aria-describedby. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-[15px] text-ink">
        <span>
          {label}
          {required && (
            <span className="text-accent" aria-hidden>
              {" "}
              *
            </span>
          )}
        </span>
        {!required && <span className="text-xs text-muted">Optioneel</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-2 text-sm text-error">
          <CircleAlert aria-hidden className="mt-[3px] h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria props for a control inside <Field>. */
export function describedBy(id: string, { hint, error }: { hint?: string; error?: string }) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}
