import type { FormResponse } from "./schemas";

/** JSON helper so both endpoints answer in the same shape. */
export function respond(body: FormResponse, status = 200) {
  return Response.json(body, { status });
}

export const tooManyRequests = () =>
  respond({ ok: false, errors: { form: ["Te veel verzoeken. Probeer het over enkele minuten opnieuw."] } }, 429);

export const serverError = () =>
  respond({ ok: false, errors: { form: ["Er ging iets mis aan onze kant. Probeer het later opnieuw."] } }, 500);
