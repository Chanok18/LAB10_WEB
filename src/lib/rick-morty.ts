import type {
  Character,
  CharacterFilters,
  CharacterResponse,
} from "@/types/rick-morty";

const API_URL = "https://rickandmortyapi.com/api";

export const REVALIDATE_SECONDS = 864000;

// Listado inicial almacenado en caché (SSG).
export async function getInitialCharacters(): Promise<CharacterResponse> {
  const response = await fetch(`${API_URL}/character`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los personajes");
  }

  return response.json();
}

// Detalle con ISR cada 10 días.
export async function getCharacter(id: string): Promise<Character | null> {
  const response = await fetch(`${API_URL}/character/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("No se pudo cargar el personaje");
  }

  return response.json();
}

// Obtener los IDs de todos los personajes para SSG.
// Consultamos el total y generamos los parámetros sin descargar las 42 páginas.
export async function getAllCharacterIds(): Promise<string[]> {
  const response = await fetch(`${API_URL}/character`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `No se pudo obtener el total de personajes: HTTP ${response.status}`
    );
  }

  const data: CharacterResponse = await response.json();

  console.log(
    `RickVerse SSG: generando ${data.info.count} rutas estáticas`
  );

  return Array.from(
    { length: data.info.count },
    (_, index) => String(index + 1)
  );
}

// Construir parámetros para búsquedas desde el cliente.
export function buildCharacterQuery(filters: CharacterFilters): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  }

  return params.toString();
}
