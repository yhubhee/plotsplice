import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const COOKIE = "plotsplice_admin";
const SESSION_SECONDS = 60 * 60 * 12; // 12 hours

const password = () => process.env.ADMIN_PASSWORD ?? "";

export const adminIsConfigured = () => password().length > 0;

const sign = (expires: string) => createHmac("sha256", password()).update(`admin:${expires}`).digest("hex");

function safeEqual(a: string, b: string) {
  // Hashing first gives both sides the same length and hides timing differences.
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export const passwordMatches = (attempt: string) => adminIsConfigured() && safeEqual(attempt, password());

export async function startSession() {
  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

/** Changing ADMIN_PASSWORD signs everyone out, because old signatures stop matching. */
export async function isSignedIn() {
  await connection(); // always checked per request, never prerendered
  if (!adminIsConfigured()) return false;
  const [expires, signature] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  if (!expires || !signature) return false;
  return Number(expires) > Date.now() && safeEqual(signature, sign(expires));
}
