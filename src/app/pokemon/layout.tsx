import type { ReactNode } from "react";
import type { Metadata } from "next";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex | Next.js",
  description: "Explora los primeros 151 Pokémon con Next.js e ISR",
};

export default function PokemonLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/pokemon"
            className="flex items-center gap-3 text-xl font-extrabold tracking-tight transition hover:text-violet-300"
          >
            <span className="rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-3 shadow-lg shadow-violet-500/20">
              <IoGameController size={24} />
            </span>
            Poké<span className="text-violet-400">Dex</span>
          </Link>

          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-200">
            Next.js · ISR
          </span>
        </div>
      </nav>

      {children}
    </div>
  );
}
