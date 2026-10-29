function render() {
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const route = parts[0];
  const pages = {
    entrenar: vSetup,
    jugar: vPlay,
    resultados: vFin,
    progreso: vProg,
    guia: () => (parts[1] ? vPais(parts[1]) : vGuia())
  };
  const page = pages[route];

  app.innerHTML = page ? page() : vHome();
  if (route === 'guia' || route === '') window.scrollTo(0, 0);
  if (route === 'guia' && parts[1]) montarZonas(parts[1]);
  else ZS = null;

  if (route === 'jugar') {
    tick();
  } else if (S) {
    clearInterval(S.tm);
  }
}

window.addEventListener('hashchange', render);
render();
