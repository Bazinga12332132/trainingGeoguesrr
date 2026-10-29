/* Genera data/mapas/<iso>.json con el contorno de cada país en SVG, a partir de Natural Earth
   (paquete npm world-atlas, dominio público). Se corre a mano cuando se agrega un país:

     npm i world-atlas@2.0.2 topojson-client@3.1.0 i18n-iso-countries@7.11.3   (en una carpeta aparte)
     node scripts/generar-mapas.mjs <carpeta-con-node_modules>

   Proyección equirectangular con corrección por coseno de la latitud media. El cliente proyecta
   las zonas con la misma fórmula (js/zonas.js → proy):  x = (lon - b0) * k * s ,  y = (b3 - lat) * s  */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const base = process.argv[2];
if (!base) { console.error('Uso: node scripts/generar-mapas.mjs <carpeta-con-node_modules>'); process.exit(1); }
const req = createRequire(join(base, 'package.json'));
const { feature } = req('topojson-client');
const iso = req('i18n-iso-countries');

const ANCHO = 800;
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const salida = join(raiz, 'data', 'mapas');
mkdirSync(salida, { recursive: true });

/* iso: { res: '50m' | '10m', de: país del que se recorta, clip: [lonMin, latMin, lonMax, latMax], shift: lon<0 → +360 } */
const PAISES = {
  ru: { shift: true, clip: [19, 41, 191, 78] }, ua: {}, bg: {},
  us: { clip: [-125, 24, -66, 50] }, ca: { clip: [-141, 41, -52, 70] }, mx: {},
  br: {}, ar: { clip: [-74, -56, -53, -21] }, au: { clip: [112, -44, 154, -10] },
  in: { clip: [68, 6, 98, 37] }, bd: { res: '10m' }, lk: { res: '10m' },
  th: {}, kh: { res: '10m' }, la: { res: '10m' }, bt: { res: '10m' },
  mn: {}, kz: {}, id: {}, tr: {}, jp: {},
  za: {}, ke: {}, gh: { res: '10m' }, ng: {},
  es: { clip: [-10, 35.8, 4.5, 44] },
  re: { res: '10m', de: 'fr', clip: [55.1, -21.5, 56, -20.8] }
};

const topo = {};
const cargar = res => (topo[res] ??= JSON.parse(readFileSync(join(base, 'node_modules', 'world-atlas', `countries-${res}.json`), 'utf8')));

function poligonos(geom) {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

for (const [cod, cfg] of Object.entries(PAISES)) {
  const t = cargar(cfg.res || '50m');
  const id = String(Number(iso.alpha2ToNumeric((cfg.de || cod).toUpperCase())));
  const geo = feature(t, t.objects.countries).features.find(f => String(Number(f.id)) === id);
  if (!geo) { console.warn('No está en Natural Earth:', cod); continue; }

  let polys = poligonos(geo.geometry).map(p => p.map(anillo => anillo.map(([lon, lat]) => [cfg.shift && lon < 0 ? lon + 360 : lon, lat])));
  if (cfg.clip) {
    const [a, b, c, d] = cfg.clip;
    polys = polys.filter(p => { const [lon, lat] = p[0][0]; return p[0].some(([x, y]) => x >= a && x <= c && y >= b && y <= d) && lon > a - 30; });
  }
  const pts = polys.flatMap(p => p[0]);
  const b = [Math.min(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1])), Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))];
  if (cfg.clip) { b[0] = Math.max(b[0], cfg.clip[0]); b[1] = Math.max(b[1], cfg.clip[1]); b[2] = Math.min(b[2], cfg.clip[2]); b[3] = Math.min(b[3], cfg.clip[3]); }
  const k = Math.cos(((b[1] + b[3]) / 2) * Math.PI / 180);
  const s = ANCHO / ((b[2] - b[0]) * k);
  const alto = Math.round((b[3] - b[1]) * s);
  const xy = ([lon, lat]) => [(lon - b[0]) * k * s, (b[3] - lat) * s];

  const area = r => Math.abs(r.reduce((acc, [x, y], i) => { const [x2, y2] = r[(i + 1) % r.length]; return acc + x * y2 - x2 * y; }, 0) / 2);
  let d = '';
  for (const p of polys) {
    for (const anillo of p) {
      const r = anillo.map(xy);
      if (area(r) < 4) continue; // islitas de menos de 2×2 px
      let prev = '';
      const partes = [];
      for (const [x, y] of r) {
        const q = `${x.toFixed(1)} ${y.toFixed(1)}`;
        if (q !== prev) partes.push(q);
        prev = q;
      }
      if (partes.length > 2) d += 'M' + partes.join('L') + 'Z';
    }
  }
  writeFileSync(join(salida, `${cod}.json`), JSON.stringify({ w: ANCHO, h: alto, b: b.map(v => +v.toFixed(4)), k: +k.toFixed(6), s: +s.toFixed(6), d }));
  console.log(cod, `${ANCHO}x${alto}`, `${(d.length / 1024).toFixed(0)} KB`);
}
