import { HONEYPOT_FIELD } from "@/lib/schemas";

/**
 * Spam trap. Hidden from people and assistive tech; bots that fill every
 * field reveal themselves and are dropped silently by the API.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Laat dit veld leeg</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
