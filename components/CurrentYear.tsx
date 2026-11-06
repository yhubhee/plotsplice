"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Read in the browser only, so the footer year stays right on a statically built page.
export function CurrentYear() {
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null);
}
