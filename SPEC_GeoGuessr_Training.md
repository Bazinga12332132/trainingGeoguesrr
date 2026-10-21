# GeoGuessr Training --- Especificación funcional y técnica

## 1. Objetivo

Construir una web personal de entrenamiento para mejorar la
identificación de países en GeoGuessr mediante pistas visuales. El
usuario elige una categoría, una dificultad y una modalidad de
respuesta. La web muestra una imagen o pista, corrige la respuesta y
permite repasar errores.

La prioridad es que sea ampliable: agregar una categoría nueva no debe
exigir reprogramar el sistema de preguntas.

## 2. Alcance del MVP

### Categorías iniciales

1.  **Bolardos**: forma, color, reflectores y bandas.
2.  **Matrículas**: colores, formato, bandas y caracteres visibles.
3.  **Banderas**: identificación visual de banderas.
4.  **Señales de tránsito**.
5.  **Líneas viales**.
6.  **Postes eléctricos**.
7.  **Google Street View / vehículos y cámaras**.
8.  **Carteles, idiomas y alfabetos**.
9.  **Conducción por izquierda/derecha**.
10. **Dominios de Internet y prefijos telefónicos**.
11. **Buzones, semáforos, arquitectura, veredas y paisaje**, como
    expansiones.

Empezar con bolardos, banderas y matrículas. No cargar todas las
categorías antes de tener el juego funcionando.

### No incluir en la primera versión

-   Multijugador.
-   Ranking público.
-   Pagos.
-   IA que determine automáticamente la respuesta mirando la imagen.
-   Scraping agresivo o descarga masiva sin comprobar permisos.
-   Login obligatorio. Para el MVP se pueden guardar estadísticas en el
    navegador; si luego se necesitan varios usuarios o sincronización,
    incorporar cuentas.

## 3. Páginas de referencia y fuentes de datos

Estas páginas sirven para investigar categorías, recopilar datos o
descubrir ejemplos. **No asumir que todo su contenido se puede copiar o
descargar**: revisar condiciones de uso, licencia, `robots.txt`,
atribución y límites antes de automatizar. Si no está permitido, usar la
página como referencia y cargar manualmente datos propios o buscar
material con licencia compatible.

### Fuentes principales de pistas GeoGuessr

-   **GeoHints** --- https://geohints.com/\
    Fuente principal para explorar categorías como bollards, license
    plates, flags, road lines, road signs, utility poles, traffic
    lights, architecture, camera generations, Google cars, domains y
    driving side. Intentar extraer primero los textos y enlaces
    públicos; comprobar si las imágenes se sirven desde la propia página
    o desde otros dominios. Si el acceso automatizado está bloqueado o
    las condiciones no permiten reutilizar imágenes, no intentar eludir
    bloqueos.

-   **GeographyHelp** --- https://geoguessr.help/\
    Tabla de países con pistas como lado de conducción, dominio,
    matrículas, cámara, vehículos, letras especiales, bolardos, señales,
    prefijos telefónicos y monedas. Útil como fuente de datos
    estructurados y para contrastar países. Verificar licencia y
    condiciones antes de reutilizar.

-   **Geomastr** --- https://geomastr.com/\
    Guías de pistas por país y categoría; incluye páginas dedicadas a
    bolardos y otras pistas visuales. Útil como referencia secundaria
    para contrastar afirmaciones. Verificar permisos antes de scrapear o
    reutilizar contenido.

-   **GeoGhost --- guía de bolardos y líneas viales** ---
    https://geoghost.gg/blog/geoguessr-bollard-and-road-line-guide/\
    Referencia editorial para diseñar explicaciones y niveles de
    dificultad. No asumir permiso para copiar texto o imágenes.

-   **GeoGuess --- guías de identificación** ---
    https://geoguess.com/guides\
    Referencia para matrículas, banderas, señales, idiomas, dominios y
    otros indicios. Usar como material de consulta, no como fuente de
    copia automática sin autorización.

-   **GeoPrep** --- https://geoprep.fun/\
    Ejemplo de experiencia de quiz con banderas, bolardos, matrículas,
    selección de continente y modo de escribir respuestas. Sirve para
    estudiar funcionalidades y UX, no para copiar su contenido o código.

