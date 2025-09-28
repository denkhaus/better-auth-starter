"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthInitializer({ initialSession }: { initialSession: any }) {
  useEffect(() => {
    if (initialSession) {
      // Based on nanostores pattern and type definitions, $sessionSignal is likely the session atom
      // and it should have a 'set' method to update its value.
      if (
        authClient.$store.atoms.$sessionSignal &&
        typeof authClient.$store.atoms.$sessionSignal.set === "function"
      ) {
        authClient.$store.atoms.$sessionSignal.set(initialSession);
      } else {
        console.warn(
          "Could not set initial session: $sessionSignal atom or its set method not found. Ensure the atom name is correct."
        );
      }
    }
  }, [initialSession]);

  return null;
}
