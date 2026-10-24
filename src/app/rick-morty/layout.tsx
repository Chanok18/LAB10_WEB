import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { IoPlanetOutline, IoArrowBackOutline } from "react-icons/io5";
import SpaceBackground from "@/components/rick-morty/SpaceBackground";

export const metadata: Metadata = {
  title: "RickVerse | Explora el Multiverso",
  description: "Explora personajes, dimensiones y aventuras de Rick and Morty.",
};

export default function RickMortyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#080F16] text-white">
      <SpaceBackground />

      <header className="relative z-30 border-b border-white/10 bg-[#080F16]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/rick-morty"
            className="flex items-center transition duration-300 hover:scale-105"
            aria-label="Rick and Morty - Inicio"
          >
            <Image
              src="/images/rick-morty-logo-clean.png"
              alt="Rick and Morty"
              width={190}
              height={75}
              priority
              className="h-auto w-[140px] object-contain sm:w-[175px]"
            />
          </Link>

          <div className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/rick-morty" className="text-slate-300 transition hover:text-lime-400">
              Personajes
            </Link>
            <Link href="/pokemon" className="hidden items-center gap-2 text-slate-300 transition hover:text-lime-400 md:flex">
              <IoArrowBackOutline />
              Pokédex
            </Link>
            <a
              href="https://github.com/Chanok18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-xl border border-white/10 p-3 text-slate-300 transition hover:text-lime-400"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </nav>
      </header>

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 mt-20 border-t border-white/10 bg-[#080F16]/85 px-6 py-8 text-center text-sm text-slate-400">
        RickVerse · Next.js · Rick and Morty API · Proyecto académico
      </footer>
    </div>
  );
}