### Imágenes y datos reutilizables

-   **Wikimedia Commons --- licencias** ---
    https://commons.wikimedia.org/wiki/Commons:Licensing\
    Buscar imágenes cuya licencia permita el uso previsto. Guardar para
    cada imagen su URL original, autor, licencia, enlace a la licencia y
    atribución requerida. Las licencias varían por archivo.

-   **OpenStreetMap --- derechos y atribución** ---
    https://www.openstreetmap.org/copyright\
    Útil para datos geográficos abiertos, no como banco general de fotos
    de bolardos. Respetar atribución y las condiciones ODbL si se
    incorporan datos de OpenStreetMap.

-   **Banderas**: priorizar archivos de Wikimedia Commons con licencia
    clara o SVG propios. Mantener la fuente y licencia por archivo; no
    depender de una URL externa que pueda cambiar.

### Política de scraping

1.  Revisar términos de servicio, licencia y `robots.txt` de cada
    dominio.
2.  No evadir `403`, CAPTCHA, autenticación, controles anti-bot ni
    límites de acceso.
3.  Respetar límites de frecuencia y usar caché.
4.  Descargar únicamente contenido permitido.
5.  No asumir que una imagen visible públicamente puede republicarse.
6.  Guardar fuente, licencia, autor y fecha de captura.
7.  Si la fuente bloquea automatización, usar acceso manual autorizado,
    APIs oficiales si existen o alternativas con licencia abierta.
8.  El scraper debe poder apagarse por dominio y registrar errores sin
    reintentar indefinidamente.
9.  Separar el código de extracción de los datos del juego para que
    cambiar de fuente no obligue a rehacer la web.

## 4. Modos de juego

### A. Opción múltiple

-   Mostrar imagen o pista.
-   Mostrar 4 países como respuestas.
-   Una única respuesta correcta.
-   Los distractores deben ser países reales y, si es posible,
    visualmente similares.
-   No repetir la misma pregunta durante una sesión salvo que no haya
    suficientes preguntas.

### B. País entre todos

-   Mostrar imagen o pista.
-   Ofrecer un selector o buscador con todos los países habilitados.
-   Permitir filtrar por continente si el usuario lo seleccionó antes de
    empezar.

### C. Escribir el país

-   Mostrar imagen o pista sin opciones.
-   El usuario escribe el país.
-   Normalizar mayúsculas, minúsculas, acentos, espacios y alias
    conocidos.
-   Aceptar alias explícitos (por ejemplo, nombres locales o variantes
    configuradas), sin aceptar respuestas ambiguas.

### D. Repaso / aprendizaje

-   Mostrar la pista y la respuesta correcta.
-   Explicar qué rasgo hay que observar.
-   Permitir marcar "la sabía", "dudé" o "no la sabía".
-   Las preguntas falladas vuelven a aparecer con más frecuencia.

### E. Examen

-   Sesión de 10, 20 o 50 preguntas.
-   Sin mostrar la respuesta correcta hasta responder.
-   Al final: porcentaje de aciertos, tiempo promedio, resultados por
    categoría y lista de errores.

## 5. Dificultad

La dificultad debe cambiar la forma de responder y la ambigüedad de las
pistas, no limitarse a cambiar una etiqueta.

-   **Fácil**: opción múltiple con 4 países, pistas claras y países muy
    distintos.
-   **Media**: opción múltiple con países similares o selección de una
    región/continente.
-   **Difícil**: todos los países disponibles o respuesta escrita.
-   **Experto**: pistas menos obvias, vistas parciales o reverso de un
    objeto si hay imágenes verificadas; sin opciones y con tiempo
    opcional.

La dificultad real se asigna a cada pregunta en los datos. No inferirla
solo por la categoría.

## 6. Flujo de la web y páginas

### `/` --- Inicio

-   Nombre del sitio y botón "Entrenar".
-   Accesos a categorías.
-   Resumen de progreso: precisión global, preguntas respondidas y
    racha.
-   Acceso a "Repasar errores".

### `/entrenar` --- Configuración de sesión

