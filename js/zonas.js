/* ============ ZONAS POR PAÍS: mapa, metas del coche, confusiones y práctica ============
   Datos: data/zonas/<iso>.json (pistas) y data/mapas/<iso>.json (contorno, generado con
   scripts/generar-mapas.mjs). Se cargan recién al abrir la ficha del país.

   data/zonas/<iso>.json:
   { resumen, coche: [{t, sv?}], zonas: [{id, n, lat, lng, r (km), p: [pistas], sv?}],
     confusiones: [{iso, n, dif: [diferencias]}], fuera?: [texto], fuentes: [[nombre, url]] }
   sv = {lat, lng, h (rumbo), p (inclinación: -60 mira al coche)} */
const ZONAS_ISO = new Set('ru ua bg us ca mx br ar au in bd lk bt th kh la mn kz id tr jp es za ke gh ng re'.split(' '));
const ZCACHE = {};
let ZS = null; // { iso, z, m, sel, quiz }

const cargarJson = url => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
function datosZonas(iso) {
  return ZCACHE[iso] ??= Promise.all([cargarJson(`data/zonas/${iso}.json`), cargarJson(`data/mapas/${iso}.json`)])
    .then(([z, m]) => ({ z, m }))
    .catch(e => { delete ZCACHE[iso]; throw e; });
}

/* Misma proyección que el generador: x = (lon - b0) * k * s, y = (b3 - lat) * s */
const proy = (m, lat, lng) => {
  const lon = m.b[2] > 180 && lng < 0 ? lng + 360 : lng;
  return [(lon - m.b[0]) * m.k * m.s, (m.b[3] - lat) * m.s];
};
const radioPx = (m, km) => Math.max(14, (km / 111) * m.s);

function svUrl(sv) {
  const { lat, lng, h = 0, p = 0 } = sv;
  if (GMAPS_KEY) {
    return `https://www.google.com/maps/embed/v1/streetview?key=${encodeURIComponent(GMAPS_KEY)}&location=${lat},${lng}&heading=${h}&pitch=${p}&fov=90`;
  }
  return `https://www.google.com/maps/embed?pb=!4v0!6m8!1m7!1s!2m2!1d${lat}!2d${lng}!3f${h}!4f${p}!5f0.78`;
}
/* El iframe se crea recién al tocar el botón: muchas panorámicas juntas pesan mucho. */
function svBoton(sv, texto = 'Ver Street View acá') {
  if (!sv) return '';
  return `<div class="sv"><button class="ghost svbtn" onclick="svAbrir(this)" data-src="${esc(svUrl(sv))}">${esc(texto)}</button></div>`;
}
function svAbrir(btn) {
  const f = document.createElement('iframe');
  f.className = 'svframe';
  f.src = btn.dataset.src;
  f.loading = 'lazy';
  f.allowFullscreen = true;
  f.referrerPolicy = 'no-referrer-when-downgrade';
  f.title = 'Street View';
  const nota = document.createElement('small');
  nota.className = 'mut';
  nota.textContent = 'Si queda en gris, en ese punto exacto no hay cobertura: movete con las flechas o probá otra zona.';
  btn.replaceWith(f, nota);
}

/* ---------- Render ---------- */
function mapaSvg() {
  const { m, z, sel, quiz } = ZS;
  const circ = z.zonas.map((zn, i) => {
    const [x, y] = proy(m, zn.lat, zn.lng);
    const r = radioPx(m, zn.r || 150);
    const cls = ['zona', sel === i ? 'on' : '', quiz && quiz.res != null && i === quiz.ok ? 'bien' : '', quiz && quiz.res === false && i === quiz.pick ? 'mal' : ''].join(' ');
    // Número adentro del círculo (los nombres completos se pisan en países con muchas zonas);
    // el nombre aparece solo en la zona elegida o en la respuesta de la práctica.
    const conNombre = quiz ? quiz.res != null && (i === quiz.ok || i === quiz.pick) : sel === i;
    const nombre = conNombre ? `<text x="${x.toFixed(1)}" y="${(y - r - 8).toFixed(1)}" class="zlabel">${esc(zn.n)}</text>` : '';
    const num = quiz && quiz.res == null ? '' : `<text x="${x.toFixed(1)}" y="${(y + 8).toFixed(1)}" class="znum">${i + 1}</text>`;
    return `<g class="${cls}" onclick="zonaClick(${i})" role="button" tabindex="0" aria-label="${quiz && quiz.res == null ? 'Zona ' + (i + 1) : esc(zn.n)}" onkeydown="if(event.key==='Enter')zonaClick(${i})"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>${num}${nombre}</g>`;
  }).join('');
  return `<svg class="zmapa" viewBox="-60 -60 ${m.w + 120} ${m.h + 120}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa por zonas"><path class="pais" d="${m.d}"/>${circ}</svg>`;
}
const listaZonas = () => `<ol class="zlist">${ZS.z.zonas.map((zn, i) => `<li><button class="linkbtn" onclick="zonaClick(${i})">${esc(zn.n)}</button></li>`).join('')}</ol>`;

function panelZona() {
  const { z, sel, quiz } = ZS;
  if (quiz) return panelQuiz();
  if (sel == null) return `<p class="mut">Tocá una zona del mapa o de la lista para ver cómo reconocerla.</p>${listaZonas()}`;
  const zn = z.zonas[sel];
  return `<h4>${sel + 1}. ${esc(zn.n)}</h4><ul class="tips">${zn.p.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${svBoton(zn.sv)}
  <div class="acts"><button class="ghost" onclick="zonaClick(${sel})">← Ver todas las zonas</button></div>`;
}

