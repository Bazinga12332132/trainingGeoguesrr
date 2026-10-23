/* ============ MODELO ============ */
const CATS={banderas:'Banderas',conduccion:'Conducción',dominios:'Dominios y prefijos',idiomas:'Reconocer idiomas',bolardos:'Bolardos',matriculas:'Matrículas',escenas:'No Move'};
const PR={bolardos:'¿De qué país es este bolardo?',matriculas:'¿De qué país es esta matrícula?',escenas:'¿En qué país está esta escena?',idiomas:'¿Qué idioma aparece en este ejemplo?'};
const DIFF=['','Fácil','Media','Difícil','Experto'];
const EASY=new Set('ar br cl co mx us ca es pt fr de it gb ie nl ru jp cn in au nz kr za eg se no uy pe'.split(' '));
const HARD=new Set('ro id sg bw gh sn mn ae bi cf td km dj gq er ga gm gn gw lr ly mw ml mr ne sl so ss sd tg tn cv st sc tl mv kp ps ki mh fm nr pw tv ag dm gd kn lc vc xk tm tj mt va mp vi as pn um cx cc pm cw x-kk'.split(' '));
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

const NOFLAG=new Set(CO.filter(c=>c.i.startsWith('x-')).map(c=>c.i));
const Q=[];
for(const c of CO){
  if(!NOFLAG.has(c.i))Q.push({id:'f:'+c.i,cat:'banderas',iso:c.i,d:dOf(c.i),txt:'¿De qué país es esta bandera?',img:FLAG(c.i),alt:'Bandera a identificar',ex:`Es la bandera de ${c.n} (${c.c}).`,src:'flag-icons (MIT)'});
  if(c.t)Q.push({id:'t:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país usa el dominio .${c.t}?`,ex:`.${c.t} es el dominio de ${c.n}.`});
  if(c.p)Q.push({id:'p:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país tiene el prefijo telefónico +${c.p}?`,ex:`+${c.p} es el prefijo de ${c.n}.`});
  const LANGS={ar:['español','¿Cómo estás?'],br:['portugués','Como você está?'],cl:['español','¿Cómo estás?'],co:['español','¿Cómo estás?'],mx:['español','¿Cómo estás?'],es:['español','¿Cómo estás?'],pt:['portugués','Como estás?'],fr:['francés','Comment ça va ?'],de:['alemán','Wie geht es dir?'],at:['alemán','Wie geht es dir?'],ch:['alemán','Wie geht es dir?'],it:['italiano','Come stai?'],gb:['inglés','How are you?'],ie:['inglés','How are you?'],us:['inglés','How are you?'],ca:['francés','Comment ça va ?'],nl:['neerlandés','Hoe gaat het?'],se:['sueco','Hur mår du?'],no:['noruego','Hvordan går det?'],dk:['danés','Hvordan går det?'],fi:['finés','Mitä kuuluu?'],pl:['polaco','Jak się masz?'],cz:['checo','Jak se máš?'],sk:['eslovaco','Ako sa máš?'],ru:['ruso','Как дела?'],ua:['ucraniano','Як справи?'],jp:['japonés','お元気ですか？'],kr:['coreano','잘 지내세요?'],cn:['chino mandarín','你好吗？'],in:['hindi','आप कैसे हैं?'],gr:['griego','Τι κάνεις;'],il:['hebreo','מה שלומך?'],tr:['turco','Nasılsın?'],id:['indonesio','Apa kabar?'],th:['tailandés','สบายดีไหม?'],vn:['vietnamita','Bạn khỏe không?'],sa:['árabe','كيف حالك؟'],eg:['árabe','كيف حالك؟'],ro:['rumano','Ce mai faci?'],hu:['húngaro','Hogy vagy?'],is:['islandés','Hvernig hefurðu það?'],nz:['inglés','How are you?'],au:['inglés','How are you?'],za:['inglés','How are you?'],uy:['español','¿Cómo estás?'],pe:['español','¿Cómo estás?'],bo:['español','¿Cómo estás?'],ec:['español','¿Cómo estás?'],py:['español','¿Cómo estás?'],ve:['español','¿Cómo estás?'],ma:['árabe','كيف حالك؟'],la:['laosiano','ສະບາຍດີບໍ?']};
const LANG_OPTIONS=[...new Set(Object.values(LANGS).map(x=>x[0]))];
for(const c of CO){const l=LANGS[c.i];if(l)Q.push({id:'lang:'+c.i,cat:'idiomas',iso:c.i,d:dOf(c.i),txt:`¿Qué idioma es este ejemplo? “${l[1]}”`,opts:shuf([l[0],...shuf(LANG_OPTIONS.filter(x=>x!==l[0])).slice(0,3)]),ans:l[0],ex:`La frase está en ${l[0]}. En un país puede haber varios idiomas oficiales o regionales; esta es una pista, no una regla absoluta.`});}
  const side=c.s==='L'?'Izquierda':'Derecha';
  if(c.s)Q.push({id:'s:'+c.i,cat:'conduccion',iso:c.i,d:dOf(c.i),txt:`¿De qué lado se conduce en ${c.n}?`,opts:['Izquierda','Derecha'],ans:side,ex:`En ${c.n} se conduce por la ${side.toLowerCase()}.`});
}
[...EXTRA,...ISLAND_IMAGES.map((e,k)=>({...e,key:'isl'+k}))].filter(e=>byIso[e.iso]&&(e.img||e.clue)).forEach((e,k)=>Q.push({id:'x:'+e.cat+':'+(e.key??k)+':'+e.iso,cat:e.cat,iso:e.iso,d:dOf(e.iso),txt:e.txt||PR[e.cat]||'¿De qué país es?',opts:e.opts,ans:e.ans,img:e.img,clue:e.clue,alt:e.alt||'Pista a identificar',art:e.art,ex:e.expl||`Corresponde a ${byIso[e.iso].n}.`,src:e.src,sourceName:e.sourceName,author:e.author,lic:e.lic,licUrl:e.licUrl,guide:e.guide}));

/* La dificultad solo cambia el formato de respuesta; el filtro 'cd' elige qué países (1 fácil, 2 medio, 3 difícil, 0 todos). */
const eligibleAtDifficulty=(q,cd)=>{
  if(cd&&q.d!==cd)return false;
  if(['bolardos','matriculas'].includes(q.cat))return !!(q.img||q.clue);
  return true;
};
