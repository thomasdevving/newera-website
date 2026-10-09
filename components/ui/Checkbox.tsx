import type { ComponentPropsWithRef, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type"> & { label: ReactNode };

/** Square checkbox; the native input stays in the DOM for keyboard and forms. */
export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={cn("group flex cursor-pointer items-start gap-3 text-[15px] text-ink", className)}>
      <span className="relative mt-[2px] inline-flex h-5 w-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none border border-line-strong bg-elevated transition-colors duration-300 checked:border-accent checked:bg-accent hover:border-ink/40 aria-[invalid=true]:border-error"
          {...props}
        />
        <Check aria-hidden className="pointer-events-none relative m-auto h-3.5 w-3.5 scale-50 text-bg opacity-0 transition-[opacity,transform] duration-300 ease-out-expo peer-checked:scale-100 peer-checked:opacity-100" strokeWidth={2.5} />
      </span>
      <span>{label}</span>
    </label>
  );
}
