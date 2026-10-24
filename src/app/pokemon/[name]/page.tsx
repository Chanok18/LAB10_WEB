import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Pokemon, PokemonListResponse } from "@/types/pokemon";
import { IoArrowBackOutline } from "react-icons/io5";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

// ISR: los datos se revalidan cada 24 horas.
async function getPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
    { next: { revalidate: 86400 } }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("No se pudo obtener la información del Pokémon");
  }

  return response.json();
}

// SSG: genera las rutas de los primeros 151 Pokémon.
export async function generateStaticParams() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151",
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de Pokémon");
  }

  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

// SEO dinámico para cada Pokémon.
export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return {
    title: `${displayName} | Pokédex`,
    description: `Descubre las estadísticas, habilidades y características de ${displayName}.`,
  };
}

const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-600",
  electric: "bg-yellow-500",
  psychic: "bg-pink-500",
  ice: "bg-cyan-500",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  fairy: "bg-pink-400",
  normal: "bg-gray-500",
  fighting: "bg-orange-700",
  flying: "bg-indigo-400",
  poison: "bg-purple-600",
  ground: "bg-amber-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-600",
  ghost: "bg-violet-700",
  steel: "bg-slate-500",
};

const statNames: Record<string, string> = {
  hp: "Puntos de salud",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad",
};

export default async function PokemonDetail({
  params,
}: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/pokemon"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-white"
      >
        <IoArrowBackOutline size={20} />
        Volver a la Pokédex
      </Link>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-violet-950/30">
        <header className="relative overflow-hidden bg-gradient-to-r from-violet-800 via-purple-700 to-fuchsia-700 px-8 py-12 text-center">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
            Pokémon · Primera generación
          </span>

          <h1 className="mt-6 text-5xl font-black capitalize text-white md:text-7xl">
            {pokemon.name}
          </h1>

          <p className="mt-3 text-xl font-bold text-violet-100">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
        </header>

        <div className="grid gap-10 p-7 md:grid-cols-2 md:p-12">
          <section>
            <div className="flex min-h-80 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 p-8">
              {artwork ? (
                <Image
                  src={artwork}
                  alt={`Imagen oficial de ${pokemon.name}`}
                  width={360}
                  height={360}
                  priority
                  className="h-auto max-h-80 w-full object-contain drop-shadow-2xl"
                />
              ) : (
                <p className="text-slate-400">
                  Imagen no disponible
                </p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-sm text-slate-400">Altura</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {pokemon.height / 10} m
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-sm text-slate-400">Peso</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-9">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">
                Tipos
              </h2>

              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((item) => (
                  <span
                    key={item.type.name}
                    className={`rounded-full px-5 py-2 text-sm font-bold capitalize text-white ${
                      typeColors[item.type.name] ?? "bg-gray-500"
                    }`}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-5 text-2xl font-bold text-white">
                Estadísticas
              </h2>

              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="mb-2 flex justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-300">
                        {statNames[stat.stat.name] ??
                          stat.stat.name.replaceAll("-", " ")}
                      </span>

                      <span className="font-bold text-violet-300">
                        {stat.base_stat}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        style={{
                          width: `${Math.min(
                            (stat.base_stat / 255) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">
                Habilidades
              </h2>

              <div className="flex flex-wrap gap-3">
                {pokemon.abilities.map((item) => (
                  <span
                    key={item.ability.name}
                    className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold capitalize text-violet-200"
                  >
                    {item.ability.name.replaceAll("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="border-t border-white/10 bg-slate-950/40 p-7">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-500"
          >
            <IoArrowBackOutline size={20} />
            Volver a la Pokédex
          </Link>
        </footer>
      </div>
    </main>
  );
}
