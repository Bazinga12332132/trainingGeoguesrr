# Fotos

Las fotos están separadas por tema: `bolardos.js` guarda las imágenes de
bolardos, `matriculas.js` las de matrículas y `photos.js` las escenas de No
Move. `index.html` carga estos catálogos antes de `js/extra.js`, que los asocia
con sus preguntas y países.

Las imágenes se sirven desde sus fuentes originales para evitar duplicarlas en
el repositorio. Cada catálogo conserva autor, fuente y licencia cuando están
disponibles; no eliminar esas atribuciones al editar una entrada. Las entradas
de Geomastr enlazan su página de referencia como fuente.

Los catálogos incluyen imágenes de países y regiones de varios continentes.
Para agregar una imagen, usá una clave única `categoría:número:código ISO`,
incluí texto alternativo y fuente, y conservá autor y licencia cuando la
fuente los publique. Las escenas de No Move deben enlazar la página de
referencia de la imagen para que se puedan comprobar el lugar y la atribución.

## Guía por país
`assets/guia/*.js` contiene la guía (formato `@iso` + líneas `clave|texto`). De ahí salen las fichas, los tips al responder, las preguntas de Regiones y las pistas de texto. `assets/postes.js` aporta la categoría Postes.

Se eliminaron las 30 ilustraciones generadas con IA: no eran fotos reales de un país, así que su respuesta no se podía verificar.

## Mapa por zonas
27 países tienen, en su ficha de la guía, un mapa con zonas, los metas del coche de Google, un apartado "No te confundas con…" y un modo de práctica ("¿En qué zona estoy?"). `js/zonas.js` lo dibuja y carga los datos recién al abrir el país:

- `data/zonas/<iso>.json`: resumen, `coche` (metas del coche/cámara), `zonas` (nombre, lat, lng, radio en km, pistas y un punto de Street View), `confusiones` (país con el que se confunde y las diferencias), `fuera` (zonas que no entran en el mapa) y `fuentes`.
- `data/mapas/<iso>.json`: contorno del país en SVG. Lo genera `scripts/generar-mapas.mjs` a partir de Natural Earth (dominio público); ver el comentario del script para correrlo.

Para sumar un país: agregarlo en `PAISES` del script, regenerar los mapas, escribir `data/zonas/<iso>.json` y sumar el código a `ZONAS_ISO` en `js/zonas.js`.

### Street View
Cada zona tiene un botón que muestra la panorámica real **dentro de la app**, con el embed oficial de Google Maps (Google permite embeber Street View; no permite usar capturas de pantalla, por eso no hay capturas guardadas en el repo). Sin configuración usa el embed público. Para usar la API oficial, cargar una API key con la "Maps Embed API" habilitada en `js/config.js` (`GMAPS_KEY`) y restringirla al dominio de Vercel.
