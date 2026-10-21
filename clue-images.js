const svgData=svg=>`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const BOLLARD_STYLES={
  fr:{shape:'slim',cap:'black',reflector:'red-rect'},
  de:{shape:'slim',cap:'black-band',reflector:'two-round'},
  nl:{shape:'short',cap:'green',reflector:'green-white'},
  be:{shape:'slim',cap:'white',reflector:'one-rect'},
  cz:{shape:'round',cap:'rounded-black',reflector:'one-white'},
  sk:{shape:'slim',cap:'sloped-black',reflector:'one-white'},
  pl:{shape:'slim',cap:'white',reflector:'two-vertical'},
  hu:{shape:'flared',cap:'flared-black',reflector:'one-white'},
  it:{shape:'square',cap:'white',reflector:'diagonal-red'},
  gb:{shape:'short',cap:'white',reflector:'one-red'},
  es:{shape:'slim',cap:'white',reflector:'two-horizontal'},
  pt:{shape:'tapered',cap:'white',reflector:'one-red'},
  gr:{shape:'short',cap:'white',reflector:'one-red'},
  se:{shape:'oval',cap:'black-band',reflector:'wide-white'},
  no:{shape:'slim',cap:'white',reflector:'one-white'},
  fi:{shape:'slim',cap:'black',reflector:'one-white'},
  ru:{shape:'square',cap:'striped',reflector:'stripes'},
  ua:{shape:'short',cap:'striped',reflector:'stripes'},
  ro:{shape:'round',cap:'sloped-black',reflector:'one-white'}
};

const PLATE_STYLES={
  it:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc','#2876bc'],bandCode:'I',format:'AB 123 CD'},
  fr:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc','#2876bc'],bandCode:'F',format:'AA-123-AA'},
  de:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc'],bandCode:'D',format:'B AB 1234',seal:true},
  gb:{bg:'#f8f8f5',rear:'#f5d431',fg:'#181818',format:'AB12 CDE',dual:true},
  nl:{bg:'#f2d441',fg:'#171717',format:'12-AB-34'},
  be:{bg:'#f8f8f5',fg:'#b52c31',bands:['#2876bc'],bandCode:'B',format:'1-ABC-123'},
  pl:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc'],bandCode:'PL',format:'KR 12345'},
  es:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc'],bandCode:'E',format:'1234 BCD'},
  pt:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc'],bandCode:'P',format:'AA 12 AA'},
  jp:{bg:'#f5f3e7',fg:'#1a2820',format:'品川 500 ね 12-34',compact:true},
  ch:{bg:'#f8f8f5',fg:'#202321',format:'123456',mark:'ZH',shield:true},
  at:{bg:'#f8f8f5',fg:'#202321',bands:['#2876bc'],bandCode:'A',format:'W 12345 A',seal:true}
};

function bollardSvg(iso){
  const s=BOLLARD_STYLES[iso]||BOLLARD_STYLES.fr;
  const x=s.shape==='slim'?159:s.shape==='short'?165:s.shape==='oval'?150:155;
  const w=s.shape==='slim'?42:s.shape==='short'?32:s.shape==='oval'?60:50;
  let y=80,h=s.shape==='short'?182:228;
  let body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${s.shape==='round'||s.shape==='oval'?Math.round(w/2):4}" fill="#f4f4ee" stroke="#89938c" stroke-width="4"/>`;
  if(s.shape==='tapered')body=`<path d="M${x+12} ${y}h${w-24}l12 ${h}h-${w}z" fill="#f4f4ee" stroke="#89938c" stroke-width="4"/>`;
  if(s.shape==='flared')body=`<path d="M${x+11} ${y}h${w-22}l5 25h14v${h-25}h-48V${y+25}h14z" fill="#f4f4ee" stroke="#89938c" stroke-width="4"/>`;
  if(s.cap==='black')body+=`<rect x="${x+2}" y="${y+4}" width="${w-4}" height="23" rx="4" fill="#242a28"/>`;
  if(s.cap==='rounded-black')body+=`<path d="M${x+2} ${y+19}q0-18 19-18t19 18" fill="#242a28"/>`;
  if(s.cap==='sloped-black')body+=`<path d="M${x+2} ${y+27}V${y+4}h${w-4}z" fill="#242a28"/>`;
  if(s.cap==='black-band')body+=`<rect x="${x+2}" y="${y+27}" width="${w-4}" height="18" fill="#242a28"/>`;
  if(s.cap==='flared-black')body+=`<path d="M${x-3} ${y+27}h${w+6}l-8-24h-34z" fill="#242a28"/>`;
  if(s.cap==='green')body+=`<rect x="${x+2}" y="${y+22}" width="${w-4}" height="16" fill="#308856"/>`;
  if(s.cap==='striped')body+=`<path d="M${x+3} ${y+4}l${w-6} 24m-24 15l${w-6} 24m-24 15l${w-6} 24m-24 15l${w-6} 24m-24 15l${w-6} 24" stroke="#202522" stroke-width="14"/>`;
  const reflector=(cx,cy,color='#d84b42',rw=18,rh=27)=>`<rect x="${cx-rw/2}" y="${cy-rh/2}" width="${rw}" height="${rh}" rx="4" fill="${color}" stroke="#c3c6c0" stroke-width="3"/>`;
  let reflectors='';
  if(s.reflector==='one-rect')reflectors=reflector(x+w/2,y+90,'#e6e4d4',17,31);
  if(s.reflector==='one-white')reflectors=reflector(x+w/2,y+91,'#fdfdf7',17,31);
  if(s.reflector==='one-red')reflectors=reflector(x+w/2,y+88,'#d8423b',18,28);
  if(s.reflector==='wide-white')reflectors=reflector(x+w/2,y+103,'#fafaf2',27,34);
  if(s.reflector==='two-round')reflectors=`<circle cx="${x+w/2}" cy="${y+74}" r="8" fill="#eee9d8"/><circle cx="${x+w/2}" cy="${y+98}" r="8" fill="#eee9d8"/>`;
  if(s.reflector==='two-vertical')reflectors=`<circle cx="${x+w/2}" cy="${y+76}" r="7" fill="#e7e3d4"/><circle cx="${x+w/2}" cy="${y+101}" r="7" fill="#e7e3d4"/>`;
  if(s.reflector==='two-horizontal')reflectors=`<circle cx="${x+w/2-9}" cy="${y+84}" r="7" fill="#e7e3d4"/><circle cx="${x+w/2+9}" cy="${y+84}" r="7" fill="#e7e3d4"/>`;
  if(s.reflector==='diagonal-red')reflectors=`<path d="M${x+8} ${y+71}l${w-16} 23" stroke="#d8423b" stroke-width="12"/>`;
  if(s.reflector==='green-white')reflectors=`<path d="M${x+6} ${y+68}h${w-12}m0 19h-${w-12}m0 19h${w-12}" stroke="#308856" stroke-width="12"/>`;
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360"><defs><linearGradient id="sky" y2="1"><stop stop-color="#e8f1ed"/><stop offset="1" stop-color="#f8f6ed"/></linearGradient></defs><rect width="360" height="360" rx="24" fill="url(#sky)"/><circle cx="288" cy="70" r="27" fill="#f0cf73" opacity=".7"/><path d="M0 242Q86 216 171 240t189-3v123H0z" fill="#cbdac7"/><path d="M0 281h360v79H0z" fill="#656e68"/><path d="M0 286h360" stroke="#f5f1df" stroke-width="5" stroke-dasharray="24 20" opacity=".9"/><ellipse cx="180" cy="313" rx="50" ry="13" fill="#26352e" opacity=".2"/><path d="M177 305l-13-3 2-7 13 3z" fill="#5e665e"/><path d="M183 305l13-3-2-7-13 3z" fill="#5e665e"/>${body}${reflectors}<path d="M${x+4} ${y+h-10}h${w-8}" stroke="#fff" stroke-opacity=".45" stroke-width="4"/></svg>`);
}

