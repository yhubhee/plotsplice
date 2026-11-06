"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import type { Story } from "@/content/stories";
import { adminIsConfigured, endSession, isSignedIn, passwordMatches, startSession } from "@/lib/admin-session";
import { updateReviews } from "@/lib/review-store";

export type ActionResult = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
  reviews?: Story[];
};

export async function signIn(_previous: string | null, data: FormData): Promise<string | null> {
  if (!adminIsConfigured()) return "Sign-in isn't set up yet. Add ADMIN_PASSWORD in your host's settings, as described in SETUP.md.";
  // A short pause on every attempt slows down password guessing.
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (!passwordMatches(String(data.get("password") ?? ""))) return "That password isn't right. Check it and try again.";
  await startSession();
  redirect("/admin/reviews");
}

export async function signOut() {
  await endSession();
  redirect("/admin/reviews");
}

const text = (data: FormData, name: string, max: number) => String(data.get(name) ?? "").trim().slice(0, max);

// Only web links are allowed, so a pasted "javascript:" link can never reach the live site.
function isWebUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function buildReview(data: FormData, id: string): { review?: Story; fieldErrors?: Record<string, string> } {
  const fieldErrors: Record<string, string> = {};
  const authorName = text(data, "authorName", 120);
  const bookTitle = text(data, "bookTitle", 200);
  const genre = text(data, "genre", 80);
  const quote = text(data, "quote", 2000);
  const result = text(data, "result", 300);
  const bookUrl = text(data, "bookUrl", 500);
  const photo = text(data, "photo", 500);
  const rating = Number(data.get("rating"));
  const challenge = text(data, "challenge", 1500);
  const whatWeDid = text(data, "whatWeDid", 1500);
  const caseResult = text(data, "caseResult", 1500);

  if (!authorName) fieldErrors.authorName = "Enter the author's name.";
  if (!bookTitle) fieldErrors.bookTitle = "Enter the book title.";
  if (!genre) fieldErrors.genre = "Choose a genre.";
  if (!quote) fieldErrors.quote = "Paste the author's review.";
  if (!result) fieldErrors.result = "Add the result in one line.";
  if (bookUrl && !isWebUrl(bookUrl)) fieldErrors.bookUrl = "Use a full link starting with https://";
  if (photo && !isWebUrl(photo)) fieldErrors.photo = "Use a full image link starting with https://";
  if (![0, 1, 2, 3, 4, 5].includes(rating)) fieldErrors.rating = "Choose a rating from the list.";
  if (!data.get("permission")) fieldErrors.permission = "Confirm you have the author's permission before publishing.";

  const caseFields = [challenge, whatWeDid, caseResult].filter(Boolean).length;
  if (caseFields > 0 && caseFields < 3) fieldErrors.challenge = "Fill in all three case study fields, or leave all three empty.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  return {
    review: {
      id,
      authorName,
      bookTitle,
      genre,
      quote,
      result,
      ...(bookUrl && { bookUrl }),
      ...(photo && { photo }),
      ...(rating > 0 && { rating }),
      ...(caseFields === 3 && { caseStudy: { challenge, whatWeDid, result: caseResult } }),
      isPlaceholder: false,
    },
  };
}

const notSignedIn: ActionResult = { ok: false, message: "You've been signed out. Reload the page and sign in again." };

export async function saveReview(data: FormData): Promise<ActionResult> {
  if (!(await isSignedIn())) return notSignedIn;

  const existingId = text(data, "id", 100);
  const { review, fieldErrors } = buildReview(data, existingId || randomUUID());
  if (!review) return { ok: false, message: "Fix the highlighted fields, then publish again.", fieldErrors };

  try {
    const { reviews, note } = await updateReviews(
      (current) =>
        existingId
          ? current.map((item) => (item.id === existingId ? review : item))
          : [review, ...current],
      `${existingId ? "Update" : "Add"} author review: ${review.authorName}`,
    );
    return { ok: true, message: `${existingId ? "Updated" : "Published"} ${review.authorName}'s review. ${note}`, reviews };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "The review wasn't saved. Try again." };
  }
}

export async function removeReview(id: string): Promise<ActionResult> {
  if (!(await isSignedIn())) return notSignedIn;
  try {
    const { reviews, note } = await updateReviews(
      (current) => current.filter((item) => item.id !== id),
      "Remove author review",
    );
    return { ok: true, message: `Removed the review. ${note}`, reviews };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "The review wasn't removed. Try again." };
  }
}
