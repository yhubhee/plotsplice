"use client";

import { useEffect, useRef, useState } from "react";
import { budgetOptions, genreOptions, journeyOptions } from "@/content/contact";
import type { MenuCategory } from "@/content/services";
import { siteConfig } from "@/site.config";

type Errors = Partial<Record<"authorName" | "email" | "genre" | "budget" | "journey" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-ink-green/35 bg-page-white px-3.5 py-2.5 text-ink aria-[invalid=true]:border-error";

function validate(data: FormData): Errors {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const errors: Errors = {};
  if (!value("authorName")) errors.authorName = "Enter your name so we know who we're writing to.";
  if (!value("email")) errors.email = "Enter your email so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) errors.email = "Check this email address. It should look like name@example.com.";
  if (!value("genre")) errors.genre = "Choose the closest genre, or Other.";
  if (!value("budget")) errors.budget = "Choose a budget range, or Not sure yet.";
  if (!value("journey")) errors.journey = "Choose where you are right now.";
  if (!value("message")) errors.message = "Tell us a little about your book and what you want from it.";
  return errors;
}

// Submits to the endpoint in site.config.ts. It's set up for Formspree by default.
//
// To use Web3Forms: set formEndpoint to "https://api.web3forms.com/submit" and add
// `access_key: "your-key"` to the JSON body below.
//
// To use a Next.js route + Resend: create app/api/contact/route.ts that sends the email
// with Resend, then set formEndpoint to "/api/contact".
async function sendForm(data: FormData) {
  const body = {
    name: data.get("authorName"),
    email: data.get("email"),
    bookTitle: data.get("bookTitle"),
    genre: data.get("genre"),
    budget: data.get("budget"),
    journey: data.get("journey"),
    services: data.getAll("services").join(", "),
    message: data.get("message"),
    consent: data.get("consent") ? "Yes" : "No",
  };
  const response = await fetch(siteConfig.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.95rem] text-error">
      {message}
    </p>
  );
}

function SelectField({
  name,
  label,
  options,
  error,
}: {
  name: keyof Errors;
  label: string;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-medium text-ink">
        {label} <span aria-hidden className="text-error">*</span>
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      >
        {/* An empty value, so validation can never accept this as a choice. */}
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export function ContactForm({ menu, initialService }: { menu: MenuCategory[]; initialService?: string | null }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const preselected = menu.some((category) => category.services.some((service) => service.slug === initialService)) ? initialService : null;

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("authorName") ?? "").trim();

    // Bots fill in the hidden field. Show them success and send nothing.
    if (data.get("_gotcha")) {
      setSentName(name);
      setStatus("sent");
      return;
    }

    const found = validate(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await sendForm(data);
      setSentName(name);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-2xl border-t-[3px] border-gold bg-page-white p-7 shadow-card md:p-10">
        <h2 className="text-[clamp(1.9rem,3.5vw,2.75rem)]">Thanks, {sentName} — your diagnosis is on its way.</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">Want to skip the wait?</p>
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-ink-green px-6 py-3 font-medium text-paper hover:bg-ink-green-deep"
        >
          Book a slot now →
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="authorName" className="font-medium text-ink">
            Author Name <span aria-hidden className="text-error">*</span>
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.authorName)}
            aria-describedby={errors.authorName ? "authorName-error" : undefined}
            className={inputClass}
          />
          <FieldError id="authorName-error" message={errors.authorName} />
        </div>
        <div>
          <label htmlFor="email" className="font-medium text-ink">
            Email Address <span aria-hidden className="text-error">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="bookTitle" className="font-medium text-ink">
            Book Title
          </label>
          <input id="bookTitle" name="bookTitle" type="text" className={inputClass} />
        </div>
        <SelectField name="genre" label="Genre" options={genreOptions} error={errors.genre} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField name="budget" label="Marketing Budget" options={budgetOptions} error={errors.budget} />
        <SelectField name="journey" label="Where are you in your journey?" options={journeyOptions} error={errors.journey} />
      </div>

      <fieldset>
        <legend className="font-medium text-ink">Services you&rsquo;re interested in</legend>
        <div className="mt-3 space-y-5">
          {menu.map((category) => (
            <div key={category.id} role="group" aria-labelledby={`group-${category.id}`}>
              <p id={`group-${category.id}`} className="text-[0.95rem] text-ink-soft">
                {category.title}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.services.map((service) => (
                  <label
                    key={service.slug}
                    className="cursor-pointer rounded-full border border-ink-green/30 bg-page-white px-3.5 py-2 text-[0.92rem] leading-tight text-ink transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold-deep has-[:checked]:border-ink-green has-[:checked]:bg-ink-green has-[:checked]:text-paper"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service.title}
                      defaultChecked={service.slug === preselected}
                      className="sr-only"
                    />
                    {service.title}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="font-medium text-ink">
          Tell us about your book and your goals <span aria-hidden className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <label className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
        <input type="checkbox" name="consent" className="mt-1 size-[1.1rem] shrink-0 accent-ink-green" />
        Send me a personalized growth plan and occasional author marketing insights. No spam, unsubscribe anytime.
      </label>

      {status === "failed" && (
        <p role="alert" className="rounded-lg border border-error/40 bg-error/5 p-4 text-error">
          Your message wasn&rsquo;t sent because of a connection problem on our side. Your answers are still here, so try again,
          or email us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink-green px-7 py-3 font-medium text-paper transition-colors hover:bg-ink-green-deep disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Book My Free Strategy Call"}
        </button>
        <p className="mt-3 text-[0.95rem] text-ink-soft">You&rsquo;ll hear from a senior strategist — not a sales rep — within 24 hours.</p>
      </div>
    </form>
  );
}
