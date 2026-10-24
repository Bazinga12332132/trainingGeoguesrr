/* ============ VISTAS ============ */
const ansTxt=q=>q.ans||byIso[q.iso].n;
const pickTxt=p=>!p?'sin respuesta':p[0]==='?'?p.slice(1):byIso[p]?byIso[p].n:p;
const src=()=>''; // Las imágenes son solo visuales: no se muestran enlaces ni referencias de origen durante el juego.


const categoryCount=(category,cd,reg,iso)=>Q.filter(q=>q.cat===category&&eligibleAtDifficulty(q,cd)&&(reg==='*'||qc(q)===reg)&&(!iso||iso==='*'||q.iso===iso)).length;
function vHome(){const a=agg(),n=pend().length;
  return `<div class="hero"><h2>Entrená el ojo para GeoGuessr</h2><p>Practicá con banderas, idiomas, bolardos, matrículas, dominios, prefijos y escenas. En No Move, deducí el país a partir de una imagen sin pistas del lugar.</p></div>
  <div class="acts"><button class="btn" onclick="go('#/entrenar')">Entrenar</button>
  <button class="ghost" onclick="startNoMove()">Jugar No Move · ${categoryCount('escenas',0,'*')} fotos</button>
  <button class="ghost" onclick="go('#/guia')">Guía por país</button>
  <button class="ghost" ${n?'':'disabled'} onclick="reviewErrors()">Repasar errores (${n})</button></div>
  <div class="stats"><div class="card"><b>${pct(a.tot[0],a.tot[1])}%</b><small>Precisión</small></div>
  <div class="card"><b>${a.tot[1]}</b><small>Respondidas</small></div>
  <div class="card"><b>${ST.streak}</b><small>Racha (mejor: ${ST.best})</small></div></div>
  <h3>Categorías</h3><div class="grid">${Object.entries(CATS).map(([k,v])=>{const c=categoryCount(k,CFG.cd,CFG.reg);
  return `<button class="card" ${c?'':'disabled'} onclick="CFG.cats=['${k}'];go('#/entrenar')"><b>${v}</b><br><small>${c?`${c} disponibles `:'Sin preguntas para estos filtros'}</small></button>`}).join('')}</div>`}

function reviewErrors(){start({cats:Object.keys(CATS),reg:'*',diff:4,cd:0,mode:'auto',n:0,tm:0,kind:'repaso',ids:pend().map(q=>q.id)})}
function startNoMove(){const n=categoryCount('escenas',0,'*');start({cats:['escenas'],reg:'*',diff:4,cd:0,mode:'type',kind:'practica',n,tm:0})}

const sel=(name,opts,cur,onchange='')=>`<select name="${name}" ${onchange?`onchange="${onchange}"`:''}>${opts.map(([v,l])=>`<option value="${v}" ${String(v)===String(cur)?'selected':''}>${l}</option>`).join('')}</select>`;
function vSetup(){const c=CFG;
  return `<h2>Configurar sesión</h2><form id="f" onsubmit="return false">
  <label>Categorías</label>${Object.entries(CATS).map(([k,v])=>{const n=categoryCount(k,c.cd,c.reg,c.iso);
  return `<label class="chk"><input id="cat-${k}" type="checkbox" name="cat" value="${k}" ${c.cats.includes(k)&&n?'checked':''} ${n?'':'disabled'}> ${v} <small class="mut">(<span id="count-${k}">${n}</span> disponibles)</small></label>`}).join('')}
  <label>País específico (opcional)</label>${sel('iso',[['*','Todos los países'],...PLAYABLE_CO.slice().sort((a,b)=>a.n.localeCompare(b.n,'es')).map(x=>[x.i,x.n])],c.iso||'*','updateCategoryCounts()')}<small class="mut">Útil con Regiones y zonas: elegí Japón, Estados Unidos, Brasil, etc. y practicás solo ese país.</small>
  <label>Región</label>${sel('reg',[['*','Mundo'],...CONTS.map(x=>[x,x])],c.reg,'updateCategoryCounts()')}
  <label>Países / territorios</label>${sel('cd',[[0,'Todos'],[1,'Fáciles'],[2,'Medios'],[3,'Difíciles']],c.cd,'updateCategoryCounts()')}
  <label>Dificultad</label>${sel('diff',[[1,'Fácil · 4 opciones'],[2,'Media · 8 opciones similares'],[3,'Difícil · elegir entre todos los países'],[4,'Experto · escribir la respuesta']],c.diff)}<small class="mut">La dificultad controla automáticamente cómo respondés. Las imágenes no cambian.</small>
  <label>Tipo de sesión</label>${sel('kind',[['practica','Práctica (corrige al instante)'],['examen','Examen (resultados al final)'],['repaso','Repaso (reintenta hasta acertar)']],c.kind)}
  <label>Cantidad</label>${sel('n',[[10,'10'],[20,'20'],[50,'50'],[0,'Práctica infinita']],c.n)}
  <label>Temporizador por pregunta</label>${sel('tm',[[0,'Sin tiempo'],[10,'10 s'],[20,'20 s'],[30,'30 s']],c.tm)}
  <p class="err" id="err"></p><button class="btn" onclick="begin()">Empezar</button></form>`}
