/* ============ VISTAS DE LA GUÍA ============ */
let GQ = { q: '', c: '*' };
const ladoTxt = c => c.s ? (c.s === 'L' ? 'Izquierda' : 'Derecha') : '—';
const ladoGeneral = () => {
  const L = PLAYABLE_CO.filter(c => c.s === 'L').map(c => c.n).sort((a, b) => a.localeCompare(b, 'es'));
  return 'Se conduce por la izquierda en: ' + L.join(', ') + '. En el resto de los países y territorios de la lista se conduce por la derecha.';
};
function guiaCards() {
  const q = norm(GQ.q);
  const out = [];
  for (const c of PLAYABLE_CO.slice().sort((a, b) => a.n.localeCompare(b.n, 'es'))) {
    if (GQ.c !== '*' && c.c !== GQ.c) continue;
    const g = GUIA[c.i];
    let snip = '';
    if (q) {
      const byName = c.al.some(a => a.includes(q));
      if (!byName) {
        if (!g) continue;
        const hit = [...GUIA_SECCIONES.flatMap(([k]) => (g[k] || []).map(t => [k, t])), ...g.reg.map(([n, t]) => ['reg', n + ': ' + t])].find(([, t]) => norm(t).includes(q));
        if (!hit) continue;
        snip = hit[1];
      }
    }
    out.push(`<a class="card gcard" href="#/guia/${c.i}"><img class="flag" src="${esc(FLAG(c.i))}" alt="" loading="lazy" onerror="this.remove()"><b>${esc(c.n)}</b><small>${esc(c.c)} · ${ladoTxt(c)}${c.t ? ' · .' + c.t : ''}${c.p ? ' · +' + c.p : ''}</small>${ZONAS_ISO.has(c.i) ? '<small class="zbadge">Mapa por zonas</small>' : ''}${snip ? `<small class="snip">${esc(snip.slice(0, 120))}</small>` : g ? '' : '<small class="mut">Guía básica</small>'}</a>`);
  }
  return out.join('') || '<p class="mut">No hay resultados. Probá con otro país o palabra.</p>';
}
function guiaFilter() {
  GQ.q = $('#gq').value; $('#gl').innerHTML = guiaCards();
}
function guiaCont(c) { GQ.c = c; render(); }
function vGuia() {
  const gen = GENERAL_TIPS.map(([t, x]) => `<details class="gen"><summary>${esc(t)}</summary><p>${esc(x === '@LADO@' ? ladoGeneral() : x)}</p></details>`).join('');
  return `<h2>Guía por país</h2><p class="mut">Buscá un país o una pista (por ejemplo “amarilla”, “bolardo”, “escalera”) y abrí su ficha: conducción, coche, bolardos, matrículas, postes, líneas, teléfonos, idioma y zonas internas.</p>
  <input id="gq" class="gsearch" type="search" autocomplete="off" placeholder="Buscar país o pista…" value="${esc(GQ.q)}" oninput="guiaFilter()">
  <div class="chips">${['*', ...CONTS].map(c => `<button class="chip ${GQ.c === c ? 'on' : ''}" onclick="guiaCont('${c}')">${c === '*' ? 'Todos' : esc(c)}</button>`).join('')}</div>
  <div class="grid" id="gl">${guiaCards()}</div>
  <h3>Pistas generales</h3>${gen}
  <h3>Fuentes consultadas</h3><p class="mut">Resumen propio basado en guías de la comunidad: ${GUIA_FUENTES.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join(' · ')}.</p>`;
}
function vPais(iso) {
  const c = byIso[iso];
  if (!c) return vGuia();
  const g = GUIA[iso] || { reg: [], q: [] };
  const list = PLAYABLE_CO.slice().sort((a, b) => a.n.localeCompare(b.n, 'es')), i = list.indexOf(c);
  const prev = list[(i - 1 + list.length) % list.length], nxt = list[(i + 1) % list.length];
  const secs = GUIA_SECCIONES.filter(([k]) => g[k] && g[k].length).map(([k, l]) => `<div class="card gsec"><h4>${l}</h4><ul class="tips">${g[k].map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');
  const regs = g.reg.length ? `<h3>Zonas y regiones</h3><div class="grid">${g.reg.map(([n, t]) => `<div class="card gsec"><h4>${esc(n)}</h4><p>${esc(t)}</p></div>`).join('')}</div>` : '';
  const nq = Q.filter(q => q.iso === iso).length;
  return `<p><a href="#/guia">← Todos los países</a></p>
  <div class="ghead"><img class="flag big" src="${esc(FLAG(iso))}" alt="Bandera de ${esc(c.n)}" onerror="this.remove()"><div><h2>${esc(c.n)}</h2><p class="mut">${esc(c.c)}</p></div></div>
  <div class="stats"><div class="card"><b>${ladoTxt(c)}</b><small>Conducción</small></div><div class="card"><b>${c.t ? '.' + esc(c.t) : '—'}</b><small>Dominio</small></div><div class="card"><b>${c.p ? '+' + esc(c.p) : '—'}</b><small>Prefijo${c.p ? '' : ' (compartido)'}</small></div></div>
  <div class="acts"><button class="btn" ${nq ? '' : 'disabled'} onclick="start({cats:Object.keys(CATS),iso:'${iso}',reg:'*',diff:1,cd:0,mode:'auto',kind:'practica',n:10,tm:0})">Practicar este país (${nq} preguntas)</button></div>
  ${ZONAS_ISO.has(iso) ? '<div id="zonas-box"></div>' : ''}
  ${secs || '<p class="mut">Todavía no hay una guía detallada de este país: solo los datos básicos de arriba.</p>'}${regs}
  <div class="acts"><a class="ghost" href="#/guia/${prev.i}">← ${esc(prev.n)}</a><a class="ghost" href="#/guia/${nxt.i}">${esc(nxt.n)} →</a></div>`;
}
