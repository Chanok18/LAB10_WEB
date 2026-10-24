import Link from "next/link";
import Image from "next/image";
import {
  IoArrowForwardOutline,
  IoPlanetOutline,
  IoPeopleOutline,
  IoFlashOutline,
} from "react-icons/io5";
import CharacterExplorer from "@/components/rick-morty/CharacterExplorer";
import { getInitialCharacters } from "@/lib/rick-morty";

export default async function RickMortyPage() {
  const initialData = await getInitialCharacters();

  return (
    <main>
      <section className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
            Welcome to Dimension C-137
          </div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            Explora el
            <br />
            <span className="bg-gradient-to-r from-lime-300 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              MULTIVERSO.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            Miles de personajes. Infinitas dimensiones. Una sola
            aventura. Descubre todo el universo de Rick and Morty
            desde un mismo lugar.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#explorar"
              className="inline-flex items-center gap-3 rounded-xl bg-lime-400 px-7 py-4 font-black text-[#080F16] shadow-xl shadow-lime-400/20 transition hover:-translate-y-1 hover:bg-lime-300"
            >
              Explorar personajes
              <IoArrowForwardOutline size={20} />
            </a>

            <Link
              href="/rick-morty/1"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:border-lime-400/50"
            >
              Conoce a Rick
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
            <div className="flex items-center gap-3">
              <IoPeopleOutline className="text-2xl text-lime-400" />
              <div>
                <p className="text-xl font-black">
                  {initialData.info.count}+
                </p>
                <p className="text-xs text-slate-500">Personajes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IoPlanetOutline className="text-2xl text-cyan-400" />
              <div>
                <p className="text-xl font-black">∞</p>
                <p className="text-xs text-slate-500">Dimensiones</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IoFlashOutline className="text-2xl text-lime-400" />
              <div>
                <p className="text-xl font-black">10 días</p>
                <p className="text-xs text-slate-500">Revalidación ISR</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[460px] items-center justify-center lg:min-h-[590px]">
          <div className="absolute h-[350px] w-[350px] rounded-full bg-lime-400/20 blur-[100px] md:h-[500px] md:w-[500px]" />

          <Image
            src="/images/rick-morty-portal.png"
            alt="Rick y Morty atravesando un portal interdimensional verde"
            width={850}
            height={850}
            priority
            className="relative z-10 h-auto w-full max-w-[650px] object-contain drop-shadow-[0_0_45px_rgba(132,255,40,0.35)] animate-[rv-hero-float_7s_ease-in-out_infinite]"
          />

          <div className="absolute bottom-5 right-4 z-20 rounded-2xl border border-lime-400/30 bg-[#112229]/90 px-5 py-3 text-xs font-bold tracking-widest text-lime-300 shadow-xl backdrop-blur-md">
            PORTAL ACTIVE ●
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 bg-lime-400/5 py-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
        Wubba Lubba Dub Dub! · Explore Every Dimension
      </div>

      <CharacterExplorer initialData={initialData} />
    </main>
  );
}