function updateCategoryCounts(){const f=$('#f');if(!f)return;
  for(const k of Object.keys(CATS)){const n=categoryCount(k,+f.cd.value,f.reg.value,f.iso.value),count=document.getElementById(`count-${k}`),check=document.getElementById(`cat-${k}`);
    count.textContent=n;check.disabled=!n;if(!n)check.checked=false}}
function begin(){const f=$('#f'),cats=[...f.querySelectorAll('[name=cat]:checked')].map(x=>x.value);
  if(!cats.length){$('#err').textContent='Elegí al menos una categoría.';return}
  CFG={cats,iso:f.iso.value,reg:f.reg.value,diff:+f.diff.value,cd:+f.cd.value,mode:'auto',kind:f.kind.value,n:+f.n.value,tm:+f.tm.value};start(CFG)}

function vPlay(){const s=S;if(!s)return vHome();const q=s.qs[s.i],m=q.opts?'o':modeOf(s),rep=s.cfg.kind==='repaso';
  const showPhoto=!!q.img;
  const showClue=!!q.clue&&!q.img;
  const progress=rep?`${s.reviewSolved}/${s.reviewTotal} dominadas · ${s.i+1}ª en cola`:`${s.i+1}/${s.cfg.n?s.qs.length:'∞'} · ${CATS[q.cat]} · ${DIFF[s.cfg.diff]}`;
  let h=`<div class="top"><span>${progress}${rep?' · '+CATS[q.cat]:''}</span><span id="tm" class="tm">${s.cfg.tm&&!s.fb&&!rep?s.tl+'s':''}</span><button class="ln" onclick="end()">Terminar</button></div>
  <div class="bar"><i style="width:${rep?(s.reviewSolved/Math.max(1,s.reviewTotal)*100):(s.cfg.n?s.i/s.qs.length*100:0)}%"></i></div>
  <h2>${esc(q.txt)}</h2>${showPhoto?`<img class="pic ${q.cat==='matriculas'?'plate-pic':''}" src="${esc(q.img)}" alt="${esc(q.alt)}">${src(q)}`:''}${showClue?`<div class="clue">${esc(q.clue)}</div>${showPhoto?'':src(q,false)}`:''}`;
  if(s.fb){const r=s.currentResult;
    return h+`<div class="fb ${r.ok?'ok':'ko'}"><b>${r.ok?'Correcto':'Incorrecto'}</b>${r.ok?'':` · respondiste: ${esc(pickTxt(r.pick))}`}${feedbackHtml(q)}</div><button class="btn" id="nx" onclick="next()">${rep?(r.ok?'Siguiente pista':'Seguir practicando'):'Siguiente'}</button>`}
  if(m==='o')return h+`<div class="opts">${q.opts.map(o=>`<button data-v="${esc(o)}" onclick="answer(this.dataset.v,1)">${o}</button>`).join('')}</div>`;
  if(m==='mc'||m==='mc8'){s.ch=s.ch||choices(q,m==='mc8'?8:4);return h+`<div class="opts">${s.ch.map(c=>`<button data-v="${c.i}" onclick="answer(this.dataset.v,1)">${esc(c.n)}</button>`).join('')}</div>`}
  const L=PLAYABLE_CO.filter(c=>s.cfg.reg==='*'||c.c===s.cfg.reg);
  return h+`<div class="in"><input id="a" autocomplete="off" autocapitalize="off" placeholder="${m==='all'?'Buscá y elegí un país':'Escribí el país'}" ${m==='all'?'list="cl"':''} onkeydown="if(event.key==='Enter')answer(this.value)"><button class="btn" onclick="answer($('#a').value)">Confirmar</button></div>${m==='all'?`<datalist id="cl">${L.map(c=>`<option value="${esc(c.n)}">`).join('')}</datalist>`:''}`}

