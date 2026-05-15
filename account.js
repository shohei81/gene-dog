(function () {
  const triggers = document.querySelectorAll('.nav__account-trigger');
  if (!triggers.length) return;

  function closeAll(except) {
    document.querySelectorAll('.account-panel').forEach(panel => {
      if (panel === except) return;
      panel.hidden = true;
      const trig = panel.previousElementSibling;
      if (trig && trig.classList.contains('nav__account-trigger')) {
        trig.setAttribute('aria-expanded', 'false');
      }
    });
  }

  triggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains('account-panel')) return;

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = panel.hidden;
      closeAll(willOpen ? panel : null);
      panel.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', String(willOpen));
    });

    panel.addEventListener('click', e => e.stopPropagation());
  });

  document.addEventListener('click', () => closeAll(null));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll(null);
  });
})();