Controles: - Categoría: una o varias. - Región: mundo, continente o
selección de países. - Dificultad. - Modo de respuesta. - Cantidad de
preguntas: 10, 20, 50 o práctica infinita. - Temporizador opcional. -
Botón "Empezar".

Validar que existan suficientes preguntas para la configuración elegida.
Si no, informar y ofrecer reducir filtros.

### `/jugar` --- Pantalla de pregunta

-   Progreso de la sesión.
-   Categoría y dificultad.
-   Imagen con tamaño adecuado, sin deformarla.
-   Opciones o campo de respuesta según el modo.
-   Botón para confirmar.
-   Después de responder: resultado correcto/incorrecto, país correcto y
    explicación.
-   Botón "Siguiente".
-   Evitar mostrar la respuesta antes de que el usuario confirme.

### `/resultados` --- Resumen

-   Aciertos, errores, precisión y tiempo.
-   Rendimiento por categoría y continente.
-   Lista de preguntas falladas con opción de repasarlas.
-   Botones "Repetir sesión" y "Volver al inicio".

### `/progreso` --- Estadísticas

-   Precisión histórica.
-   Categorías fuertes y débiles.
-   Países confundidos con frecuencia.
-   Preguntas pendientes de repaso.
-   Para el MVP, puede almacenarse localmente en el navegador.

### `/admin` --- Gestión de contenido (fase posterior)

-   Crear, editar, desactivar y revisar preguntas.
-   Cargar imágenes con fuente y licencia.
-   Marcar país correcto, alias, dificultad y explicación.
-   Detectar preguntas duplicadas o incompletas.
-   No publicar preguntas sin país, imagen o fuente/licencia
    verificadas.

## 7. Diseño de una pregunta

Cada pregunta debe tener: - Identificador único. - Categoría y
subcategoría. - País correcto. - Imagen o pista. - Texto alternativo
accesible. - Explicación breve y concreta. - Dificultad. -
Región/continente. - Fuente original. - Licencia, autor y atribución de
la imagen. - Estado de verificación. - Alias válidos para respuestas
escritas. - Distractores sugeridos opcionales. - Fecha de revisión.

No utilizar una imagen si no se puede verificar qué país representa. No
convertir una conjetura de una guía en una respuesta definitiva:
marcarla como pendiente de verificación o excluirla.

## 8. Modelo de datos sugerido

### `countries`

-   `id`
-   `name`
-   `iso2` (si corresponde)
-   `continent`
-   `aliases` (JSON o tabla relacionada)
-   `is_active`

### `categories`

-   `id`
-   `name`
-   `slug`
-   `description`
-   `is_active`

### `questions`

-   `id`
-   `category_id`
-   `country_id`
-   `subcategory`
-   `image_url` o `image_path`
-   `image_alt`
-   `prompt`
-   `explanation`
-   `difficulty` (1--4)
-   `region`
-   `source_url`
-   `image_author`
-   `image_license`
-   `license_url`
-   `attribution_text`
-   `verification_status` (`pending`, `verified`, `rejected`)
-   `created_at`
-   `updated_at`

### `question_aliases`

-   `id`
-   `question_id` o `country_id`
-   `alias_normalized`

### `question_attempts` (si se guardan estadísticas en servidor)

-   `id`
-   `session_id`
-   `question_id`
-   `submitted_answer`
-   `is_correct`
-   `response_time_ms`
-   `created_at`

### `sessions`

-   `id`
-   `user_id` opcional
-   `mode`
-   `difficulty`
-   `started_at`
-   `finished_at`
-   `question_count`

Para un MVP sin login, `sessions` y `question_attempts` pueden vivir en
`localStorage` o IndexedDB. No almacenar datos personales innecesarios.

## 9. Arquitectura técnica sugerida

Si se mantiene el stack simple de PHP y JavaScript vanilla:

-   **Frontend**: HTML, CSS y JavaScript vanilla.
-   **Backend**: PHP con endpoints JSON.
-   **Base de datos**: MySQL o MariaDB.
-   **Scrapers**: Python separado del backend web, ejecutado manualmente
    o mediante tareas programadas autorizadas.
