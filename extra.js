const BOLLARD_GUIDE='https://geoghost.gg/blog/geoguessr-bollard-and-road-line-guide/';
const PLATE_GUIDE='https://geomastr.com/license-plates/';

const PHOTO_CLUES={
  'bolardos:11:pt':{
    img:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Photomontage_of_traffic_bollards%2C_Avenida_de_Roma%2C_Lisbon%2C_Portugal_julesvernex2.jpg/960px-Photomontage_of_traffic_bollards%2C_Avenida_de_Roma%2C_Lisbon%2C_Portugal_julesvernex2.jpg',
    src:'https://commons.wikimedia.org/wiki/File:Photomontage_of_traffic_bollards,_Avenida_de_Roma,_Lisbon,_Portugal_julesvernex2.jpg',
    author:'Jules Verne Times Two',
    lic:'CC BY-SA 4.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    alt:'Serie de bolardos oscuros alineados junto a una vereda'
  },
  'bolardos:13:se':{
    img:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Black_traffic_bollard_in_Tuntorp.jpg/960px-Black_traffic_bollard_in_Tuntorp.jpg',
    src:'https://commons.wikimedia.org/wiki/File:Black_traffic_bollard_in_Tuntorp.jpg',
    author:'W.carter',
    lic:'CC BY-SA 4.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    alt:'Bolardo negro de goma junto a la calzada y una rejilla'
  },
  'matriculas:20:it':{
    img:'https://upload.wikimedia.org/wikipedia/commons/f/f0/Italian_license_plate_current_series.jpg',
    src:'https://commons.wikimedia.org/w/index.php?curid=116995803',
    author:'Walser.FL',
    lic:'CC BY-SA 4.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    alt:'Matrícula blanca con banda europea azul y caracteres negros'
  },
  'matriculas:21:fr':{
    img:'https://upload.wikimedia.org/wikipedia/commons/8/8e/FRANCE_EEC_STYLE_passenger_pair_with_advertising_-_Flickr_-_woody1778a.jpg',
    src:'https://commons.wikimedia.org/w/index.php?curid=17635009',
    author:"Jerry 'Woody' from Edmonton, Canada",
    lic:'CC BY-SA 2.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/2.0/',
    alt:'Dos matrículas europeas, una blanca y otra amarilla, con banda azul'
  },
  'matriculas:23:nl':{
    img:'https://upload.wikimedia.org/wikipedia/commons/5/5c/Current_series_dutch_license_plate.jpg',
    src:'https://commons.wikimedia.org/w/index.php?curid=92327544',
    author:'Walser.FL',
    lic:'CC BY-SA 4.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    alt:'Matrícula amarilla con caracteres negros y banda azul europea'
  },
  'matriculas:24:jp':{
    img:'https://live.staticflickr.com/1212/1248404292_b791db9cbb_b.jpg',
    src:'https://www.flickr.com/photos/9816248@N03/1248404292',
    author:'woody1778a',
    lic:'CC BY-SA 2.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/2.0/',
    alt:'Matrícula con caracteres locales y varios dígitos'
  },
  'matriculas:25:de':{
    img:'https://upload.wikimedia.org/wikipedia/commons/0/0f/German_license_plate_0-180-6.jpg',
    src:'https://commons.wikimedia.org/w/index.php?curid=151796000',
    author:'Jetam2',
    lic:'CC BY-SA 4.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    alt:'Matrícula blanca con banda azul y distintivo de país'
  },
  'matriculas:30:ch':{
    img:'https://upload.wikimedia.org/wikipedia/commons/5/55/Switzerland_Z%C3%BCrich_registration_plate_new.jpg',
    src:'https://commons.wikimedia.org/w/index.php?curid=71868895',
    author:'Dickelbers y Dmartn969',
    lic:'CC BY-SA 3.0',
    licUrl:'https://creativecommons.org/licenses/by-sa/3.0/',
    alt:'Matrícula blanca con un escudo y código regional'
  }
};

