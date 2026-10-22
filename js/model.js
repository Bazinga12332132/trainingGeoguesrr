/* ============ MODELO ============ */
const CATS={banderas:'Banderas',conduccion:'Conducción',dominios:'Dominios y prefijos',bolardos:'Bolardos',matriculas:'Matrículas',escenas:'No Move: lugares',islas:'Islas y territorios'};
const PR={bolardos:'¿De qué país es este bolardo?',matriculas:'¿De qué país es esta matrícula?',escenas:'¿En qué país está esta escena?'};
const DIFF=['','Fácil','Media','Difícil','Experto'];
const EASY=new Set('ar br cl co mx us ca es pt fr de it gb ie nl ru jp cn in au nz kr za eg se no uy pe'.split(' '));
const HARD=new Set('ro id sg bw gh sn mn ae bi cf td km dj gq er ga gm gn gw lr ly mw ml mr ne sl so ss sd tg tn cv st sc tl mv kp ps ki mh fm nr pw tv ag dm gd kn lc vc xk tm tj mt va'.split(' '));
const dOf=i=>EASY.has(i)?1:HARD.has(i)?3:2;
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const CO=RAW.trim().split('\n').map(l=>{const[i,nm,c,s,t,p,a]=l.split('|');return{i,n:nm,c,s,t,p,al:[nm,...(a?a.split(','):[])].map(norm)}});
const byIso=Object.fromEntries(CO.map(c=>[c.i,c]));
const CONTS=[...new Set(CO.map(c=>c.c))];
const qc=q=>q.c||byIso[q.iso].c;
const find=t=>{t=norm(t);return t?CO.find(c=>c.al.includes(t)):null};
const FLAG=i=>`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3/${i}.svg`;

const Q=[];
for(const c of CO){
  Q.push({id:'f:'+c.i,cat:'banderas',iso:c.i,d:dOf(c.i),txt:'¿De qué país es esta bandera?',img:FLAG(c.i),alt:'Bandera a identificar',ex:`Es la bandera de ${c.n} (${c.c}).`,src:'flag-icons (MIT)'});
  Q.push({id:'t:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país usa el dominio .${c.t}?`,ex:`.${c.t} es el dominio de ${c.n}.`});
  if(c.p)Q.push({id:'p:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país tiene el prefijo telefónico +${c.p}?`,ex:`+${c.p} es el prefijo de ${c.n}.`});
  const side=c.s==='L'?'Izquierda':'Derecha';
  Q.push({id:'s:'+c.i,cat:'conduccion',iso:c.i,d:dOf(c.i),txt:`¿De qué lado se conduce en ${c.n}?`,opts:['Izquierda','Derecha'],ans:side,ex:`En ${c.n} se conduce por la ${side.toLowerCase()}.`});
}
EXTRA.filter(e=>byIso[e.iso]&&(e.img||e.clue)).forEach((e,k)=>Q.push({id:'x:'+e.cat+':'+(e.key??k)+':'+e.iso,cat:e.cat,iso:e.iso,d:dOf(e.iso),txt:e.txt||PR[e.cat]||'¿De qué país es?',opts:e.opts,ans:e.ans,img:e.img,clue:e.clue,alt:e.alt||'Pista a identificar',art:e.art,ex:e.expl||`Corresponde a ${byIso[e.iso].n}.`,src:e.src,sourceName:e.sourceName,author:e.author,lic:e.lic,licUrl:e.licUrl,guide:e.guide}));

ISLANDS.filter(x=>byIso[x.iso]).forEach(x=>{const ph=ISLAND_PHOTOS[x.id]||{};
  Q.push({id:'i:'+x.id,cat:'islas',iso:x.iso,c:x.c,d:x.d,isl:1,ans:x.n,al:[x.n,...x.al].map(norm),txt:'¿Qué isla o territorio es?',
    img:ph.img,clue:x.t,alt:ph.alt||'Isla a identificar',ex:`Es ${x.n}. ${x.t}`,src:ph.src,sourceName:ph.sourceName,author:ph.author,lic:ph.lic,licUrl:ph.licUrl})});

/* La dificultad solo cambia el formato de respuesta; el filtro 'cd' elige qué países (1 fácil, 2 medio, 3 difícil, 0 todos). */
const eligibleAtDifficulty=(q,cd)=>{
  if(cd&&q.d!==cd)return false;
  if(['bolardos','matriculas'].includes(q.cat))return !!(q.img||q.clue);
  return true;
};
