"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { ATTACHMENT_RULES, formatFileSize, validateAttachment } from "@/lib/schemas";

type FileDropProps = {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

/** Drag-and-drop upload with a removable file list. Validates type, size and count. */
export function FileDrop({ files, onChange, disabled }: FileDropProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = (incoming: File[]) => {
    const next = [...files];
    const problems: string[] = [];
    for (const file of incoming) {
      if (next.some((existing) => existing.name === file.name && existing.size === file.size)) continue;
      const problem = validateAttachment(file);
      if (problem) {
        problems.push(problem);
        continue;
      }
      if (next.length >= ATTACHMENT_RULES.maxFiles) {
        problems.push(`U kunt maximaal ${ATTACHMENT_RULES.maxFiles} bestanden toevoegen`);
        break;
      }
      next.push(file);
    }
    setError(problems[0] ?? null);
    onChange(next);
  };

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    add(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) add(Array.from(event.dataTransfer.files));
  };

  const remove = (index: number) => {
    setError(null);
    onChange(files.filter((_, current) => current !== index));
  };

  const full = files.length >= ATTACHMENT_RULES.maxFiles;

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled && !full) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "group relative flex cursor-pointer flex-col outline-offset-2 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-1 has-[input:focus-visible]:outline-accent items-center justify-center gap-3 overflow-hidden border border-dashed px-6 py-12 text-center transition-colors duration-300",
          dragging ? "border-accent bg-accent-soft" : "border-line-strong bg-elevated hover:border-accent",
          (disabled || full) && "pointer-events-none opacity-50",
        )}
      >
        <motion.span
          animate={{ y: dragging ? -4 : 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="inline-flex h-12 w-12 items-center justify-center border border-line-strong text-accent transition-colors group-hover:border-accent"
        >
          <Upload aria-hidden className="h-5 w-5" strokeWidth={1.5} />
        </motion.span>
        <span className="text-ink">
          {full ? "Maximum aantal bestanden bereikt" : dragging ? "Laat los om toe te voegen" : "Sleep bestanden hierheen of klik om te kiezen"}
        </span>
        <span className="text-sm text-muted">PDF, JPG, PNG of DWG. Maximaal 5 bestanden van 10 MB per stuk.</span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={ATTACHMENT_RULES.accept}
          onChange={onInput}
          disabled={disabled || full}
          className="sr-only"
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </label>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="border-t border-line" aria-label="Toegevoegde bestanden">
          <AnimatePresence initial={false}>
            {files.map((file, index) => (
              <motion.li
                key={`${file.name}-${file.size}`}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="flex items-center gap-4 border-b border-line py-3"
              >
                <FileText aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span className="min-w-0 flex-1 truncate text-ink">{file.name}</span>
                <span className="tabular shrink-0 text-sm text-muted">{formatFileSize(file.size)}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={disabled}
                  aria-label={`Verwijder ${file.name}`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-error hover:text-error"
                >
                  <X aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
