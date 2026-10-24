import Link from "next/link";
import { IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-[2rem] border border-violet-400/20 bg-slate-900/80 p-10 text-center shadow-2xl shadow-violet-950/30">

        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10">
          <IoSearchOutline className="text-6xl text-violet-400" />
        </div>

        <h1 className="text-7xl font-black text-violet-400">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-bold text-white">
          ¡Pokémon no encontrado!
        </h2>

        <p className="mt-5 text-base leading-7 text-slate-400">
          Parece que este Pokémon se ha escapado.
          La página que buscas no existe o no está disponible.
        </p>

        <Link
          href="/pokemon"
          className="mt-9 inline-flex items-center gap-3 rounded-xl bg-violet-600 px-7 py-4 font-bold text-white transition hover:bg-violet-500"
        >
          <IoArrowBackOutline size={20} />
          Volver a la Pokédex
        </Link>

        <p className="mt-8 text-xs text-slate-500">
          Pokédex · Next.js App Router
        </p>
      </div>
    </main>
  );
}