-   **Imágenes**: almacenamiento local durante desarrollo; en
    producción, almacenamiento con URLs estables y permisos de uso
    comprobados.
-   **Control de versiones**: Git.

El frontend pide una pregunta al backend; el backend devuelve JSON con
la pregunta, las opciones y un identificador. Al enviar una respuesta,
el backend corrige usando el identificador y devuelve el resultado. No
enviar al cliente la respuesta correcta antes de que responda si se
quiere evitar que pueda inspeccionarla en la petición inicial.

### Endpoints orientativos

-   `GET /api/categories`
-   `GET /api/countries?continent=Europe`
-   `POST /api/sessions`
-   `GET /api/sessions/{id}/next-question`
-   `POST /api/sessions/{id}/answer`
-   `GET /api/sessions/{id}/results`
-   `GET /api/progress`
-   `GET /api/review`

Para un MVP exclusivamente personal se puede empezar sin backend y
cargar preguntas desde JSON local. Migrar a PHP/MySQL cuando haga falta
administrar contenido o sincronizar el progreso.

## 10. Scraper: diseño esperado

Crear un scraper independiente por sitio, no un único scraper genérico
para todas las páginas.

### Flujo

1.  Comprobar si el dominio está permitido para acceso automatizado.
2.  Obtener páginas con una frecuencia baja y respetar límites.
3.  Extraer únicamente campos públicos autorizados.
4.  Normalizar nombres de categorías y países.
5.  Guardar resultados brutos para poder auditarlos.
6.  Transformar los resultados a un formato común.
7.  Detectar imágenes repetidas, enlaces rotos y países dudosos.
8.  Guardar registros como `pending`, no como `verified`.
9.  Verificar manualmente las preguntas antes de incorporarlas al
    entrenamiento.
10. Generar un informe con elementos añadidos, omitidos y errores.

### Formato de salida común

El scraper debería generar un JSON con registros similares a:

``` json
{
  "category": "bollards",
  "country": "Example Country",
  "image_url": "https://example.org/image.jpg",
  "source_url": "https://example.org/reference",
  "image_license": "REVIEW_REQUIRED",
  "attribution": "",
  "difficulty": 1,
  "explanation": "",
  "verification_status": "pending"
}
```

Este registro es solo una plantilla ilustrativa, no un dato real. No
usar `Example Country` ni la URL de ejemplo como contenido de
producción.

### Reglas de calidad

-   No inventar país, licencia, autor ni explicación.
-   No duplicar preguntas solo porque la imagen tenga otra URL.
-   Comprobar que la imagen se carga y que la URL no redirige a una
    página HTML.
-   No descargar imágenes de fuentes sin permiso de reutilización.
-   Guardar siempre la fuente.
-   Separar el permiso de acceso al sitio del permiso para republicar
    sus imágenes: son cosas distintas.

## 11. Cómo generar buenas preguntas

Para cada categoría, crear preguntas verificadas con una ficha de
explicación:

**Ejemplo de ficha (sin imagen real):** - Categoría: bolardos. - País:
pendiente de verificar. - Pregunta: "¿De qué país es este bolardo?" -
Respuesta correcta: no publicar hasta verificar. - Explicación:
describir rasgos visibles y por qué ayudan a distinguirlo. -
Distractores: países con bolardos similares, evitando opciones
obviamente absurdas. - Fuente/licencia: completar antes de habilitar la
pregunta.

Una pista no siempre identifica un país de manera exclusiva. Cuando
exista solapamiento entre países, la explicación debe decir "es
compatible con..." o añadir una segunda pista; no afirmar que un diseño
es exclusivo si no está verificado.

## 12. Orden de implementación

### Fase 1 --- Motor de quiz

-   [ ] Crear estructura del proyecto.
-   [ ] Diseñar pantalla de inicio y configuración.
-   [ ] Crear 20--30 preguntas de prueba con imágenes de uso permitido.
-   [ ] Implementar opción múltiple.
-   [ ] Implementar corrección y explicación.
-   [ ] Implementar siguiente pregunta y progreso de sesión.
-   [ ] Implementar resultados.
-   [ ] Probar respuestas correctas, incorrectas y navegación.

