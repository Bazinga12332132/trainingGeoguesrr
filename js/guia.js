/* ============ GUÍA POR PAÍS: parser y utilidades ============
   Lee los bloques de assets/guia/*.js (GUIA_PARTS) y arma GUIA[iso]:
   { gen:[...], cond:[...], mat:[...], ..., reg:[[nombre,pista],...], q:[{c,d,t}] }
   Para sumar un país: agregá un bloque "@iso" con líneas "clave|texto" en cualquiera de los archivos. */
const GUIA = {};
(function parseGuia() {
  let cur = null;
  for (const raw of GUIA_PARTS.join('\n').split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    if (l[0] === '@') { cur = l.slice(1); GUIA[cur] = { reg: [], q: [] }; continue; }
    if (!cur) continue;
    const p = l.split('|'), k = p[0];
    if (k === 'reg') GUIA[cur].reg.push([p[1], p.slice(2).join('|')]);
    else if (k === 'q') GUIA[cur].q.push({ c: p[1], d: +p[2], t: p.slice(3).join('|') });
    else (GUIA[cur][k] = GUIA[cur][k] || []).push(p.slice(1).join('|'));
  }
})();

/* Secciones que se muestran en la ficha de cada país, en este orden. */
const GUIA_SECCIONES = [
  ['gen', 'Lo primero que hay que mirar'], ['cond', 'Conducción'], ['coche', 'Coche y cámara de Google'],
  ['bol', 'Bolardos'], ['mat', 'Matrículas'], ['pos', 'Postes eléctricos'], ['lin', 'Líneas viales'],
  ['sen', 'Señales y rutas'], ['tel', 'Teléfonos'], ['idi', 'Idioma y escritura'],
  ['pai', 'Paisaje y vegetación'], ['arq', 'Arquitectura']
];

/* Qué secciones de la guía se muestran como "tips" al terminar cada categoría de pregunta. */
const FB_SECS = {
  banderas: ['gen', 'cond'], conduccion: ['cond', 'gen'], dominios: ['tel', 'gen'], bolardos: ['bol', 'gen'],
  matriculas: ['mat', 'gen'], postes: ['pos', 'gen'], coche: ['coche', 'gen'], pistas: ['gen', 'lin', 'sen', 'tel'],
  escenas: ['gen', 'pai', 'coche', 'lin'], regiones: ['gen'], idiomas: []
};
const feedbackTips = (q, max = 3) => {
  const g = GUIA[q.iso];
  if (!g) return [];
  const out = [];
  for (const k of FB_SECS[q.cat] || ['gen']) for (const t of g[k] || []) if (!out.includes(t)) out.push(t);
  return out.slice(0, max);
};
/* Textos genéricos de explicación (de versiones anteriores) que no enseñan nada: no se muestran. */
const GENERIC_EX = /(Ilustración generada|Ejemplo visual generado|La panorámica de Street View|Un ejemplo de bolardo fotografiado|ejemplo de matrícula|fotografiada corresponde|conviene combinarlo|combiná la (imagen|pista)|buscá (también|otras)|usá también|es otra pista|puede ayudar a confirmar|ayudan a confirmar|pueden ayudar)/i;
const specificNote = q => (['bolardos', 'matriculas', 'postes', 'escenas'].includes(q.cat) && q.ex && !GENERIC_EX.test(q.ex)) ? q.ex : '';

/* Consejos generales (página Guía). Revisados: se dejaron afuera las pistas que no se pudieron verificar. */
const GENERAL_TIPS = [
  ['El sol y la brújula', 'Mirá dónde está el sol con la brújula del juego. Si el sol está hacia el norte, estás en el hemisferio sur; si está hacia el sur, estás en el hemisferio norte. No es confiable cerca del ecuador ni cuando el sol está muy alto.'],
  ['Cómo moverte', 'Si el juego te deja moverte, andá en sentido contrario al que iba el coche de Google (se ve por la antena, el auto trasero o el lado de la ruta) y cuesta abajo: los pueblos suelen estar en los valles. Buscá tres datos: el país o región, el número de ruta y el nombre de un pueblo.'],
  ['Lado de conducción', '@LADO@'],
  ['Matrículas', 'Banda azul a la izquierda: casi siempre Europa (o Turquía). Banda azul arriba (diseño Mercosur): Argentina, Brasil, Uruguay y Paraguay. Placa amarilla en vehículos particulares: Países Bajos (con banda azul), Israel (solo números) y Colombia. Delantera blanca y trasera amarilla: Reino Unido, Chipre, Hong Kong, Kenia, Uganda, Ruanda y Ghana. Granate: Catar. Azul con letras blancas: Senegal.'],
  ['Alfabetos y escrituras', 'Cirílico: Rusia, Ucrania, Bielorrusia, Bulgaria, Macedonia del Norte, Serbia (también latino), Mongolia, Kazajistán y Kirguistán. Griego: Grecia y Chipre. Árabe: Medio Oriente y norte de África (Túnez y Egipto también usan francés o inglés). Hebreo: Israel. Devanagari: India y Nepal. Bengalí: Bangladés y este de India. Cingalés y tamil: Sri Lanka. Tailandés, lao y jemer: Tailandia, Laos y Camboya. Hangul: Corea del Sur. Kanji y kana: Japón. Caracteres simplificados: China; tradicionales: Taiwán, Hong Kong y Macao. Dzongkha: Bután.'],
  ['Generaciones de cámara', 'Gen 2 se ve más borrosa y con un halo; Gen 3 es la estándar; Gen 4 es la más nítida y moderna. Alemania, Mónaco y San Marino tienen cobertura Gen 2; Sudáfrica tiene Gen 2, 3 y 4; Kenia y Senegal tienen Gen 3 y 4; Ruanda tiene Gen 4. Es una pista de apoyo, no una prueba definitiva.'],
  ['Metas del coche de Google', 'Ghana: cinta negra en la barra delantera derecha del portaequipaje. Reunión: cinta en una barra trasera del lado del pasajero. Kenia: snorkel negro sobre el capó. Nigeria: casi siempre lo sigue un Toyota o un coche de policía. Uganda: se ve el frente del coche con una defensa negra. Ruanda: cámara muy baja en una camioneta negra. Túnez: auto de seguimiento y antena corta y robusta.'],
  ['Postes y bolardos', 'México y Colombia: postes octogonales. Taiwán: franjas negras y amarillas que bajan hasta el suelo; Corea del Sur: franjas parecidas que no llegan al suelo. Hungría y Rumania: hormigón con agujeros hasta el suelo; Polonia: agujeros que se detienen más arriba. Francia: hormigón con hendiduras y sin agujeros. Bolardos blancos con reflector rojo: Francia; con banda negra y dos reflectores: Alemania.'],
  ['Números de teléfono y dominios', 'El prefijo internacional y el dominio (.jp, .br) aparecen en carteles y comercios. Los prefijos de área (por ejemplo 11 en Buenos Aires o 3 en Tokio) ayudan a ubicar la ciudad.'],
  ['Cómo usar esta guía', 'Buscá un país por nombre o una pista (por ejemplo "amarilla", "bolardo" o "escalera"). Cada ficha reúne conducción, coche, bolardos, matrículas, postes, líneas, señales, teléfonos, idioma y paisaje, además de las zonas internas (norte/sur, regiones).']
];
const GUIA_FUENTES = [
  ['Plonk It', 'https://www.plonkit.net/guide'], ['GeoTips', 'https://geotips.net/'],
  ['GeoHints', 'https://geohints.com/'], ['Consejos en Medium', 'https://medium.com/@jarrodhill257/geoguessr-tips-d0d7f193b763']
];