function plateSvg(iso){
  const s=PLATE_STYLES[iso]||PLATE_STYLES.it;
  const plate=(bg,format,offset=0)=>{
    const left=s.bands?`<rect x="18" y="18" width="48" height="104" rx="5" fill="${s.bands[0]}"/><text x="42" y="83" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="white">${s.bandCode}</text>`:'';
    const right=s.bands&&s.bands[1]?`<rect x="654" y="18" width="48" height="104" rx="5" fill="${s.bands[1]}"/>`:'';
    const seal=s.seal?`<circle cx="93" cy="70" r="11" fill="#d94f48" stroke="#d8c05d" stroke-width="4"/>`:'';
    const mark=s.mark?`<text x="78" y="58" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="#202321">${s.mark}</text><path d="M65 70h26v27l-13 9-13-9z" fill="#bd3038" stroke="#202321" stroke-width="2"/><path d="M77 76v16m-6-8h12" stroke="white" stroke-width="4"/>`:'';
    const label=format.replace('\n',' ');
    const fs=label.length>10?36:46;
    return `<g transform="translate(0 ${offset})"><rect x="8" y="8" width="704" height="124" rx="15" fill="#343936" opacity=".18"/><rect x="12" y="10" width="696" height="116" rx="13" fill="${bg}" stroke="#b7bdb7" stroke-width="3"/>${left}${right}${seal}${mark}<text x="360" y="83" text-anchor="middle" font-family="Arial,sans-serif" font-size="${fs}" font-weight="700" letter-spacing="3" fill="${s.fg}">${label}</text></g>`;
  };
  const content=s.dual?`${plate(s.bg,s.format,42)}${plate(s.rear,s.format,200)}<text x="360" y="29" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" letter-spacing="4" fill="#52625a">DELANTERA / TRASERA</text>`:`${plate(s.bg,s.format,112)}`;
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360"><rect width="720" height="360" rx="24" fill="#eaf0eb"/><path d="M0 278Q180 222 360 270t360-1v91H0z" fill="#d5e0d8"/><text x="360" y="46" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" letter-spacing="4" fill="#52625a">MATRÍCULA DE EJEMPLO</text>${content}<text x="360" y="333" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" letter-spacing="2" fill="#6b7971">ILUSTRACIÓN · FORMATO DE REFERENCIA</text></svg>`);
}

function clueImage(question){
  return question.art==='plate'?plateSvg(question.iso):bollardSvg(question.iso);
}
