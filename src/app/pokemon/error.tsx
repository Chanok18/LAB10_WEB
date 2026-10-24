"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IoAlertCircleOutline, IoRefreshOutline, IoHomeOutline } from "react-icons/io5";

export default function PokemonError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Error en la Pokédex:", error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-[2rem] border border-red-400/20 bg-slate-900/80 p-10 text-center shadow-2xl shadow-red-950/30">
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/10">
          <IoAlertCircleOutline className="text-6xl text-red-400" />
        </div>

        <span className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-300">
          Error de conexión
        </span>

        <h1 className="mt-7 text-3xl font-black text-white md:text-4xl">
          ¡Ups! Algo salió mal
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-400">
          No pudimos cargar la información de la Pokédex.
          Puede ser un problema temporal. Intenta nuevamente.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => retry()}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-500"
          >
            <IoRefreshOutline size={20} />
            Reintentar
          </button>

          <Link
            href="/pokemon"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <IoHomeOutline size={20} />
            Volver a la Pokédex
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Pokédex · Manejo de errores con Next.js
        </p>
      </div>
    </main>
  );
}
