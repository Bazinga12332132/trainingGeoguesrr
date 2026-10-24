/* ============ MODELO ============ */
const CATS={banderas:'Banderas',conduccion:'Conducción',dominios:'Dominios y prefijos',idiomas:'Reconocer idiomas',bolardos:'Bolardos',matriculas:'Matrículas',postes:'Postes eléctricos',coche:'Coche y cámara',pistas:'Pistas de entorno',regiones:'Regiones y zonas',escenas:'No Move'};
const PR={bolardos:'¿De qué país es este bolardo?',matriculas:'¿De qué país es esta matrícula?',escenas:'¿En qué país está esta escena?',idiomas:'¿Qué idioma aparece en este ejemplo?',postes:'¿De qué país es este poste eléctrico?',coche:'¿De qué país es esta pista del coche de Google?',pistas:'¿De qué país o territorio es esta pista?'};
const DIFF=['','Fácil','Media','Difícil','Experto'];
const EASY=new Set('ar br cl co mx us ca es pt fr de it gb ie nl ru jp cn in au nz kr za eg se no uy pe'.split(' '));
const HARD=new Set('ro id sg bw gh sn mn ae bi cf td km dj gq er ga gm gn gw lr ly mw ml mr ne sl so ss sd tg tn cv st sc tl mv kp ps ki mh fm nr pw tv ag dm gd kn lc vc xk tm tj mt va mp vi as pn um cx cc pm cw x-kk hk mo io gi je sj mq fk gs aq ml st re eg tz iq'.split(' '));
const dOf=i=>EASY.has(i)?1:HARD.has(i)?3:2;
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const CO=RAW.trim().split('\n').map(l=>{const[i,nm,c,s,t,p,a]=l.split('|');return{i,n:nm,c,s,t,p,al:[nm,...(a?a.split(','):[])].map(norm)}});
const byIso=Object.fromEntries(CO.map(c=>[c.i,c]));
// Países y territorios con cobertura oficial en GeoGuessr (contrastado con Plonk It y GeoTips; Bosnia, Paraguay, Namibia y Liechtenstein se sumaron en 2024).
// Georgia (ge) y Kosovo (xk) se incluyen por confirmación del usuario. Vietnam (vn) queda afuera: solo tiene cobertura no oficial.
const PLAYABLE_ISO=new Set(`
 bw eg sz gh ke ls mg ml na ng re rw st sn za tz tn ug
 bd bt io kh cn hk in id iq il ps jp jo kz kg la lb mo my mn np om pk ph qa sg kr lk tw th tr ae
 al ad at by ba be bg hr cy cz dk ee fo fi fr de gi gr hu is ie im it je lv li lt lu mt mc me nl mk no pl pt ro ru sm rs sk si es sj se ch ua gb ge xk
 bm ca cr cw do fk gl gs gt mq mx pa pm pr us vi ar bo br cl co ec py pe uy
 au nz gu mp as cx um aq
`.trim().split(/\s+/));
const PLAYABLE_CO=CO.filter(c=>PLAYABLE_ISO.has(c.i));
const CONTS=[...new Set(PLAYABLE_CO.map(c=>c.c))];
const qc=q=>q.c||byIso[q.iso].c;
const find=t=>{t=norm(t);return t?PLAYABLE_CO.find(c=>c.al.includes(t)):null};
const FLAG=i=>`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3/${i}.svg`;

