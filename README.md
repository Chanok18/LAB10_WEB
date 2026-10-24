cd ~/next-ssg-isr-app

cat > README.md <<'EOF'
# Laboratorio 10 - Next.js | SSG, ISR y CSR

Proyecto desarrollado para el curso **Desarrollo de Aplicaciones Web Avanzado** de TECSUP.

El laboratorio consiste en implementar aplicaciones web utilizando Next.js, consumo de APIs REST, rutas dinámicas y diferentes estrategias de renderizado.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Next.js Image
- APIs REST
- Git y GitHub
- Vercel (despliegue previsto)

## 1. Pokédex

Aplicación que muestra información de los primeros 151 Pokémon utilizando la PokeAPI.

### Funcionalidades

- Listado de los primeros 151 Pokémon.
- Páginas dinámicas para consultar cada Pokémon.
- Visualización de imágenes y características.
- Generación estática de páginas (SSG).
- Regeneración incremental (ISR).
- Interfaz responsive con Tailwind CSS.

**Ruta:** `/pokemon`

**API:** https://pokeapi.co/

## 2. RickVerse - Rick and Morty

Aplicación web para explorar personajes de la serie Rick and Morty mediante su API pública.

### Funcionalidades

- Listado de personajes con imágenes.
- Búsqueda por nombre.
- Filtros por estado, especie/tipo y género.
- Actualización de resultados desde el cliente (CSR).
- Navegación a páginas dinámicas de personajes.
- Visualización de información y episodios.
- Optimización de imágenes mediante lazy loading.
- Diseño espacial responsive con animaciones.

**Ruta:** `/rick-morty`

**API:** https://rickandmortyapi.com/

## Estrategias de renderizado

### SSG - Static Site Generation

Permite generar páginas HTML antes de recibir las solicitudes de los usuarios. Se utiliza para mejorar el rendimiento y reducir consultas innecesarias.

### ISR - Incremental Static Regeneration

Permite actualizar páginas estáticas después de un intervalo de tiempo.

En RickVerse se configuró un intervalo de **864000 segundos (10 días)** para las páginas de detalle.

### CSR - Client-Side Rendering

Se utiliza para los filtros interactivos de RickVerse mediante `useState` y `useEffect`, permitiendo actualizar los resultados sin recargar toda la página.

### Rutas dinámicas

Se utilizan rutas como:

- `/pokemon/[name]`
- `/rick-morty/[id]`

En RickVerse se emplea `generateStaticParams()` para generar rutas estáticas. Para reducir las solicitudes a la API durante la compilación, se preconstruye un grupo inicial de personajes y se permite generar las demás páginas bajo demanda.

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/Chanok18/LAB10_WEB.git
cd LAB10_WEB
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
