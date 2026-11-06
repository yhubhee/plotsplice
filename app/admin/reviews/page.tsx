import type { Metadata } from "next";
import { Suspense } from "react";
import { isSignedIn } from "@/lib/admin-session";
import { getReviews } from "@/lib/review-store";
import { SignInForm } from "./SignInForm";
import { ReviewManager } from "./ReviewManager";

export const metadata: Metadata = {
  title: "Author reviews",
  robots: { index: false, follow: false },
};

async function AdminArea() {
  if (!(await isSignedIn())) return <SignInForm />;

  const loaded = await getReviews().then(
    (reviews) => ({ reviews, error: null }),
    (error: Error) => ({ reviews: null, error: error.message }),
  );
  if (!loaded.reviews) {
    return (
      <p role="alert" className="rounded-lg border border-error/40 bg-error/5 p-4 text-error">
        {loaded.error}
      </p>
    );
  }
  return <ReviewManager initialReviews={loaded.reviews} />;
}

export default function AdminReviewsPage() {
  return (
    <section className="page py-12 md:py-16">
      {/* The sign-in check needs the visitor's cookie, so it runs per request behind Suspense. */}
      <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
        <AdminArea />
      </Suspense>
    </section>
  );
}
