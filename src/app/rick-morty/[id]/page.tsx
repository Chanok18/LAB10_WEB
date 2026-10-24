import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter } from "@/lib/rick-morty";
import { IoArrowBackOutline, IoPlanetOutline, IoLocationOutline, IoTvOutline } from "react-icons/io5";

interface Props {
  params: Promise<{ id: string }>;
}

// SSG: generar inicialmente los primeros 20 personajes.
// Los demás se generan bajo demanda y se almacenan en caché.
export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, index) => ({
    id: String(index + 1),
  }));
}

// Permitir rutas adicionales que no se generaron durante el build.
export const dynamicParams = true;

// ISR: cada petición de detalle usa revalidación de 10 días.
export const revalidate = 864000;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);

  return {
    title: character ? `${character.name} | RickVerse` : "Personaje no encontrado",
    description: character
      ? `Información sobre ${character.name}, ${character.species}, del universo Rick and Morty.`
      : "El personaje solicitado no existe.",
  };
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) notFound();

  const character = await getCharacter(id);
  if (!character) notFound();

  const statusColor =
    character.status === "Alive"
      ? "bg-lime-400"
      : character.status === "Dead"
        ? "bg-red-500"
        : "bg-slate-400";

  const fields = [
    ["ID", `#${character.id}`],
    ["Nombre", character.name],
    ["Estado", character.status],
    ["Especie", character.species],
    ["Tipo", character.type || "Sin tipo especificado"],
    ["Género", character.gender],
    ["Origen", character.origin.name],
    ["Ubicación actual", character.location.name],
    ["Fecha de registro", new Date(character.created).toLocaleDateString("es-PE")],
    ["URL de la API", character.url],
    ["URL del origen", character.origin.url || "No disponible"],
    ["URL de ubicación", character.location.url || "No disponible"],
    ["URL de imagen", character.image],
    ["Total de episodios", String(character.episode.length)],
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/rick-morty"
        className="mb-8 inline-flex items-center gap-2 font-semibold text-lime-400 hover:text-white"
      >
        <IoArrowBackOutline />
        Volver al multiverso
      </Link>

      <div className="overflow-hidden rounded-[2rem] border border-lime-400/20 bg-[#101D25]/95 shadow-2xl shadow-black/40">
        <div className="border-b border-white/10 bg-gradient-to-r from-[#183d31] via-[#142a30] to-[#101d25] px-8 py-10">
          <span className="text-xs font-bold uppercase tracking-[.3em] text-lime-400">
            Multiverse Character File · #{character.id}
          </span>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">
            {character.name}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-slate-200">
            <span className={`h-3 w-3 rounded-full ${statusColor}`} />
            {character.status} · {character.species}
          </div>
        </div>

        <div className="grid gap-10 p-6 md:grid-cols-[340px_1fr] md:p-10">
          <div>
            <div className="overflow-hidden rounded-3xl border border-lime-400/20 bg-lime-400/5">
              <Image
                src={character.image}
                alt={character.name}
                width={400}
                height={400}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <IoPlanetOutline className="text-xl text-lime-400" />
                <div>
                  <p className="text-xs text-slate-400">Origen</p>
                  <p className="font-semibold">{character.origin.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <IoLocationOutline className="text-xl text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Ubicación</p>
                  <p className="font-semibold">{character.location.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <IoTvOutline className="text-xl text-lime-400" />
                <div>
                  <p className="text-xs text-slate-400">Apariciones</p>
                  <p className="font-semibold">{character.episode.length} episodios</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-black">
              Información del <span className="text-lime-400">personaje</span>
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  <p className="break-all text-sm font-medium text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mb-4 mt-10 text-2xl font-black">
              Episodios <span className="text-lime-400">registrados</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {character.episode.map((episodeUrl) => {
                const episodeId = episodeUrl.split("/").pop();

                return (
                  <span
                    key={episodeUrl}
                    className="rounded-lg border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-xs font-bold text-lime-300"
                  >
                    Episodio {episodeId}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