function panelQuiz() {
  const { z, quiz } = ZS;
  const zn = z.zonas[quiz.ok];
  const pistas = `<ul class="tips">${quiz.pistas.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
  if (quiz.res == null) {
    return `<h4>¿En qué zona estoy?</h4><p class="mut">Pistas (${quiz.n}/${quiz.tot} · aciertos ${quiz.aciertos}):</p>${pistas}<p class="mut">Tocá la zona en el mapa.</p>
    <div class="acts"><button class="ghost" onclick="quizFin()">Salir de la práctica</button></div>`;
  }
  return `<h4 class="${quiz.res ? 'ok' : 'ko'}">${quiz.res ? '¡Bien!' : 'No.'} Era: ${esc(zn.n)}</h4>${pistas}
  <ul class="tips">${zn.p.filter(t => !quiz.pistas.includes(t)).map(t => `<li>${esc(t)}</li>`).join('')}</ul>${svBoton(zn.sv)}
  <div class="acts"><button class="btn" onclick="quizSig()">Siguiente</button><button class="ghost" onclick="quizFin()">Terminar</button></div>`;
}

function seccionesExtra() {
  const { z } = ZS;
  const coche = z.coche?.length ? `<div class="card gsec"><h4>Coche y cámara de Google</h4><ul class="tips">${z.coche.map(c => `<li>${esc(c.t)}${svBoton(c.sv, 'Ver el coche en Street View')}</li>`).join('')}</ul></div>` : '';
  const conf = z.confusiones?.length ? `<h3>No te confundas con…</h3><div class="grid">${z.confusiones.map(c => `<div class="card gsec"><h4>${byIso[c.iso] ? `<img class="flag" src="${esc(FLAG(c.iso))}" alt="" onerror="this.remove()"> ` : ''}${esc(c.n)}</h4><ul class="tips">${c.dif.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${byIso[c.iso] ? `<a href="#/guia/${c.iso}">Ver ${esc(c.n)} →</a>` : ''}</div>`).join('')}</div>` : '';
  const fuera = z.fuera?.length ? `<p class="mut">${z.fuera.map(esc).join(' ')}</p>` : '';
  const fuentes = z.fuentes?.length ? `<p class="mut fuentes">Fuentes: ${z.fuentes.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(' · ')}</p>` : '';
  return { coche, conf, fuera, fuentes };
}

function zonasHtml() {
  const { z } = ZS;
  const { coche, conf, fuera, fuentes } = seccionesExtra();
  return `<h3>Mapa por zonas</h3>${z.resumen ? `<p>${esc(z.resumen)}</p>` : ''}
  <div class="zbox"><div class="zmap" id="zmap">${mapaSvg()}</div><div class="card zpanel" id="zpanel" aria-live="polite">${panelZona()}</div></div>
  ${fuera}<div class="acts"><button class="btn" onclick="quizIni()">Practicar: ¿en qué zona estoy?</button></div>
  ${coche}${conf}${fuentes}`;
}

function zonasPintar() {
  const box = document.getElementById('zonas-box');
  if (!box || !ZS) return;
  box.innerHTML = zonasHtml();
}
function zonasActualizar() {
  const map = document.getElementById('zmap'), pan = document.getElementById('zpanel');
  if (map) map.innerHTML = mapaSvg();
  if (pan) pan.innerHTML = panelZona();
}

/* Lo llama app.js después de pintar la ficha de un país. */
function montarZonas(iso) {
  const box = document.getElementById('zonas-box');
  if (!box) return;
  if (!ZONAS_ISO.has(iso)) { box.remove(); return; }
  box.innerHTML = '<p class="mut">Cargando el mapa por zonas…</p>';
  datosZonas(iso).then(({ z, m }) => {
    if (location.hash !== `#/guia/${iso}`) return;
    ZS = { iso, z, m, sel: null, quiz: null };
    zonasPintar();
  }).catch(() => {
    box.innerHTML = '<p class="mut">No se pudo cargar el mapa por zonas. <button class="ghost" onclick="montarZonas(\'' + iso + '\')">Reintentar</button></p>';
  });
}

/* ---------- Interacción ---------- */
function zonaClick(i) {
  if (!ZS) return;
  if (ZS.quiz) {
    if (ZS.quiz.res != null) return;
    const ok = i === ZS.quiz.ok;
    ZS.quiz.res = ok;
    ZS.quiz.pick = i;
    if (ok) ZS.quiz.aciertos++;
  } else {
    ZS.sel = ZS.sel === i ? null : i;
  }
  zonasActualizar();
}

function quizIni() {
  if (!ZS) return;
  ZS.sel = null;
  ZS.quiz = { orden: shuf(ZS.z.zonas.map((_, i) => i)), n: 0, tot: ZS.z.zonas.length, aciertos: 0 };
  quizSig();
}
function quizSig() {
  const q = ZS.quiz;
  if (q.n >= q.tot) {
    const pan = document.getElementById('zpanel');
    ZS.quiz = null;
    zonasActualizar();
    if (pan) pan.innerHTML = `<h4>Terminaste</h4><p>Acertaste ${q.aciertos} de ${q.tot} zonas.</p><div class="acts"><button class="btn" onclick="quizIni()">Otra vez</button></div>`;
    return;
  }
  q.ok = q.orden[q.n++];
  q.res = null;
  q.pick = null;
  q.pistas = shuf(ZS.z.zonas[q.ok].p).slice(0, 2);
  zonasActualizar();
  document.getElementById('zonas-box')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
function quizFin() {
  ZS.quiz = null;
  zonasActualizar();
}
