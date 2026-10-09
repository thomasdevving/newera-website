/**
 * Mail adapter.
 *
 * Default: logs the message to the server console.
 * Set MAIL_PROVIDER=resend with RESEND_API_KEY, MAIL_FROM and MAIL_TO to send
 * real email through Resend's HTTP API.
 *
 * TODO: add an SMTP implementation (nodemailer) when MAIL_PROVIDER=smtp.
 */

export type MailMessage = {
  subject: string;
  text: string;
  replyTo?: string;
};

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

const consoleMailer: Mailer = {
  async send(message) {
    console.info(`[mailer] ${message.subject}\n${message.text}`);
  },
};

const resendMailer: Mailer = {
  async send(message) {
    const { RESEND_API_KEY, MAIL_FROM, MAIL_TO } = process.env;
    if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
      throw new Error("Resend is selected but RESEND_API_KEY, MAIL_FROM or MAIL_TO is missing");
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: MAIL_TO.split(",").map((address) => address.trim()),
        subject: message.subject,
        text: message.text,
        reply_to: message.replyTo,
      }),
    });
    if (!response.ok) {
      throw new Error(`Resend responded with ${response.status}`);
    }
  },
};

export function getMailer(): Mailer {
  switch (process.env.MAIL_PROVIDER) {
    case "resend":
      return resendMailer;
    // case "smtp": return smtpMailer;
    default:
      return consoleMailer;
  }
}
