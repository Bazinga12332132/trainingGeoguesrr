/* ============ MOTOR DE PREGUNTAS ============ */
const pool=c=>Q.filter(q=>c.cats.includes(q.cat)&&eligibleAtDifficulty(q,c.cd)&&(c.reg==='*'||qc(q)===c.reg)&&(!c.ids||c.ids.includes(q.id)));
const wt=q=>{const s=ST.q[q.id];return s?Math.max(.4,1+(s.p?3:0)+s.ko*.5-s.ok*.3):1.5};
function draw(p,k){const out=[];const r=p.map(q=>({q,w:wt(q)}));while(out.length<k&&r.length){let x=Math.random()*r.reduce((a,y)=>a+y.w,0),i=0;for(;i<r.length-1&&(x-=r[i].w)>0;i++);out.push(r[i].q);r.splice(i,1)}return out}
const modeOf=s=>s.cfg.mode!=='auto'?s.cfg.mode:s.cfg.diff===1?'mc':s.cfg.diff===2?'mc8':s.cfg.diff===3?'all':'type';
function choices(q,n){const s=S;
  if(q.isl){const o=ISLANDS.filter(x=>x.n!==q.ans&&byIso[x.iso]),cc=qc(q),same=shuf(o.filter(x=>(x.c||byIso[x.iso].c)===cc)),oth=shuf(o.filter(x=>(x.c||byIso[x.iso].c)!==cc));
    return shuf([{i:q.ans,n:q.ans},...(n>4?[...same,...oth]:[...oth,...same]).slice(0,n-1).map(x=>({i:x.n,n:x.n}))])}
  const c=byIso[q.iso],reg=CO.filter(x=>s.cfg.reg==='*'||x.c===s.cfg.reg),P=reg.length>=n?reg:CO;
  const same=shuf(P.filter(x=>x!==c&&x.c===c.c)),oth=shuf(P.filter(x=>x!==c&&x.c!==c.c));
  return shuf([c,...(n>4?[...same,...oth]:[...oth,...same]).slice(0,n-1)])}
function reset(){S.fb=0;S.ch=null;S.currentResult=null;S.tl=S.cfg.tm;S.t0=Date.now()}
function start(cfg){cfg={...cfg};const p=pool(cfg),e=$('#err');
  if(!p.length){if(e)e.textContent='No hay preguntas con esos filtros. Ampliá la región, la dificultad o las categorías.';return}
  if(cfg.kind==='examen'&&!cfg.n)cfg.n=20;
  const k=cfg.kind==='repaso'&&cfg.ids?p.length:Math.min(cfg.n||50,p.length),qs=draw(p,k);
  S={cfg,p,qs,i:0,res:[],reviewTotal:cfg.kind==='repaso'?qs.length:0,reviewSolved:0};
  if(cfg.kind==='repaso')S.cfg.n=qs.length;
  reset();go('#/jugar')}
function next(){S.i++;if(S.i>=S.qs.length){if(S.cfg.n)return go('#/resultados');S.qs.push(...draw(S.p,Math.min(50,S.p.length)))}reset();render()}
function rec(q,ok,pick){const st=ST.q[q.id]||(ST.q[q.id]={ok:0,ko:0,p:0});ok?st.ok++:st.ko++;st.p=ok?0:1;
  ST.streak=ok?ST.streak+1:0;ST.best=Math.max(ST.best,ST.streak);
  if(!ok&&byIso[pick]&&!q.opts){const k=q.iso+'>'+pick;ST.conf[k]=(ST.conf[k]||0)+1}
  const result={q,ok,pick,ms:Date.now()-S.t0};
  if(S.cfg.kind==='repaso'){
    const i=S.res.findIndex(r=>r.q.id===q.id);
    if(i<0)S.res.push(result);else S.res[i]=result;
  }else S.res.push(result);
  save();return result}
function answer(v,d){const s=S,q=s.qs[s.i];if(s.fb)return;if(v!=null&&!d&&!String(v).trim())return;clearInterval(s.tm);
  let pick=null,ok=false;
  if(v!=null){if(q.isl){if(d){pick=v;ok=v===q.ans}else{ok=q.al.includes(norm(v));pick=ok?q.ans:'?'+v}}else if(q.opts){pick=v;ok=v===q.ans}else{const c=d?byIso[v]:find(v);pick=c?c.i:'?'+v;ok=!!c&&c.i===q.iso}}
  s.currentResult=rec(q,ok,pick);
  if(s.cfg.kind==='examen')return next();
  if(s.cfg.kind==='repaso'){
    if(ok)s.reviewSolved++;
    else s.qs.push(q);
  }
  s.fb=1;render()}
function tick(){const s=S;if(!s){go('#/');return}clearInterval(s.tm);if(!s.cfg.tm||s.fb||s.cfg.kind==='repaso')return;
  s.tm=setInterval(()=>{if(--s.tl<=0){clearInterval(s.tm);answer(null)}else{const e=$('#tm');if(e)e.textContent=s.tl+'s'}},1000)}
const end=()=>{if(S)clearInterval(S.tm);go(S&&S.res.length?'#/resultados':'#/')};
