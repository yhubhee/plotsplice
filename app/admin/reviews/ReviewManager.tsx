"use client";

import { useRef, useState, useTransition } from "react";
import { genreOptions } from "@/content/contact";
import type { Story } from "@/content/stories";
import { removeReview, saveReview, signOut, type ActionResult } from "./actions";

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-ink-green/35 bg-paper px-3.5 py-2.5 text-ink aria-[invalid=true]:border-error";
const buttonClass = "inline-flex min-h-11 items-center rounded-lg px-4 py-2 font-medium";

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  error?: string;
};

function Field({ name, label, hint, required, rows, defaultValue, error }: FieldProps) {
  const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
  const shared = { id: name, name, defaultValue, "aria-invalid": Boolean(error), "aria-describedby": describedBy, className: inputClass };
  return (
    <div>
      <label htmlFor={name} className="font-medium text-ink">
        {label} {required && <span aria-hidden className="text-error">*</span>}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="mt-0.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {rows ? <textarea rows={rows} {...shared} /> : <input type="text" {...shared} />}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-[0.95rem] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ReviewManager({ initialReviews }: { initialReviews: Story[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [editing, setEditing] = useState<Story | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [confirmingRemove, setConfirmingRemove] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const statusRef = useRef<HTMLDivElement>(null);

  const errors = result?.fieldErrors ?? {};

  const showResult = (next: ActionResult) => {
    setResult(next);
    if (next.reviews) setReviews(next.reviews);
    statusRef.current?.scrollIntoView({ block: "center" });
  };

  // Handled by hand because React clears a form after a form action, which would
  // throw away everything you typed if there was a validation error.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const next = await saveReview(data);
      showResult(next);
      if (next.ok) {
        setEditing(null);
        setFormVersion((version) => version + 1); // a fresh, empty form
      }
    });
  };

  const onRemove = (id: string) => {
    startTransition(async () => {
      showResult(await removeReview(id));
      setConfirmingRemove(null);
      if (editing?.id === id) {
        setEditing(null);
        setFormVersion((version) => version + 1);
      }
    });
  };

  const startEditing = (story: Story) => {
    setEditing(story);
    setResult(null);
    setFormVersion((version) => version + 1);
    statusRef.current?.scrollIntoView({ block: "center" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)]">Author reviews</h1>
          <p className="mt-2 max-w-[56ch] leading-relaxed text-ink-soft">
            Reviews you publish here appear on the home page and on Stories, ahead of the samples.
          </p>
        </div>
        <button type="button" onClick={() => signOut()} className={`${buttonClass} border border-ink-green/40 text-ink-green hover:bg-ink-green/5`}>
          Sign out
        </button>
      </div>

      <div ref={statusRef} aria-live="polite" className="mt-6">
        {result && (
          <p className={`rounded-lg border p-4 ${result.ok ? "border-ink-green/40 bg-ink-green/5 text-ink-green" : "border-error/40 bg-error/5 text-error"}`}>
            {result.message}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[7fr_5fr]">
        <form key={formVersion} onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl bg-page-white p-6 shadow-card md:p-8">
          <h2 className="text-[1.9rem]">{editing ? `Edit ${editing.authorName}'s review` : "Post a new review"}</h2>
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="authorName" label="Author name" required defaultValue={editing?.authorName} error={errors.authorName} />
            <Field name="bookTitle" label="Book title" required defaultValue={editing?.bookTitle} error={errors.bookTitle} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="genre" className="font-medium text-ink">
                Genre <span aria-hidden className="text-error">*</span>
              </label>
              <select id="genre" name="genre" defaultValue={editing?.genre ?? ""} aria-invalid={Boolean(errors.genre)} className={inputClass}>
                <option value="">Select…</option>
                {genreOptions.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && <p className="mt-1.5 text-[0.95rem] text-error">{errors.genre}</p>}
            </div>
            <div>
              <label htmlFor="rating" className="font-medium text-ink">
                Rating
              </label>
              <select id="rating" name="rating" defaultValue={editing?.rating ?? 0} aria-invalid={Boolean(errors.rating)} className={inputClass}>
                <option value={0}>The author didn&rsquo;t give one</option>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <option key={stars} value={stars}>
                    {stars} out of 5
                  </option>
                ))}
              </select>
              {errors.rating && <p className="mt-1.5 text-[0.95rem] text-error">{errors.rating}</p>}
            </div>
          </div>

          <Field name="quote" label="The review" hint="Paste the author's own words." required rows={5} defaultValue={editing?.quote} error={errors.quote} />
          <Field name="result" label="The result, in one line" hint="Use only facts the author agrees with." required defaultValue={editing?.result} error={errors.result} />
          <Field name="bookUrl" label="Link to the book" hint="Optional." defaultValue={editing?.bookUrl} error={errors.bookUrl} />
          <Field name="photo" label="Link to the author's photo" hint="Optional. A square image works best." defaultValue={editing?.photo} error={errors.photo} />

          <details className="rounded-lg border border-ink-green/20 p-4" open={Boolean(editing?.caseStudy)}>
            <summary className="cursor-pointer font-medium text-ink-green">Add a longer case study (optional)</summary>
            <p className="mt-2 text-sm text-ink-soft">The most recent review with a case study becomes the featured story at the top of Stories.</p>
            <div className="mt-4 space-y-4">
              <Field name="challenge" label="The challenge" rows={3} defaultValue={editing?.caseStudy?.challenge} error={errors.challenge} />
              <Field name="whatWeDid" label="What we did" rows={3} defaultValue={editing?.caseStudy?.whatWeDid} />
              <Field name="caseResult" label="The result" rows={3} defaultValue={editing?.caseStudy?.result} />
            </div>
          </details>

          <div>
            <label className="flex items-start gap-3 leading-relaxed text-ink">
              <input type="checkbox" name="permission" className="mt-1 size-[1.1rem] shrink-0 accent-ink-green" />
              This is the author&rsquo;s real review, and they&rsquo;ve given permission to publish it with their name.
            </label>
            {errors.permission && <p className="mt-1.5 text-[0.95rem] text-error">{errors.permission}</p>}
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={pending} className={`${buttonClass} min-h-12 bg-ink-green px-6 text-paper hover:bg-ink-green-deep disabled:cursor-wait disabled:opacity-70`}>
              {pending ? "Publishing…" : editing ? "Publish changes" : "Publish review"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setFormVersion((version) => version + 1);
                }}
                className={`${buttonClass} min-h-12 border border-ink-green/40 text-ink-green hover:bg-ink-green/5`}
              >
                Cancel editing
              </button>
            )}
          </div>
        </form>

        <div>
          <h2 className="text-[1.9rem]">Published reviews ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="mt-4 leading-relaxed text-ink-soft">No reviews yet. Post your first one with the form, and it will appear ahead of the samples on the site.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {reviews.map((story) => (
                <li key={story.id} className="rounded-xl bg-page-white p-5 shadow-card">
                  <p className="font-medium text-ink">{story.authorName}</p>
                  <p className="text-sm text-ink-soft">
                    {story.bookTitle}, {story.genre}
                  </p>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-ink-soft">{story.quote}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => startEditing(story)} disabled={pending} className={`${buttonClass} border border-ink-green/40 text-ink-green hover:bg-ink-green/5`}>
                      Edit
                    </button>
                    {confirmingRemove === story.id ? (
                      <>
                        <button type="button" onClick={() => onRemove(story.id)} disabled={pending} className={`${buttonClass} bg-error text-white`}>
                          Yes, remove from the site
                        </button>
                        <button type="button" onClick={() => setConfirmingRemove(null)} className={`${buttonClass} text-ink-green underline`}>
                          Keep it
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => setConfirmingRemove(story.id)} disabled={pending} className={`${buttonClass} text-error underline`}>
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
