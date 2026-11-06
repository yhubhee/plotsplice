"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

export function SignInForm() {
  const [error, action, pending] = useActionState(signIn, null);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-[clamp(2.25rem,5vw,3.25rem)]">Sign in to post reviews</h1>
      <form action={action} className="mt-8 rounded-2xl bg-page-white p-7 shadow-card">
        <label htmlFor="password" className="font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          className="mt-1.5 block min-h-12 w-full rounded-lg border border-ink-green/35 bg-paper px-3.5 py-2.5"
        />
        {error && (
          <p id="password-error" role="alert" className="mt-2 text-[0.95rem] text-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 min-h-12 w-full rounded-lg bg-ink-green px-6 py-3 font-medium text-paper hover:bg-ink-green-deep disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