### Fase 2 --- Modos y dificultad

-   [ ] Agregar selección de continente.
-   [ ] Agregar selección entre todos los países.
-   [ ] Agregar respuesta escrita y normalización de alias.
-   [ ] Agregar dificultades.
-   [ ] Agregar modo examen y temporizador opcional.
-   [ ] Evitar repeticiones dentro de una sesión.

### Fase 3 --- Progreso y repaso

-   [ ] Guardar intentos.
-   [ ] Mostrar precisión por categoría.
-   [ ] Crear repaso de errores.
-   [ ] Priorizar preguntas falladas.
-   [ ] Permitir reiniciar o borrar estadísticas locales.

### Fase 4 --- Datos y scraping

-   [ ] Revisar condiciones de cada fuente.
-   [ ] Implementar un extractor pequeño para una fuente autorizada.
-   [ ] Normalizar el JSON.
-   [ ] Incorporar fuente, licencia, autor y atribución.
-   [ ] Crear validador de enlaces e imágenes.
-   [ ] Crear revisión manual antes de publicar.
-   [ ] Ampliar a otras fuentes solo cuando la primera funcione.

### Fase 5 --- Administración y publicación

-   [ ] Crear panel para editar preguntas.
-   [ ] Añadir almacenamiento estable para imágenes permitidas.
-   [ ] Mover estadísticas a servidor si se necesitan cuentas.
-   [ ] Añadir accesibilidad, diseño responsive y manejo de errores.
-   [ ] Documentar instalación, variables de entorno y despliegue.

## 13. Criterios de aceptación

El MVP está listo cuando: - Se puede elegir una categoría y empezar una
sesión. - Se muestra una imagen y se puede responder. - La respuesta se
corrige de forma consistente. - Se muestra la explicación después de
responder. - Se puede avanzar hasta terminar la sesión. - Se muestra un
resumen con aciertos y errores. - Las preguntas no verificadas no
aparecen en partidas normales. - Las imágenes tienen fuente y
permiso/licencia documentados. - La página funciona en escritorio y
móvil. - Si no hay preguntas disponibles, el sitio lo explica sin
romperse.

## 14. Prompt para delegar la implementación a una IA

Usá este documento como especificación y pedile a la IA que trabaje por
etapas, no que genere todo de una vez:

> Leé el archivo `SPEC.md` completo y utilizalo como especificación del
> proyecto. Primero inspeccioná el repositorio y resumí la estructura
> existente antes de modificar archivos. Mantené HTML, CSS y JavaScript
> vanilla en el frontend y PHP para el backend si el repositorio ya
> sigue ese stack. Implementá primero el motor de quiz con datos JSON
> locales y 20 preguntas de prueba cuyos datos e imágenes tengan fuente
> y licencia verificables. No implementes scraping hasta revisar las
> condiciones de uso de cada fuente. No inventes imágenes, países,
> licencias ni respuestas. Separá la lógica de preguntas de la interfaz
> para que después se puedan agregar categorías sin reescribir el juego.
> Implementá en pasos pequeños, probá cada paso y mantené una lista de
> tareas pendientes. No agregues frameworks ni dependencias innecesarias
> sin justificarlo. Cuando termines cada fase, indicá qué archivos
> cambiaste, cómo probarlos y qué falta.

## 15. Referencias consultadas

-   GeoHints: https://geohints.com/
-   Descripción de GeoHints y categorías:
    https://github.com/bellingcat/toolkit/blob/main/gitbook/tools/geohints/README.md
-   GeographyHelp: https://geoguessr.help/
-   Geomastr: https://geomastr.com/
-   Guía de bolardos y líneas viales:
    https://geoghost.gg/blog/geoguessr-bollard-and-road-line-guide/
-   Guías GeoGuess: https://geoguess.com/guides
-   GeoPrep: https://geoprep.fun/
-   Wikimedia Commons --- licencias:
    https://commons.wikimedia.org/wiki/Commons:Licensing
-   OpenStreetMap --- copyright y atribución:
    https://www.openstreetmap.org/copyright
