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
