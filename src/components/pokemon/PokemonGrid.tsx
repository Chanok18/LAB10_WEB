"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import type { SimplePokemon } from "@/types/pokemon";

interface Props {
  pokemons: SimplePokemon[];
}

export default function PokemonGrid({ pokemons }: Props) {
  const [search, setSearch] = useState("");

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase().trim())
      ),
    [pokemons, search]
  );

  return (
    <>
      <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 focus-within:border-violet-400">
          <IoSearchOutline size={24} className="text-violet-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar Pokémon... Ej: Pikachu, Charizard"
            aria-label="Buscar Pokémon"
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>Primera generación · Región Kanto</span>
          <span>{filteredPokemons.length} resultados</span>
        </div>
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-14 text-center text-slate-300">
          No encontramos ese Pokémon. Prueba con otro nombre.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredPokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.name}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-center transition duration-300 hover:-translate-y-2 hover:border-violet-400/60 hover:bg-violet-500/10 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <div className="absolute right-4 top-4 text-xs font-bold text-slate-500">
                #{String(pokemon.id).padStart(3, "0")}
              </div>

              <div className="mx-auto mt-6 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  loading="lazy"
                  className="h-32 w-32 object-contain transition duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-5 truncate text-base font-bold capitalize text-white">
                {pokemon.name}
              </h3>

              <p className="mt-2 text-xs font-semibold text-violet-300">
                Ver detalles →
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
