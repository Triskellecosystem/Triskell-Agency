"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LIMITS, validateContact, type ContactErrors, type ContactField, type ContactValues } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Scarcity } from "@/components/ui/Scarcity";

type Status = "idle" | "sending" | "success" | "error";
const { form } = site.contact;

const initial: ContactValues = { name: "", email: "", service: "", message: "", consent: false, website: "" };

const fieldBase =
  "w-full rounded-lg border bg-night/60 px-3.5 text-[0.875rem] text-fg placeholder:text-fg-3 " +
  "transition-[border-color,box-shadow,background-color] duration-[var(--dur-base)] ease-out-expo " +
  "hover:border-line-strong focus:border-gold-300 focus:bg-night focus:shadow-[0_0_0_3px_rgb(247_200_92/0.18)] focus:outline-none";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.75rem] font-medium text-fg-2">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className={cn("overflow-hidden text-small text-gold-200 transition-[max-height,opacity,margin] duration-[var(--dur-base)]", error ? "mt-2 max-h-8 opacity-100" : "max-h-0 opacity-0")}>
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef<Set<ContactField>>(new Set());

  const msg = (f: ContactField) => {
    const code = errors[f];
    return code ? form.errors[code] : undefined;
  };

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched.current.has(key as ContactField)) setErrors(validateContact(next));
  };

  const blur = (f: ContactField) => {
    touched.current.add(f);
    setErrors(validateContact(values));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateContact(values);
    setErrors(found);
    (Object.keys(found) as ContactField[]).forEach((f) => touched.current.add(f));
    const first = (["name", "email", "service", "message", "consent"] as ContactField[]).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(initial);
      touched.current.clear();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="grid min-h-[22rem] place-items-center rounded-card border border-gold-400/40 bg-gold-300/5 p-8 text-center">
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold">
            <Icon name="check" className="h-8 w-8" strokeWidth={2.5} />
          </span>
          <h3 className="mt-6 text-h3 text-fg">{form.success.title}</h3>
          <p className="mt-2 text-fg-2">{form.success.text}</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-small font-medium text-gold-300 underline-offset-4 hover:underline">
            Invia un altro messaggio
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-3.5" aria-describedby="form-status">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field id="cf-name" label={form.name.label} error={msg("name")}>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder={form.name.placeholder}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby="cf-name-error"
            aria-required="true"
            className={cn(fieldBase, "h-10", errors.name ? "border-gold-200/70" : "border-line")}
          />
        </Field>
        <Field id="cf-email" label={form.email.label} error={msg("email")}>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder={form.email.placeholder}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby="cf-email-error"
            aria-required="true"
            className={cn(fieldBase, "h-10", errors.email ? "border-gold-200/70" : "border-line")}
          />
        </Field>
      </div>

      <Field id="cf-service" label={form.service.label} error={msg("service")}>
        <div className="relative">
          <select
            id="cf-service"
            name="service"
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            onBlur={() => blur("service")}
            aria-invalid={!!errors.service}
            aria-describedby="cf-service-error"
            aria-required="true"
            className={cn(fieldBase, "h-10 appearance-none pr-11", values.service ? "text-fg" : "text-fg-3", errors.service ? "border-gold-200/70" : "border-line")}
          >
            <option value="" disabled>
              {form.service.placeholder}
            </option>
            {form.service.options.map((o) => (
              <option key={o} value={o} className="bg-surface-2 text-fg">
                {o}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-3" />
        </div>
      </Field>

      <Field id="cf-message" label={form.message.label} error={msg("message")}>
        <textarea
          id="cf-message"
          name="message"
          rows={3}
          maxLength={LIMITS.message}
          placeholder={form.message.placeholder}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!errors.message}
          aria-describedby="cf-message-error"
          aria-required="true"
          className={cn(fieldBase, "resize-y py-3", errors.message ? "border-gold-200/70" : "border-line")}
        />
      </Field>

      {/* Honeypot (nascosto a utenti e screen reader) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Sito web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div>
        <label className="group/consent flex cursor-pointer items-start gap-2.5 text-[0.75rem] text-fg-2">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            onBlur={() => blur("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby="cf-consent-error"
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border bg-night/60 text-night transition-[background-color,border-color] duration-[var(--dur-fast)]",
              "peer-checked:border-gold-300 peer-checked:bg-gold-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-300",
              errors.consent ? "border-gold-200/70" : "border-line-strong",
            )}
          >
            <Icon name="check" className={cn("h-3.5 w-3.5 transition-opacity", values.consent ? "opacity-100" : "opacity-0")} strokeWidth={3} />
          </span>
          <span>
            {form.consent}{" "}
            <a href="/privacy" target="_blank" rel="noopener" className="text-gold-300 underline underline-offset-4" onClick={(e) => e.stopPropagation()}>
              (leggi l&apos;informativa)
            </a>
          </span>
        </label>
        <p id="cf-consent-error" role={errors.consent ? "alert" : undefined} className={cn("overflow-hidden text-small text-gold-200 transition-[max-height,opacity,margin] duration-[var(--dur-base)]", errors.consent ? "mt-2 max-h-8 opacity-100" : "max-h-0 opacity-0")}>
          {msg("consent")}
        </p>
      </div>

      <div id="form-status" aria-live="polite" className="min-h-0">
        {status === "error" && (
          <p className="flex items-start gap-3 rounded-xl border border-gold-200/40 bg-gold-300/10 p-4 text-small text-fg">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-gold-200" />
            <span>
              <strong className="font-semibold">{form.error.title}.</strong> {form.error.text}{" "}
              <a className="font-medium text-gold-300 underline underline-offset-4" href={`mailto:${site.brand.email}`}>
                {site.brand.email}
              </a>
            </span>
          </p>
        )}
      </div>

<div className="flex flex-wrap items-center gap-3">
      <Button type="submit" size="lg" pulse className="w-full sm:w-auto" icon={status === "sending" ? "loader" : "send"} disabled={status === "sending"}>
        {status === "sending" ? form.sending : form.submit}
      </Button>
        <Scarcity />
      </div>
    </form>
  );
}
