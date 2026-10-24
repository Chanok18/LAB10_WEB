import PokemonGrid from "@/components/pokemon/PokemonGrid";
import type {
  PokemonListResponse,
  SimplePokemon,
} from "@/types/pokemon";

export const revalidate = 86400;

async function getPokemons(): Promise<SimplePokemon[]> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de Pokémon");
  }

  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon) => {
    const parts = pokemon.url.split("/").filter(Boolean);
    const id = Number(parts[parts.length - 1]);

    return {
      name: pokemon.name,
      id,
    };
  });
}

export default async function PokemonPage() {
  const pokemons = await getPokemons();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-12">
        <span className="inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-300">
          GENERACIÓN I · KANTO
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
          Explora el mundo{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Pokémon
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Descubre los primeros 151 Pokémon, explora sus características
          y conoce sus habilidades en nuestra Pokédex interactiva.
        </p>
      </section>

      <PokemonGrid pokemons={pokemons} />
    </main>
  );
}
