"use client";

import { useState } from "react";
// KORJAUS: Muutettu tuontipolkua yhteensopivuusongelmien vuoksi
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
// KORJAUS: Muutettu käyttämään suhteellista polkua alias-ongelman vuoksi
import { auth } from "../../lib/firebase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Yritetään kirjautua sisään Firebase Authentication -palvelun avulla
      await signInWithEmailAndPassword(auth, email, password);
      // Onnistuneen kirjautumisen jälkeen ohjataan hallintapaneeliin
      router.push("/hallinta/dashboard");
    } catch (err) {
      setError("Virheellinen sähköposti tai salasana. Yritä uudelleen.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin-kirjautuminen
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Sähköposti
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Sähköposti"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Salasana
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Salasana"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isLoading ? "Kirjaudutaan..." : "Kirjaudu sisään"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
