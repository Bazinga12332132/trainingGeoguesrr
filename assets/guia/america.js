/* Guía por país — AMÉRICA. Formato: @iso y luego líneas "clave|texto".
   Claves: gen cond coche bol mat pos lin sen tel idi pai arq reg|Nombre|texto  q|categoría|dificultad|pista-pregunta
   Las pistas son resúmenes propios basados en guías de la comunidad (Plonkit, GeoTips, GeoHints). */
const GUIA_PARTS=[];
GUIA_PARTS.push(`
@ar
gen|Ruta recta, llanura enorme y cielo abierto en la Pampa; cordillera al oeste y estepa al sur. Español rioplatense y carteles con "Ruta Nacional" y escudo.
cond|Se conduce por la derecha.
mat|Desde 2016 las placas llevan banda azul superior (diseño Mercosur) con formato de 2 letras, 3 números y 2 letras. Las anteriores eran blancas con 3 letras y 3 números.
pos|Postes de hormigón redondos y, en algunas zonas, postes dobles uno junto al otro.
lin|Línea central amarilla (a menudo doble) y bordes blancos.
tel|Prefijo +54. Áreas útiles: 11 Buenos Aires, 351 Córdoba, 341 Rosario, 261 Mendoza, 223 Mar del Plata, 381 Tucumán, 387 Salta, 299 Neuquén.
idi|Español con voseo ("vos", "tenés"); es raro ver otro idioma en los carteles.
reg|Noroeste|Cerros de colores, quebradas rojizas, cardones gigantes, pueblos de adobe y altura andina (Salta, Jujuy).
reg|Noreste|Tierra colorada, selva y yerbatales en Misiones; esteros y palmares en Corrientes.
reg|Cuyo|Viñedos y álamos con la cordillera nevada de fondo; clima árido y regadío (Mendoza, San Juan).
reg|Pampa|Llanura perfecta, soja, silos, estancias con eucaliptos y molinos; horizonte plano sin una sola colina.
reg|Patagonia|Estepa seca y ventosa, alambrados interminables, ovejas, guanacos y la Ruta 40.
reg|Tierra del Fuego|Bosque austral, turberas, montañas con nieve y clima frío; es el extremo sur del país.

@bo
gen|Altiplano a más de 3.500 m con llamas, cielo muy azul y pueblos de ladrillo rojo sin revocar; también valles y llanos tropicales al este.
cond|Se conduce por la derecha.
tel|Prefijo +591. Áreas: 2 La Paz/Oruro/Potosí, 3 Santa Cruz, 4 Cochabamba/Sucre/Tarija.
idi|Español, con quechua y aymara en algunos carteles.
pai|Ladrillo visto en las casas, techos de calamina, cholitas con pollera y sombrero, salares y volcanes.
reg|Altiplano|Planicie fría y seca a gran altura, llamas, paja brava, volcanes y salares.
reg|Valles|Colinas templadas con cultivos y casas de ladrillo; clima más amable (Cochabamba, Sucre).
reg|Oriente|Llanura tropical con ganadería, soja y vegetación baja; calor húmedo (Santa Cruz, Beni).

@br
gen|País enorme. Portugués, placas con banda azul (Mercosur desde 2018), camiones y buses por todos lados y rutas con escudo "BR-###".
cond|Se conduce por la derecha.
mat|Las nuevas son blancas con banda azul arriba (y el nombre BRASIL); las antiguas eran grises con ciudad y estado escritos arriba.
pos|Postes de hormigón rectangulares con muchos agujeritos arriba y la parte baja como una escalera de tramos largos.
lin|Doble línea central amarilla, bordes blancos y muchos "tachões" (reflectores) en el asfalto.
sen|Las rutas federales usan un escudo con "BR" y el número. Señal de frenar: "PARE".
tel|Prefijo +55. DDD: 11 São Paulo, 21 Río de Janeiro, 61 Brasilia, 71 Salvador, 81 Recife, 85 Fortaleza, 92 Manaos, 41 Curitiba, 51 Porto Alegre.
idi|Portugués ("ç", "ã", "õ"): es la pista clave para separarlo de sus vecinos.
reg|Norte|Selva amazónica, ríos enormes, casas sobre pilotes y calor muy húmedo.
reg|Nordeste|Costa con cocoteros; en el interior, sertón seco con cactus y caatinga.
reg|Centro-Oeste|Llanura del cerrado, soja y ganado a perder de vista, tierra roja y árboles bajos y retorcidos.
reg|Sudeste|Colinas verdes con eucaliptos y cafetales, ciudades grandes y mucha industria (São Paulo, Minas, Río).
reg|Sur|Araucarias, praderas con gauchos, casas de colonos alemanes o italianos y clima más fresco.

@cl
gen|País larguísimo entre el Pacífico y los Andes: desierto al norte, valles y viñedos al centro, lluvia, volcanes y lagos al sur.
cond|Se conduce por la derecha.
pos|Hormigón cuadrado con hendiduras a ambos lados y agujeritos arriba, parecido al brasileño pero con menos travesaños.
sen|La ruta principal es la Ruta 5 (Panamericana). Carteles de "PARE" y "CEDA EL PASO".
tel|Prefijo +56. Áreas: 2 Santiago, 32 Valparaíso/Viña, 41 Concepción, 45 Temuco, 63 Valdivia, 65 Puerto Montt, 61 Punta Arenas, 55 Antofagasta.
idi|Español chileno ("po", "cachai").
reg|Norte|Desierto de Atacama: suelo árido sin plantas, minería, volcanes y cielo clarísimo.
reg|Centro|Viñedos, matorral seco, colinas doradas en verano y Santiago con la cordillera nevada detrás.
reg|Sur|Lluvia, bosques verdes, volcanes nevados, lagos y casas de madera con tejuelas (La Araucanía, Los Lagos).
reg|Patagonia|Carretera Austral, fiordos, glaciares y bosques húmedos; más al sur, estepa ventosa en Magallanes.

@co
gen|Andes verdes, pueblos de colores, muchísimas motos y rutas con curvas; placas amarillas en todos los autos.
cond|Se conduce por la derecha.
mat|Las placas particulares son amarillas con letras negras (3 letras y 3 números). Es un identificador muy fuerte en Sudamérica.
pos|Postes octogonales (en Latinoamérica solo los comparte con México, y rara vez Ecuador) y otros con franjas amarillas y negras.
lin|Línea central amarilla, bordes blancos.
tel|Prefijo +57. Áreas: 1 Bogotá, 2 Cali, 4 Medellín, 5 Costa Caribe, 7 Bucaramanga.
idi|Español; los carteles de "tiendas" y "tintos" son comunes.
reg|Andina|Montañas verdes, cafetales y pueblos de casas coloridas (Medellín, Eje Cafetero, Bogotá).
reg|Caribe|Calor, palmeras, ciudades con arquitectura colonial, tierras bajas y ganadería.
reg|Pacífico|Selva muy lluviosa y pocas carreteras.
reg|Llanos y Amazonía|Llanura enorme con ganadería, ríos anchos y poca gente; al sur, selva.

@ec
gen|Andes con volcanes, pueblos indígenas y calles con mucho tráfico en Quito/Guayaquil; billetes en dólares estadounidenses.
cond|Se conduce por la derecha.
pos|Poste "escalera" de hormigón con muchas hendiduras pequeñas; muy raro en el resto de Latinoamérica.
tel|Prefijo +593. Áreas: 2 Quito, 4 Guayaquil, 7 Cuenca.
idi|Español, con quichua en algunas zonas.

@py
gen|Cobertura nueva desde 2024. Llanura con tierra roja, ganadería y calles de ciudades pequeñas; español con guaraní.
cond|Se conduce por la derecha.
mat|Placas Mercosur (banda azul superior).
tel|Prefijo +595. Asunción: 21.
idi|Español y guaraní.

@pe
gen|Costa desértica, sierra andina con terrazas y selva al este. Mototaxis (triciclos) muy comunes.
cond|Se conduce por la derecha.
pos|Postes con tres brazos que sobresalen.
sen|Las rutas nacionales llevan prefijo "PE" (PE-1S, PE-3S, etc.).
tel|Prefijo +51. Lima: 1.
idi|Español, con quechua y aimara en el sur y la sierra.
reg|Costa|Desierto de arena junto al mar, casas sin terminar y ciudades como Lima, Trujillo o Arequipa en el sur.
reg|Sierra|Montañas altas, terrazas, ovejas y llamas, pueblos de adobe y paisajes andinos.
reg|Selva|Vegetación densa, calor húmedo y ríos anchos (Amazonía, ceja de selva).

@uy
gen|Colinas bajas y suaves con ganadería, eucaliptos y muchos mates; placas Mercosur.
cond|Se conduce por la derecha.
pos|Postes que parecen un tridente: tres lamparitas hacia arriba.
mat|Placas Mercosur (banda azul superior) desde 2015.
tel|Prefijo +598. Montevideo: 2.
idi|Español rioplatense.

@mx
gen|Tránsito rápido, "topes" (lomos de burro) en todas las rutas, OXXO y Pemex en todas partes y letreros pintados en las paredes.
cond|Se conduce por la derecha.
mat|El diseño de la placa cambia según el estado.
pos|Postes octogonales de hormigón; también algunos con forma de crucifijo.
sen|Rutas con escudos "MEX-15" y similares. Carteles de "TOPES" avisan los reductores.
tel|Prefijo +52. Áreas: 55 Ciudad de México, 81 Monterrey, 33 Guadalajara.
idi|Español; muchos carteles con "tacos", "abarrotes" y "refaccionaria".
reg|Norte|Desierto, nopales, ranchos y camiones por rutas largas y planas (Chihuahua, Sonora, Coahuila).
reg|Centro|Altiplano con volcanes, maíz y agave; ciudades coloniales con calles empedradas.
reg|Sur|Montañas verdes y mucha vegetación, pueblos indígenas y casas de colores (Oaxaca, Chiapas).
reg|Yucatán|Península plana, selva baja, casas blancas de piedra caliza y ruinas mayas.
reg|Baja California|Desierto con cardones gigantes junto al mar, rutas largas y solitarias.

@us
gen|Cobertura enorme y variada. Señales "US-xx" e "I-xx" en escudos, buzones al borde de la ruta, camionetas y casas de madera.
cond|Se conduce por la derecha.
mat|Cada estado tiene su propio diseño de placa.
lin|Doble línea central amarilla y bordes blancos.
tel|Prefijo +1 (compartido con Canadá y el Caribe). Áreas: 212/646 Nueva York, 310/323 Los Ángeles, 312 Chicago, 305 Miami, 206 Seattle.
reg|Nueva Inglaterra|Casas de madera blancas, iglesias con campanario, muros de piedra, bosques que se ponen rojos en otoño.
reg|Sur|Musgo español colgando de los robles, pinos, calor húmedo, iglesias bautistas y carteles de Waffle House.
reg|Medio Oeste|Planicie agrícola, maizales, silos, graneros rojos y caminos de grava en cuadrícula.
reg|Grandes Llanuras|Pastizales y trigo hasta el horizonte, casi sin árboles y con cielo enorme (Dakotas, Kansas, Nebraska).
reg|Suroeste|Desierto, mesas rojas, cactus saguaro en Arizona, casas de adobe y cielos despejados.
reg|Costa Oeste|California: palmeras al sur y secuoyas al norte; el Noroeste (Oregón, Washington) es lluvioso, con abetos y musgo.
reg|Rocosas|Picos altos, ranchos grandes en valles y pueblos pequeños de montaña (Montana, Colorado, Idaho).
reg|Alaska|Taiga, montañas nevadas, pocas rutas y casas dispersas.
reg|Hawái|Palmeras, volcanes oscuros, casas bajas y plantas tropicales.

@ca
gen|Rutas largas con bosques y lagos, señales con la hoja de arce, cartelería en inglés y, en Quebec, en francés.
cond|Se conduce por la derecha.
mat|Cada provincia tiene su placa propia.
lin|Líneas amarillas centrales y blancas laterales; velocidades en km/h.
sen|La Ruta Transcanadiense usa un escudo verde con la hoja de arce.
tel|Prefijo +1. Áreas: 416/647 Toronto, 514 Montreal, 604 Vancouver, 403 Calgary, 780 Edmonton, 613 Ottawa, 902 Provincias Marítimas.
idi|Inglés y francés; en Quebec "ARRÊT" reemplaza a "STOP".
reg|Provincias del Atlántico|Casas de colores, costa rocosa, bosques mixtos y pueblos pesqueros.
reg|Quebec|Carteles en francés, iglesias con campanarios plateados y casas con escaleras exteriores.
reg|Ontario|Granjas, lagos, bosques sobre roca y ciudades como Toronto y Ottawa.
reg|Praderas|Trigo, canola, elevadores de granos y cielo enorme (Alberta, Saskatchewan, Manitoba).
reg|Columbia Británica|Montañas costeras cubiertas de coníferas y valles con frutales (Okanagan).
reg|Norte|Taiga y tundra, muy pocos caminos y pueblos aislados (Yukón y Territorios del Noroeste).

@cr
gen|Selva y volcanes, rutas con curvas, "sodas" y la expresión "Pura Vida". Se usan colones.
cond|Se conduce por la derecha.
tel|Prefijo +506 (8 dígitos).
idi|Español.

@gt
gen|Volcanes, casas de colores, tuk-tuks y "camionetas" (buses escolares estadounidenses pintados de colores).
cond|Se conduce por la derecha.
mat|Las placas particulares empiezan con la letra P.
tel|Prefijo +502.
idi|Español, con lenguas mayas en algunos pueblos.

@pa
gen|Calor tropical, canal interoceánico, buses coloridos y calles con mucha publicidad; se usa el balboa y el dólar estadounidense.
cond|Se conduce por la derecha.
tel|Prefijo +507.
idi|Español.

@do
gen|Motoconchos (motos taxi), colmados (almacenes de barrio) y palmeras junto a rutas rápidas; domina el calor y los colores vivos.
cond|Se conduce por la derecha.
tel|Prefijos +1 con áreas 809, 829 y 849.
idi|Español.

@pr
gen|Parece Estados Unidos pero con carteles en español: las velocidades están en millas por hora y las distancias en kilómetros.
cond|Se conduce por la derecha.
tel|Prefijo +1 con áreas 787 y 939.
idi|Español, con inglés en algunos carteles.
q|sen|3|Cartel con velocidad en millas por hora y distancia en kilómetros, escrito en español y con tránsito por la derecha.

@vi
gen|Es un territorio de EE. UU. donde se conduce por la izquierda, aunque los autos tienen el volante a la izquierda. Incluye Saint Thomas, Saint John, Saint Croix y Water Island.
cond|Se conduce por la izquierda con autos estadounidenses (volante a la izquierda), una combinación muy rara.
tel|Prefijo +1 con área 340.
idi|Inglés.
q|cond|2|Territorio caribeño con autos de volante a la izquierda circulando por la izquierda y matrículas estadounidenses.

@gu
gen|Isla tropical con ambiente estadounidense: señales al estilo EE. UU., velocidades en mph y bases militares. Se habla inglés y chamorro.
cond|Se conduce por la derecha.
pos|Postes grandes de hormigón octogonales; en las vecinas Islas Marianas del Norte predominan los de madera.
tel|Prefijo +1 con área 671.
idi|Inglés y chamorro.

@mp
gen|Islas tropicales (Saipán, Tinián, Rota), carteles al estilo EE. UU., calor y vegetación densa; los postes suelen ser de madera.
cond|Se conduce por la derecha.
pos|Predominan los postes de madera, al contrario de Guam.
tel|Prefijo +1 con área 670.
idi|Inglés, chamorro y carolino.

@as
gen|Isla montañosa y verde (Tutuila) con ambiente estadounidense, palmeras, iglesias y casas abiertas tipo "fale".
cond|Se conduce por la derecha.
tel|Prefijo +1 con área 684.
idi|Inglés y samoano.

@um
gen|Midway es un atolón diminuto, con edificios militares y miles de albatros. Casi no hay gente.
q|pai|3|Atolón plano con pista de aterrizaje, edificios militares viejos y miles de albatros sobre la arena.

@bm
gen|Casas de colores pastel con techos escalonados blancos, calles angostas y velocidad máxima de 35 km/h.
cond|Se conduce por la izquierda.
tel|Prefijo +1 con área 441.
idi|Inglés.
q|pai|2|Casas de color pastel con techos escalonados blancos, calles angostas y conducción por la izquierda en una isla del Atlántico Norte.

@cw
gen|Casas coloniales holandesas de colores en Willemstad, tierra seca con cactus y papiamento en los carteles.
cond|Se conduce por la derecha.
tel|Prefijo +599 (9 para Curazao).
idi|Papiamento, neerlandés e inglés.

@gl
gen|Pueblos de casas de madera pintadas de colores, icebergs, sin rutas entre ciudades y paisaje de tundra.
cond|Se conduce por la derecha.
tel|Prefijo +299.
idi|Groenlandés y danés.
q|pai|3|Casas de madera de colores sobre rocas, hielo en el mar y ningún camino que una los pueblos.

@fk
gen|Casas con techos de colores, turba, viento y ovejas en Puerto Argentino/Stanley. Se conduce por la izquierda.
cond|Se conduce por la izquierda.
tel|Prefijo +500.
idi|Inglés.

@gs
gen|Antigua estación ballenera oxidada en Grytviken, focas elefantes, pingüinos y montañas heladas. No hay población permanente.
q|pai|3|Estación ballenera oxidada junto a la costa, focas elefante y montañas con nieve en una isla subantártica.

@mq
gen|Isla caribeña francesa: bananeras, caña de azúcar, el volcán Mont Pelée y rutas nacionales "N1, N2...".
cond|Se conduce por la derecha.
tel|Prefijo +596.
idi|Francés, con criollo en algunos carteles.

@pm
gen|Archipiélago francés frente a Terranova: casas de colores, mar frío, niebla y vegetación baja.
cond|Se conduce por la derecha.
tel|Prefijo +508.
idi|Francés.
`);