const NOFLAG=new Set(CO.filter(c=>c.i.startsWith('x-')).map(c=>c.i));
const Q=[];
for(const c of PLAYABLE_CO){
  if(!NOFLAG.has(c.i))Q.push({id:'f:'+c.i,cat:'banderas',iso:c.i,d:dOf(c.i),txt:'¿De qué país es esta bandera?',img:FLAG(c.i),alt:'Bandera a identificar',ex:'',src:'flag-icons (MIT)'});
  if(c.t)Q.push({id:'t:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país usa el dominio .${c.t}?`,ex:''});
  if(c.p)Q.push({id:'p:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué país tiene el prefijo telefónico +${c.p}?`,ex:''});
  const side=c.s==='L'?'Izquierda':'Derecha';
  if(c.s)Q.push({id:'s:'+c.i,cat:'conduccion',iso:c.i,d:dOf(c.i),txt:`¿De qué lado se conduce en ${c.n}?`,opts:['Izquierda','Derecha'],ans:side,ex:''});
}
// Preguntas inversas: país -> dominio / prefijo.
const DOMS=[...new Set(PLAYABLE_CO.filter(c=>c.t).map(c=>'.'+c.t))],PFX=[...new Set(PLAYABLE_CO.filter(c=>c.p).map(c=>'+'+c.p))];
for(const c of PLAYABLE_CO){
  if(c.t)Q.push({id:'td:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué dominio de Internet usa ${c.n}?`,opts:shuf(['.'+c.t,...shuf(DOMS.filter(x=>x!=='.'+c.t)).slice(0,3)]),ans:'.'+c.t,ex:''});
  if(c.p)Q.push({id:'pd:'+c.i,cat:'dominios',iso:c.i,d:dOf(c.i),txt:`¿Qué prefijo telefónico tiene ${c.n}?`,opts:shuf(['+'+c.p,...shuf(PFX.filter(x=>x!=='+'+c.p)).slice(0,3)]),ans:'+'+c.p,ex:''});
}
// Ejemplos breves en idiomas reales y reconocibles; cada idioma aparece una sola vez.
const LANGS={ar:['español','¿Cómo estás?'],br:['portugués','Como você está?'],pt:['portugués','Como estás?'],fr:['francés','Comment ça va ?'],de:['alemán','Wie geht es dir?'],it:['italiano','Come stai?'],gb:['inglés','How are you?'],nl:['neerlandés','Hoe gaat het?'],se:['sueco','Hur mår du?'],no:['noruego','Hvordan går det?'],dk:['danés','Hvordan går det?'],fi:['finés','Mitä kuuluu?'],pl:['polaco','Jak się masz?'],cz:['checo','Jak se máš?'],sk:['eslovaco','Ako sa máš?'],bg:['búlgaro','Здравейте, как сте?'],ru:['ruso','Как дела?'],ua:['ucraniano','Як справи?'],jp:['japonés','お元気ですか？'],kr:['coreano','잘 지내세요?'],cn:['chino mandarín','你好吗？'],lk:['cingalés (sinhala)','ඔබට කොහොමද?'],in:['hindi','आप कैसे हैं?'],gr:['griego','Τι κάνεις;'],il:['hebreo','מה שלומך?'],tr:['turco','Nasılsın?'],id:['indonesio','Apa kabar?'],th:['tailandés','สบายดีไหม?'],vn:['vietnamita','Bạn khỏe không?'],sa:['árabe','كيف حالك؟'],ro:['rumano','Ce mai faci?'],hu:['húngaro','Hogy vagy?'],is:['islandés','Hvernig hefurðu það?'],la:['lao','ສະບາຍດີບໍ?'],ae:['árabe','كيف حالك؟'],mn:['mongol','Сайн байна уу?'],kz:['kazajo','Қалың қалай?'],np:['nepalí','तपाईंलाई कस्तो छ?'],bd:['bengalí','আপনি কেমন আছেন?'],pk:['urdu','آپ کیسے ہیں؟'],ph:['filipino','Kumusta ka?'],mt:['maltés','Kif int?'],al:['albanés','Si jeni?'],hr:['croata','Kako si?'],ee:['estonio','Kuidas läheb?'],lv:['letón','Kā jums klājas?'],lt:['lituano','Kaip sekasi?'],mk:['macedonio','Како си?'],ke:['suajili','Habari yako?'],mg:['malgache','Manao ahoana ianao?']};
const LANG_OPTIONS=[...new Set([...PLAYABLE_CO.map(c=>LANGS[c.i]?.[0]).filter(Boolean),'chino mandarín'])];
const seenLanguages=new Set();
for(const c of PLAYABLE_CO){
  const l=LANGS[c.i];
  if(l&&!seenLanguages.has(l[0])){
    seenLanguages.add(l[0]);
    Q.push({id:'lang:'+c.i,cat:'idiomas',iso:c.i,d:dOf(c.i),txt:`¿Qué idioma es este ejemplo? “${l[1]}”`,opts:shuf([l[0],...shuf(LANG_OPTIONS.filter(x=>x!==l[0])).slice(0,3)]),ans:l[0],ex:`La frase está en ${l[0]}. Esta pista identifica el idioma, no un país único: una misma lengua puede usarse en varios países.`});
  }
}
// Más ejemplos en escrituras distintivas solicitadas. Se pregunta por el idioma, no por un país,
// para no convertir una frase compartida (p. ej. portugués o chino) en una respuesta geográfica falsa.
const LANG_EXTRA=[
  ['lk','cingalés (sinhala)','ඔබේ නම මොකක්ද?'],
  ['jp','japonés','駅はどこですか？'],
  ['cn','chino mandarín','请问，地铁站在哪里？'],
  ['kr','coreano','지하철역이 어디예요?'],
  ['bg','búlgaro','Къде е гарата?'],
  ['ru','ruso','Где находится вокзал?'],
  ['ua','ucraniano','Де знаходиться вокзал?'],
  ['gr','griego','Πού είναι ο σταθμός;']
];
for(const [iso,language,phrase] of LANG_EXTRA){
  if(!byIso[iso]||!LANG_OPTIONS.includes(language))continue;
  Q.push({id:'lang-extra:'+iso,cat:'idiomas',iso,d:dOf(iso),txt:`¿Qué idioma es este ejemplo? “${phrase}”`,opts:shuf([language,...shuf(LANG_OPTIONS.filter(x=>x!==language)).slice(0,3)]),ans:language,ex:`La frase está en ${language}. El idioma puede dar una pista regional, pero por sí solo no demuestra un país exacto.`});
}
/* Preguntas de texto generadas desde la guía: regiones y pistas exclusivas. */
const GCAT={bol:'bolardos',mat:'matriculas',pos:'postes',coche:'coche'};
for(const [iso,g] of Object.entries(GUIA)){
  if(!PLAYABLE_ISO.has(iso)||!byIso[iso])continue;
  const nm=norm(byIso[iso].n);
  g.q.forEach((x,i)=>{if(norm(x.t).includes(nm))return;const cat=GCAT[x.c]||'pistas';
    Q.push({id:'g:'+iso+':'+i,cat,iso,d:x.d||dOf(iso),txt:PR[cat],clue:x.t,alt:'Pista de texto',ex:''})});
  if(g.reg.length>=3){const names=g.reg.map(r=>r[0]);
    g.reg.forEach(([name,tip],i)=>{if(norm(tip).includes(norm(name)))return;
      Q.push({id:'r:'+iso+':'+i,cat:'regiones',iso,d:dOf(iso),txt:`Estás en ${byIso[iso].n}. ¿Qué zona describe esta pista?`,clue:tip,opts:shuf([name,...shuf(names.filter(n=>n!==name)).slice(0,5)]),ans:name,alt:'Pista de zona',ex:''})})}
}
[...EXTRA,...ISLAND_IMAGES.map((e,k)=>({...e,key:'isl'+k}))].filter(e=>PLAYABLE_ISO.has(e.iso)&&(e.img||e.clue)).forEach((e,k)=>Q.push({id:'x:'+e.cat+':'+(e.key??k)+':'+e.iso,cat:e.cat,iso:e.iso,d:dOf(e.iso),txt:e.txt||PR[e.cat]||'¿De qué país es?',opts:e.opts,ans:e.ans,img:e.img,clue:e.clue,alt:e.alt||'Pista a identificar',art:e.art,ex:e.expl||`Corresponde a ${byIso[e.iso].n}.`,src:e.src,sourceName:e.sourceName,author:e.author,lic:e.lic,licUrl:e.licUrl,guide:e.guide}));

/* La dificultad solo cambia el formato de respuesta; el filtro 'cd' elige qué países (1 fácil, 2 medio, 3 difícil, 0 todos). */
const eligibleAtDifficulty=(q,cd)=>{
  if(cd&&q.d!==cd)return false;
  if(['bolardos','matriculas','postes'].includes(q.cat))return !!(q.img||q.clue);
  return true;
};
