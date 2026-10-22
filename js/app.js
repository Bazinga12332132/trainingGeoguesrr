function render() {
  const route = location.hash.replace(/^#\/?/, '');
  const pages = {
    entrenar: vSetup,
    jugar: vPlay,
    resultados: vFin,
    progreso: vProg
  };
  const page = pages[route];

  app.innerHTML = page ? page() : vHome();
  hydratePix();

  if (route === 'jugar') {
    tick();
  } else if (S) {
    clearInterval(S.tm);
  }
}

window.addEventListener('hashchange', render);
render();
