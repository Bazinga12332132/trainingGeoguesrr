/* ============ MODELO ============ */
const CATS={banderas:'Banderas',conduccion:'Conducción',dominios:'Dominios y prefijos',bolardos:'Bolardos',matriculas:'Matrículas'};
const PR={bolardos:'¿De qué país es este bolardo?',matriculas:'¿De qué país es esta matrícula?'};
const DIFF=['','Fácil','Media','Difícil','Experto'];
const EASY=new Set('ar br cl co mx us ca es pt fr de it gb ie nl ru jp cn in au nz kr za eg se no uy pe'.split(' '));
const HARD=new Set('ro id sg bw gh sn mn ae'.split(' '));
const dOf=i=>EASY.has(i)?1:HARD.has(i)?3:2;
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const CO=RAW.trim().split('\n').map(l=>{const[i,nm,c,s,t,p,a]=l.split('|');return{i,n:nm,c,s,t,p,al:[nm,...(a?a.split(','):[])].map(norm)}});
const byIso=Object.fromEntries(CO.map(c=>[c.i,c]));
const CONTS=[...new Set(CO.map(c=>c.c))];
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
EXTRA.filter(e=>e.ver==='verified'&&byIso[e.iso]&&e.img).forEach((e,k)=>Q.push({id:'x:'+e.cat+':'+k+':'+e.iso,cat:e.cat,iso:e.iso,d:e.d||2,txt:e.txt||PR[e.cat]||'¿De qué país es?',img:e.img,alt:e.alt||'Pista a identificar',ex:e.expl||`Corresponde a ${byIso[e.iso].n}.`,src:e.src,lic:e.lic}));
