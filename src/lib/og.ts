import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const WIDTH = 1200;
const HEIGHT = 630;

type Estilo = Record<string, string | number>;

interface Nodo {
  type: string;
  props: { style?: Estilo; children?: unknown };
}

// Satori acepta objetos planos; este builder evita depender de JSX.
function h(type: string, style?: Estilo, children?: unknown): Nodo {
  return { type, props: { style, children } };
}

type Fuente = { name: string; data: Buffer; weight: 400 | 700; style: 'normal' };

let fuentes: Fuente[] | undefined;

// Satori no lee woff2: usamos los .woff estáticos de @fontsource/roboto-mono.
// La ruta es relativa a cwd (no import.meta.url) porque el endpoint se empaqueta
// en dist/ y una ruta relativa al archivo se rompería en CI.
function fuentesCargadas(): Fuente[] {
  if (!fuentes) {
    const dir = resolve(process.cwd(), 'node_modules/@fontsource/roboto-mono/files');
    fuentes = [
      {
        name: 'Roboto Mono',
        data: readFileSync(resolve(dir, 'roboto-mono-latin-400-normal.woff')),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Roboto Mono',
        data: readFileSync(resolve(dir, 'roboto-mono-latin-700-normal.woff')),
        weight: 700,
        style: 'normal',
      },
    ];
  }
  return fuentes;
}

export interface OgCard {
  eyebrow: string;
  title: string;
  footer?: string;
}

// Genera la tarjeta 1200×630: fondo oscuro, barra de acento índigo, eyebrow
// arriba, título grande al centro y footer abajo. Solo estilos del subset de Satori.
export async function renderOgPng({ eyebrow, title, footer = 'poullorca.dev' }: OgCard): Promise<Buffer> {
  const MAX = 130;
  const titulo = title.length > MAX ? `${title.slice(0, MAX - 1).trimEnd()}…` : title;
  const fontSize = titulo.length <= 60 ? 72 : titulo.length <= 100 ? 60 : 48;

  const arbol = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#18181b',
      padding: '72px 80px',
    },
    [
      h('div', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 10,
        backgroundColor: '#6366f1',
      }),
      h(
        'div',
        {
          color: '#818cf8',
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: 6,
          textTransform: 'uppercase',
        },
        eyebrow
      ),
      h(
        'div',
        { display: 'flex', flex: 1, alignItems: 'center' },
        h(
          'div',
          {
            color: '#fafafa',
            fontSize,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '100%',
          },
          titulo
        )
      ),
      h('div', { color: '#a1a1aa', fontSize: 26, fontWeight: 400 }, footer),
    ]
  );

  const svg = await satori(arbol, { width: WIDTH, height: HEIGHT, fonts: fuentesCargadas() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
  return Buffer.from(png);
}
