/* ============ ESTADO Y ESTADÍSTICAS (localStorage) ============ */
let ST;try{ST=JSON.parse(localStorage.getItem('ggt1'))}catch{}
ST=ST||{q:{},conf:{},streak:0,best:0};
const save=()=>{try{localStorage.setItem('ggt1',JSON.stringify(ST))}catch{}};
let S=null,CFG={cats:['banderas'],reg:'*',diff:1,mode:'auto',n:10,tm:0,kind:'practica'};
const $=s=>document.querySelector(s),app=$('#app');
const go=h=>location.hash===h?render():(location.hash=h);
const pend=()=>Q.filter(q=>ST.q[q.id]?.p);
const agg=()=>{const cat={},tot=[0,0];for(const q of Q){const s=ST.q[q.id];if(!s)continue;const a=cat[CATS[q.cat]]||(cat[CATS[q.cat]]=[0,0]);a[0]+=s.ok;a[1]+=s.ok+s.ko;tot[0]+=s.ok;tot[1]+=s.ok+s.ko}return{cat,tot}};
const pct=(o,t)=>t?Math.round(o/t*100):0;
const rows=m=>Object.entries(m).map(([k,[o,t]])=>`<div class="row"><span>${esc(k)}</span><div class="bar"><i style="width:${pct(o,t)}%"></i></div><b>${pct(o,t)}% (${o}/${t})</b></div>`).join('')||'<p class="mut">Todavía no hay datos.</p>';