const grp=(r,f)=>r.reduce((m,x)=>{const k=f(x),a=m[k]||(m[k]=[0,0]);a[0]+=x.ok;a[1]++;return m},{});
function vFin(){const s=S;if(!s||!s.res.length)return vHome();const r=s.res,ok=r.filter(x=>x.ok).length,bad=r.filter(x=>!x.ok);
  const avg=(r.reduce((a,x)=>a+x.ms,0)/r.length/1000).toFixed(1);
  return `<h2>Resultados</h2><div class="stats"><div class="card"><b>${pct(ok,r.length)}%</b><small>Precisión</small></div>
  <div class="card"><b>${ok}/${r.length}</b><small>Aciertos</small></div><div class="card"><b>${avg} s</b><small>Tiempo promedio</small></div></div>
  <h3>Por categoría</h3>${rows(grp(r,x=>CATS[x.q.cat]))}<h3>Por continente</h3>${rows(grp(r,x=>qc(x.q)))}
  <h3>Errores (${bad.length})</h3>${bad.length?bad.map(x=>`<div class="card" style="margin:6px 0">${x.q.img?`<img class="mini" src="${esc(x.q.img)}" alt="">`:''}${esc(x.q.txt)}${x.q.clue?`<br><small>${esc(x.q.clue)}</small>`:''}<br>Correcta: <b>${esc(ansTxt(x.q))}</b>${s.cfg.kind==='repaso'?'':` · tu respuesta: ${esc(pickTxt(x.pick))}`}</div>`).join(''):'<p class="mut">Sin errores.</p>'}
  <div class="acts"><button class="btn" onclick="start(S.cfg)">Repetir sesión</button>
  <button class="ghost" ${bad.length?'':'disabled'} onclick="start({cats:Object.keys(CATS),reg:'*',diff:4,mode:'auto',n:0,tm:0,kind:'repaso',ids:S.res.filter(x=>!x.ok).map(x=>x.q.id)})">Repasar estos errores</button>
  <button class="ghost" onclick="go('#/')">Volver al inicio</button></div>`}

function vProg(){const a=agg(),conf=Object.entries(ST.conf).sort((x,y)=>y[1]-x[1]).slice(0,6),n=pend().length;
  const sorted=Object.entries(a.cat).filter(([,v])=>v[1]>=3).sort((x,y)=>pct(...y[1])-pct(...x[1]));
  return `<h2>Progreso</h2><div class="stats"><div class="card"><b>${pct(a.tot[0],a.tot[1])}%</b><small>Precisión histórica</small></div>
  <div class="card"><b>${a.tot[1]}</b><small>Respondidas</small></div><div class="card"><b>${n}</b><small>Pendientes de repaso</small></div></div>
  <h3>Por categoría</h3>${rows(a.cat)}
  ${sorted.length>1?`<p class="mut">Más fuerte: ${esc(sorted[0][0])} · Más débil: ${esc(sorted.at(-1)[0])}</p>`:''}
  <h3>Países que confundís</h3>${conf.length?conf.map(([k,v])=>{const[x,y]=k.split('>');return `<div class="row" style="grid-template-columns:1fr 50px"><span>${esc(byIso[x].n)} → respondiste ${esc(byIso[y].n)}</span><b>×${v}</b></div>`}).join(''):'<p class="mut">Todavía no hay confusiones registradas.</p>'}
  <div class="acts"><button class="btn" ${n?'':'disabled'} onclick="reviewErrors()">Repasar errores</button>
  <button class="ghost" onclick="if(confirm('¿Borrar todas las estadísticas de este navegador?')){ST={q:{},conf:{},streak:0,best:0};save();render()}">Borrar estadísticas</button></div>`}

/* Cuadro de explicación posterior a responder: país + datos rápidos + tips de la guía. */
function feedbackHtml(q){
  const c=byIso[q.iso],g=GUIA[q.iso],tips=feedbackTips(q),note=specificNote(q);
  const isCountryAns=!q.opts;
  const facts=[c.s?(c.s==='L'?'Conduce por la izquierda':'Conduce por la derecha'):'',c.t?'.'+c.t:'',c.p?'+'+c.p:''].filter(Boolean).join(' · ');
  let h=`<div class="fb-head">${isCountryAns?`Este país es <b>${esc(c.n)}</b>`:`Respuesta: <b>${esc(q.ans)}</b>`}${q.cat==='regiones'||!isCountryAns?` · ${esc(c.n)}`:''}</div>`;
  if(q.cat!=='idiomas'){
    h+=`<div class="fb-facts"><img class="flag" src="${esc(FLAG(c.i))}" alt="" onerror="this.remove()">${esc(c.c)}${facts?' · '+esc(facts):''}</div>`;
    if(q.cat==='regiones'&&q.clue)h+=`<p class="fb-note">${esc(q.clue)}</p>`;
    if(note)h+=`<p class="fb-note">En la imagen: ${esc(note)}</p>`;
    if(tips.length)h+=`<ul class="tips">${tips.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    else if(!g)h+=`<p class="mut">Todavía no hay guía detallada de este país.</p>`;
    h+=`<a class="fb-link" href="#/guia/${esc(q.iso)}" onclick="end0()">Ver la guía completa de ${esc(c.n)} →</a>`;
  }else if(q.ex)h+=`<p class="fb-note">${esc(q.ex)}</p>`;
  if(q.img&&(q.author||q.lic))h+=`<details class="cred"><summary>Créditos de la foto</summary>${esc(q.author||'')} ${q.licUrl?`<a href="${esc(q.licUrl)}" target="_blank" rel="noopener">${esc(q.lic||'licencia')}</a>`:esc(q.lic||'')}${q.src?` · <a href="${esc(q.src)}" target="_blank" rel="noopener">fuente</a>`:''}</details>`;
  return h}
const end0=()=>{if(S)clearInterval(S.tm)};
