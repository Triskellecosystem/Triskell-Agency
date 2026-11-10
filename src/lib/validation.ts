import { site } from "@/content/site";

export interface ContactValues {
  name: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot: i bot lo compilano, gli umani non lo vedono. */
  website?: string;
}

export type ContactField = "name" | "email" | "service" | "message" | "consent";
export type ContactErrorCode = "required" | "email" | "service" | "messageShort" | "consent";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export const LIMITS = { name: 80, email: 120, message: 2000, messageMin: 10 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validazione condivisa client + server (stessa logica, nessuna dipendenza esterna). */
export function validateContact(v: Partial<ContactValues>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (v.name ?? "").trim();
  const email = (v.email ?? "").trim();
  const message = (v.message ?? "").trim();

  if (!name || name.length > LIMITS.name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "email";
  if (!v.service || !site.contact.form.service.options.includes(v.service)) errors.service = "service";
  if (!message) errors.message = "required";
  else if (message.length < LIMITS.messageMin || message.length > LIMITS.message) errors.message = "messageShort";
  if (!v.consent) errors.consent = "consent";
  return errors;
}