const EXTRA=[
  {cat:'bolardos',iso:'fr',key:0,d:1,guide:BOLLARD_GUIDE,expl:'El poste fino con tapa negra y reflector rojo es un patrón frecuente en Francia. El reflector puede verse blanco desde atrás.'},
  {cat:'bolardos',iso:'de',key:1,d:2,guide:BOLLARD_GUIDE,expl:'La banda negra y los dos reflectores pequeños son un patrón común en Alemania; el color del reflector depende del lado.'},
  {cat:'bolardos',iso:'nl',key:2,d:3,guide:BOLLARD_GUIDE,expl:'En Países Bajos los bolardos clásicos son menos comunes; los postes verdes y blancos pueden aparecer en cruces.'},
  {cat:'bolardos',iso:'be',key:3,d:3,guide:BOLLARD_GUIDE,expl:'Bélgica presenta variantes regionales: en Flandes se describen postes altos, mientras que en Valonia aparecen modelos más bajos.'},
  {cat:'bolardos',iso:'cz',key:4,d:2,guide:BOLLARD_GUIDE,expl:'La tapa redondeada ayuda a distinguir este patrón checo del poste alemán de banda negra.'},
  {cat:'bolardos',iso:'sk',key:5,d:2,guide:BOLLARD_GUIDE,expl:'La parte superior inclinada es un rasgo distintivo descrito para Eslovaquia.'},
  {cat:'bolardos',iso:'pl',key:6,d:2,guide:BOLLARD_GUIDE,expl:'Los reflectores apilados verticalmente son una pista asociada con Polonia.'},
  {cat:'bolardos',iso:'hu',key:7,d:3,guide:BOLLARD_GUIDE,expl:'La tapa ensanchada, similar a un hongo, es el rasgo destacado para Hungría.'},
  {cat:'bolardos',iso:'it',key:8,d:1,guide:BOLLARD_GUIDE,expl:'En Italia pueden encontrarse bolardos de hormigón pintado, a diferencia de muchos modelos plásticos europeos.'},
  {cat:'bolardos',iso:'gb',key:9,d:3,guide:BOLLARD_GUIDE,expl:'En el Reino Unido los bolardos son menos comunes fuera de autopistas; conviene confirmar con las líneas y señales.'},
  {cat:'bolardos',iso:'es',key:10,d:2,guide:BOLLARD_GUIDE,expl:'La disposición horizontal de los reflectores contrasta con el patrón vertical descrito para Polonia.'},
  {cat:'bolardos',iso:'pt',key:11,d:2,guide:BOLLARD_GUIDE,expl:'La silueta estrecha en la parte superior, similar a un pequeño obelisco, es una pista portuguesa.'},
  {cat:'bolardos',iso:'gr',key:12,d:3,guide:BOLLARD_GUIDE,expl:'En Grecia muchas rutas no tienen bolardos; usá este patrón junto con otras pistas, como el alfabeto griego.'},
  {cat:'bolardos',iso:'se',key:13,d:2,guide:BOLLARD_GUIDE,expl:'El poste escandinavo bajo y ancho destaca frente a los modelos más finos de la región.'},
  {cat:'bolardos',iso:'no',key:14,d:3,guide:BOLLARD_GUIDE,expl:'Puede parecerse al de Finlandia; el paisaje rocoso y los túneles ayudan a confirmar Noruega.'},
  {cat:'bolardos',iso:'fi',key:15,d:2,guide:BOLLARD_GUIDE,expl:'Es similar al noruego; las líneas amarillas centrales pueden ayudar a distinguir Finlandia.'},
  {cat:'bolardos',iso:'ru',key:17,d:3,guide:BOLLARD_GUIDE,expl:'Los modelos robustos con franjas alternadas pueden verse en Rusia, aunque no son comunes y no son una regla universal.'},
  {cat:'bolardos',iso:'ua',key:18,d:3,guide:BOLLARD_GUIDE,expl:'Los bolardos robustos pueden recordar a los rusos; el cirílico y el entorno aportan pistas adicionales para Ucrania.'},
  {cat:'bolardos',iso:'ro',key:19,d:3,guide:BOLLARD_GUIDE,expl:'El extremo negro inclinado puede parecerse al eslovaco, pero su perfil suele ser más redondeado en Rumania.'},
  {cat:'matriculas',iso:'it',key:20,d:1,guide:'https://geomastr.com/country/italy/',expl:'El formato italiano habitual combina dos letras, tres números y dos letras, con bandas azules a los lados.'},
  {cat:'matriculas',iso:'fr',key:21,d:1,guide:'https://geomastr.com/country/france/',expl:'Las placas francesas tienen bandas azules laterales; el identificador departamental aparece a la derecha.'},
  {cat:'matriculas',iso:'gb',key:22,d:1,guide:PLATE_GUIDE,expl:'En el Reino Unido la placa delantera suele ser blanca y la trasera amarilla.'},
  {cat:'matriculas',iso:'nl',key:23,d:1,guide:PLATE_GUIDE,expl:'Las matrículas habituales de Países Bajos tienen fondo amarillo y caracteres negros.'},
  {cat:'matriculas',iso:'jp',key:24,d:2,guide:PLATE_GUIDE,expl:'Las placas japonesas muestran caracteres locales y una línea superior con información de registro.'},
  {cat:'matriculas',iso:'de',key:25,d:2,guide:'https://geomastr.com/country/germany/',expl:'Las matrículas alemanas incluyen un código regional al inicio y el distintivo azul europeo.'},
  {cat:'matriculas',iso:'be',key:26,d:2,guide:'https://geomastr.com/country/belgium/',expl:'Bélgica usa caracteres rojos sobre fondo blanco, un contraste inusual en matrículas europeas.'},
  {cat:'matriculas',iso:'es',key:27,d:2,guide:'https://geomastr.com/country/spain/',expl:'El formato español moderno muestra cuatro números y tres letras, con banda azul europea.'},
  {cat:'matriculas',iso:'pl',key:28,d:2,guide:'https://geomastr.com/country/poland/',expl:'Las matrículas polacas usan caracteres negros sobre fondo blanco y la banda azul europea.'},
  {cat:'matriculas',iso:'pt',key:29,d:2,guide:'https://geomastr.com/country/portugal/',expl:'Las placas portuguesas actuales usan fondo blanco y caracteres negros, con banda azul europea.'},
  {cat:'matriculas',iso:'ch',key:30,d:2,guide:'https://geomastr.com/country/switzerland/',expl:'Suiza no pertenece a la UE: sus placas blancas llevan el identificador CH y un escudo cantonal.'},
  {cat:'matriculas',iso:'at',key:31,d:2,guide:'https://geomastr.com/country/austria/',expl:'Las placas austriacas muestran un escudo regional entre el código local y la combinación alfanumérica.'}
].map(item=>{
  const art=item.cat==='matriculas'?'plate':'bollard';
  const photo=PHOTO_CLUES[`${item.cat}:${item.key}:${item.iso}`];
  return {...item,...photo,art,img:photo?.img||clueImage({...item,art}),alt:photo?.alt|| (item.cat==='matriculas'?'Ilustración original de una matrícula de ejemplo':'Ilustración original de un bolardo característico')};
});
