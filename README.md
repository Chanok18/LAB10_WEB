
# 🚀 Laboratorio 10 | Next.js — SSG, ISR y CSR

<div align="center">

# 🌌 Pokédex & RickVerse

### Desarrollo de Aplicaciones Web Avanzado

**Aplicaciones web modernas con Next.js, TypeScript, Tailwind CSS y consumo de APIs REST.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**TECSUP | Diseño y Desarrollo de Software**

[📂 Repositorio](https://github.com/Chanok18/LAB10_WEB) · [⚡ Next.js](https://nextjs.org/) · [🎨 Tailwind CSS](https://tailwindcss.com/)

</div>

---

## 📖 Descripción del proyecto

Este repositorio contiene el desarrollo del **Laboratorio 10 del curso Desarrollo de Aplicaciones Web Avanzado**, cuyo objetivo es aplicar diferentes estrategias de renderizado en Next.js mediante el consumo de APIs públicas.

Se desarrollaron dos aplicaciones web:

- **Pokédex:** explorador de los primeros 151 Pokémon, con generación estática, rutas dinámicas y regeneración incremental.
- **RickVerse:** explorador de personajes de Rick and Morty, con búsqueda interactiva, filtros, páginas de detalle y diseño espacial.

Durante el desarrollo se aplicaron conceptos como **Static Site Generation (SSG), Incremental Static Regeneration (ISR), Client-Side Rendering (CSR), optimización de imágenes y enrutamiento dinámico**.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Next.js 16 | Framework principal y sistema de rutas |
| React 19 | Construcción de componentes |
| TypeScript | Tipado estático |
| Tailwind CSS 4 | Estilos y diseño responsive |
| Fetch API | Consumo de servicios REST |
| Next/Image | Optimización de imágenes |
| React Icons | Iconografía |
| Git y GitHub | Control de versiones |
| Vercel | Plataforma prevista para despliegue |

---

## 🎮 Aplicación 1: Pokédex

La primera aplicación permite explorar los **151 Pokémon originales**, obteniendo información desde la API pública PokeAPI.

### ✨ Funcionalidades

- Visualización de los primeros 151 Pokémon.
- Tarjetas con imágenes y nombres.
- Navegación hacia páginas individuales.
- Rutas dinámicas mediante `/pokemon/[name]`.
- Consulta de información de cada Pokémon.
- Generación estática de contenido.
- Regeneración incremental de páginas.
- Diseño responsive con una interfaz moderna.
- Manejo de páginas no encontradas y errores.

### 🔗 API utilizada

**PokeAPI:** https://pokeapi.co/

### 📍 Ruta principal

```text
http://localhost:3000/pokemon
```

---

## 🛸 Aplicación 2: RickVerse

**RickVerse** es una aplicación inspirada en el universo de Rick and Morty. Permite explorar personajes, realizar búsquedas y consultar sus características mediante una interfaz espacial con animaciones y efectos visuales.

### ✨ Funcionalidades principales

**Explorador de personajes**
- Listado de personajes con fotografías.
- Tarjetas interactivas.
- Paginación de resultados.
- Información general de cada personaje.

**Búsqueda y filtros**
- Búsqueda por nombre.
- Filtro por estado: Alive, Dead y Unknown.
- Filtro por tipo o especie.
- Filtro por género.
- Actualización de resultados desde el cliente sin recargar la página.

**Detalles de personajes**
- Ruta dinámica `/rick-morty/[id]`.
- Imagen y nombre del personaje.
- Estado, especie, tipo y género.
- Origen y última ubicación conocida.
- Episodios en los que aparece.
- Navegación para regresar al explorador.

**Interfaz visual**
- Diseño oscuro de temática espacial.
- Fondos con estrellas, nebulosas y planetas.
- Portal animado inspirado en la serie.
- Diseño adaptable a dispositivos móviles.
- Optimización y carga diferida de imágenes.

### 🔗 API utilizada

**The Rick and Morty API:** https://rickandmortyapi.com/

### 📍 Ruta principal

```text
http://localhost:3000/rick-morty
```

---

## ⚡ Estrategias de renderizado

### 1. SSG — Static Site Generation

SSG permite generar contenido HTML durante la compilación del proyecto, evitando construir la misma página desde cero en cada solicitud.

**Aplicación en el laboratorio:**
- Generación estática de páginas de Pokémon.
- Generación inicial de páginas de personajes de RickVerse.
- Uso de `generateStaticParams()` para rutas dinámicas.

**Beneficios:**
- Menor tiempo de respuesta.
- Mejor rendimiento.
- Reducción de trabajo del servidor.

### 2. ISR — Incremental Static Regeneration

ISR permite actualizar páginas estáticas después de un intervalo definido, sin necesidad de reconstruir manualmente toda la aplicación.

En RickVerse se utiliza:

```typescript
export const revalidate = 864000;
```

Esto establece un intervalo de **10 días** para la revalidación del contenido.

También se emplea:

```typescript
fetch(url, {
  next: { revalidate: 864000 },
});
```

**Beneficios:**
- Contenido almacenado en caché.
- Actualización periódica.
- Menor cantidad de solicitudes a la API.

### 3. CSR — Client-Side Rendering

CSR permite actualizar información desde el navegador mediante componentes interactivos de React.

En RickVerse se utilizan los hooks:

```typescript
import { useState, useEffect } from "react";
```

Estos hooks permiten manejar los filtros, las búsquedas y los resultados sin recargar toda la página.

### 4. Rutas dinámicas

Next.js permite crear páginas utilizando parámetros dinámicos.

Ejemplos:

```text
/pokemon/pikachu
/rick-morty/1
/rick-morty/2
```

Los parámetros se obtienen desde las rutas y se utilizan para consultar los datos correspondientes.

---

## 📁 Estructura del proyecto

```text
next-ssg-isr-app/
│
├── public/
│   └── images/
│       ├── rick-morty-portal.png
│       └── rick-morty-logo-clean.png
│
├── src/
│   ├── app/
│   │   ├── pokemon/
│   │   │   └── [name]/
│   │   │
│   │   ├── rick-morty/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   └── rick-morty/
│   │       ├── CharacterExplorer.tsx
│   │       └── SpaceBackground.tsx
│   │
│   ├── lib/
│   │   └── rick-morty.ts
│   │
│   └── types/
│       └── rick-morty.ts
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Chanok18/LAB10_WEB.git
cd LAB10_WEB
```

### 2. Instalar dependencias

Se recomienda utilizar una versión de Node.js compatible con Next.js 16.

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 4. Abrir las aplicaciones

**Pokédex:**

```text
http://localhost:3000/pokemon
```

**RickVerse:**

```text
http://localhost:3000/rick-morty
```

### 5. Verificar TypeScript

```bash
npx tsc --noEmit
```

### 6. Generar el build de producción

```bash
npm run build
```

> **Nota:** La generación estática depende de APIs externas. Si estas limitan temporalmente las solicitudes, la compilación puede fallar y requerir ajustes en la cantidad de peticiones.

### 7. Ejecutar en producción

Después de completar correctamente el build:

```bash
npm start
```

---

## 🧠 Conceptos aprendidos

Durante el desarrollo de este laboratorio se reforzaron los siguientes conocimientos:

- Diferencias entre SSG, ISR y CSR.
- Consumo de APIs REST mediante `fetch` y `async/await`.
- Creación de rutas dinámicas en Next.js.
- Uso de `generateStaticParams()`.
- Gestión de estados con `useState`.
- Manejo de efectos con `useEffect`.
- Optimización de imágenes con `next/image`.
- Diseño de interfaces con Tailwind CSS.
- Manejo de errores y respuestas de APIs.
- Preparación de aplicaciones para producción.

---

## 📝 Conclusiones

1. Aprendí a desarrollar aplicaciones web con Next.js utilizando rutas estáticas y dinámicas para mostrar información obtenida desde APIs públicas.

2. Comprendí la importancia de SSG e ISR para mejorar el rendimiento de una aplicación y reducir las solicitudes innecesarias al servidor.

3. Implementé búsquedas y filtros interactivos utilizando `useState` y `useEffect`, permitiendo actualizar los resultados sin recargar la página.

4. Mejoré mis habilidades de diseño utilizando Tailwind CSS, creando interfaces modernas, responsive y fáciles de utilizar.

5. Aprendí que es importante comprobar el funcionamiento de las APIs, validar el código y realizar pruebas de compilación antes de desplegar una aplicación.

---

## 👨‍💻 Autor

**Kevin Jair Quispe Ccolque**

Estudiante de **Diseño y Desarrollo de Software** en TECSUP.

- **GitHub:** [Chanok18](https://github.com/Chanok18)
- **Repositorio:** [LAB10_WEB](https://github.com/Chanok18/LAB10_WEB)

---

<div align="center">

**Laboratorio 10 — Desarrollo de Aplicaciones Web Avanzado**

Desarrollado con Next.js, React, TypeScript y Tailwind CSS.

🚀 **TECSUP | 2026**

</div>
