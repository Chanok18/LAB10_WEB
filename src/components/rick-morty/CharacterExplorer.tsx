"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoSearchOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
} from "react-icons/io5";
import type {
  Character,
  CharacterResponse,
} from "@/types/rick-morty";

interface Props {
  initialData: CharacterResponse;
}

const statusColors: Record<string, string> = {
  Alive: "bg-lime-400",
  Dead: "bg-red-500",
  unknown: "bg-slate-400",
};

export default function CharacterExplorer({ initialData }: Props) {
  const [characters, setCharacters] = useState<Character[]>(
    initialData.results
  );
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.info.pages);
  const [totalResults, setTotalResults] = useState(initialData.info.count);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      const params = new URLSearchParams();

      if (name.trim()) params.set("name", name.trim());
      if (status) params.set("status", status);
      if (type.trim()) params.set("type", type.trim());
      if (gender) params.set("gender", gender);

      params.set("page", String(page));

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?${params}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          setCharacters([]);
          setTotalPages(0);
          setTotalResults(0);
          return;
        }

        if (!response.ok) {
          throw new Error("No se pudo completar la búsqueda");
        }

        const data: CharacterResponse = await response.json();

        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setTotalResults(data.info.count);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Ocurrió un error"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [name, status, type, gender, page]);

  function clearFilters() {
    setName("");
    setStatus("");
    setType("");
    setGender("");
    setPage(1);
  }

  return (
    <section id="explorar" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
            Multiverse Database
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Archivo de{" "}
            <span className="text-lime-400">personajes.</span>
          </h2>

          <p className="mt-3 text-slate-400">
            Encuentra a cualquier habitante del multiverso.
          </p>
        </div>

        <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-3 text-sm font-semibold text-lime-300">
          {totalResults} personajes encontrados
        </span>
      </div>

      <div className="mb-10 rounded-3xl border border-white/10 bg-[#111F27]/90 p-5 shadow-2xl shadow-black/20 md:p-7">
        <div className="relative mb-5">
          <IoSearchOutline
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-lime-400"
          />

          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre... Ej: Rick, Morty, Summer"
            aria-label="Buscar por nombre"
            className="w-full rounded-2xl border border-white/10 bg-[#080F16] py-4 pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            aria-label="Filtrar por estado"
            className="rounded-xl border border-white/10 bg-[#080F16] px-4 py-4 text-slate-200 outline-none focus:border-lime-400"
          >
            <option value="">Todos los estados</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>

          <input
            value={type}
            onChange={(event) => {
              setType(event.target.value);
              setPage(1);
            }}
            placeholder="Tipo de personaje"
            aria-label="Filtrar por tipo"
            className="rounded-xl border border-white/10 bg-[#080F16] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-lime-400"
          />

          <select
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
              setPage(1);
            }}
            aria-label="Filtrar por género"
            className="rounded-xl border border-white/10 bg-[#080F16] px-4 py-4 text-slate-200 outline-none focus:border-lime-400"
          >
            <option value="">Todos los géneros</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>

          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-4 font-semibold text-slate-200 transition hover:border-lime-400/40 hover:text-lime-400"
          >
            <IoCloseOutline size={20} />
            Limpiar filtros
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <p role="status" className="mb-6 text-sm text-lime-400">
          Explorando dimensiones...
        </p>
      )}

      {!loading && characters.length === 0 && !error ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-16 text-center">
          <h3 className="text-2xl font-bold">
            No encontramos personajes
          </h3>
          <p className="mt-3 text-slate-400">
            Prueba con otros filtros o busca un nombre diferente.
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
            loading ? "opacity-50" : ""
          }`}
        >
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rick-morty/${character.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111F27] transition duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:shadow-2xl hover:shadow-lime-500/10"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-800">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  #{character.id}
                </span>
              </div>

              <div className="p-4">
                <h3 className="truncate font-bold text-white transition group-hover:text-lime-400">
                  {character.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      statusColors[character.status]
                    }`}
                  />
                  {character.status} · {character.species}
                </div>

                <p className="mt-4 truncate border-t border-white/10 pt-3 text-xs text-slate-500">
                  {character.location.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-5">
          <button
            onClick={() => {
              setPage((current) => Math.max(1, current - 1));
            }}
            disabled={page === 1 || loading}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-lime-400 disabled:opacity-30"
            aria-label="Página anterior"
          >
            <IoChevronBackOutline size={20} />
          </button>

          <span className="text-sm font-semibold text-slate-300">
            Página <span className="text-lime-400">{page}</span> de{" "}
            {totalPages}
          </span>

          <button
            onClick={() => {
              setPage((current) =>
                Math.min(totalPages, current + 1)
              );
            }}
            disabled={page >= totalPages || loading}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-lime-400 disabled:opacity-30"
            aria-label="Página siguiente"
          >
            <IoChevronForwardOutline size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
