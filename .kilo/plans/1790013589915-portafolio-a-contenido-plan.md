# Plan: poullorca.dev — de portafolio a sitio de contenido

## Contexto analizado
- Stack actual: Astro 5 + Vue 3 + Tailwind 4 + shadcn/ui + Lucide + Roboto Mono.
- Gráfica actual: fondo de puntos (`radial-gradient`), tema claro/oscuro, tarjetas con sombra suave.
- Páginas actuales: `index` (Home, Experience, Projects, Contact), `about-me`, `blog` (/blog, /blog/posts, /blog/tags/[tag], /blog/techs/[tech]), `posts/*.md` (3 posts en inglés).
- Componentes: `Navbar.vue`, `Home.vue`, `Footer.vue`, `About.vue`, `Experience.vue`, `Projects.vue`, `Resume.vue`, `Contact.vue`, `Stack.vue`, `Blog/*`.
- Posts actuales usan `frontmatter` en archivos `.md` en `src/pages/posts/`.

## Decisiones técnicas propuestas

### Búsqueda
- **Recomendación: Pagefind** (búsqueda estática generada en build, ideal para Astro/Vercel, sin backend, funciona con contenido en `content/contenido/`).
- Alternativa descartada: Fuse.js + índice JSON en cliente requiere más código de sincronización y no indexa el cuerpo completo tan fácilmente.

### Paginación
- **Estática para SEO:** `getStaticPaths` en Astro para `/contenido` y `/contenido/[page]` (o `/contenido/2`).
- **Carga incremental en cliente:** botón "Cargar más" que carga bloques de 16 piezas vía `fetch` o navegación por página, sin recargar todo.
- Estado en URL: `?q=&tema=&tipo=&tag=` combinado con paginación estática (`/contenido/2?q=...`).

### Modelo de contenido
- Migración completa a `src/content/contenido/` con esquema `contenido.ts` (Astro Content Collections).
- Se eliminan los 3 posts en inglés en `src/pages/posts/` y el sistema `.md` de posts antiguos.

### Redirecciones
- `astro-redirect` o archivo `vercel.json` con `redirects` para `/about-me` → `/`, `/blog` → `/contenido`, `/blog/posts` → `/contenido`, `/posts/*` → `/contenido`.

## Archivos a crear, modificar y eliminar

### Eliminar
- `src/pages/about-me.astro`
- `src/pages/blog/index.astro`, `posts/index.astro`, `tags/[tag].astro`, `techs/[tech].astro`
- `src/pages/posts/*.md` (3 archivos en inglés)
- Componentes: `About.vue`, `Experience.vue`, `Projects.vue`, `Resume.vue`, `Stack.vue`, `Contact.vue`
- Secciones de CV en `Navbar.vue`, `Home.vue`, `Footer.vue`, `main.astro`
- `public/resume.pdf`

### Crear
- `src/content/contenido/schema.ts`
- `src/content/contenido/*.md` (3 piezas de ejemplo con `draft: true`)
- `src/data/terminal.json`
- Nuevos componentes: `Hero.vue`, `ContenidoList.vue`, `TemaCard.vue`, `Asesorias.vue`, `PiezaTemplate.vue`, `FooterColumns.vue`
- Páginas nuevas: `src/pages/index.astro` (rediseñado), `contenido/index.astro`, `contenido/[slug].astro`, `contenido/[page].astro` (o paginación dinámica), `temas/index.astro`, `temas/[tema].astro`, `asesorias.astro`
- `astro.config.mjs`: agregar `redirects` o configurar `pagefind`

### Modificar
- `src/components/Navbar.vue`: menú actualizado, sin CV
- `src/components/Footer.vue`: columnas nuevas
- `src/layouts/main.astro`: `lang="es"`, meta SEO actualizado, `og:locale` en español
- `src/components/Home.vue`: reemplazar por `Hero.vue` + bloques de contenido
- `package.json`: agregar `pagefind` o script de búsqueda

## Preguntas para confirmar antes de ejecutar

### 1. Borrado de posts antiguos en inglés
¿Confirmo eliminar los 3 archivos `.md` en `src/pages/posts/` y todo el sistema de blog anterior (`/blog`, tags, techs)? Sí, se confirma borrado.

### 2. Búsqueda: ¿Pagefind es aceptable?
Propongo Pagefind para indexar `src/content/contenido/` y servir resultados estáticos en `/contenido`. Confirmo que es la opción recomendada.

### 3. Piezas de ejemplo: ¿solo los 3 drafts o también contenido real?
El documento pide 3 piezas con `draft: true`. Confirmo que no hay contenido real adicional fuera de estos ejemplos (que sirven para probar listados, filtros y plantilla).

### 4. Paginación: ¿estática (`/contenido/2`) o dinámica con query params?
Propongo paginación estática (`/contenido`, `/contenido/2`, etc.) generada en build con `getStaticPaths`, más botón "Cargar más" en cliente. Confirmo esta combinación.

### 5. Componentes shadcn/ui: ¿reutilizar los actuales (`Card`, `Badge`, etc.) o crear nuevos?
Propongo reutilizar los existentes (`Card.vue`, `Badge.vue`, `Button.vue`, `Avatar.vue`) y seguir los mismos patrones de color y sombra. Confirmo.
