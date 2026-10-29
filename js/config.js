/* ============ CONFIGURACIÓN ============
   GMAPS_KEY: API key de Google Maps con la "Maps Embed API" habilitada (es gratuita para Street View).
   Con la key, el Street View de cada zona usa la API oficial. Sin key, se usa el embed público de
   Google Maps (funciona en la mayoría de los casos, pero sin garantías).
   Restringila en Google Cloud a tu dominio de Vercel (https://<tu-app>.vercel.app/*) y a la Maps
   Embed API: así va en el front sin riesgo. */
const GMAPS_KEY = '';
