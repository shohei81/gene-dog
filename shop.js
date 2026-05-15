(function () {
  const list = document.querySelector('.editions-grid');
  if (!list) return;
  const buttons = document.querySelectorAll('.shop-sort .chip');
  if (!buttons.length) return;

  function applySort(key) {
    const items = Array.from(list.querySelectorAll('.col-card'));
    items.sort((a, b) => {
      switch (key) {
        case 'popularity':
          return parseInt(a.dataset.popularity || '99', 10)
               - parseInt(b.dataset.popularity || '99', 10);
        case 'recent':
          return (b.dataset.released || '').localeCompare(a.dataset.released || '');
        case 'price-asc':
          return parseInt(a.dataset.price || '0', 10)
               - parseInt(b.dataset.price || '0', 10);
        case 'price-desc':
          return parseInt(b.dataset.price || '0', 10)
               - parseInt(a.dataset.price || '0', 10);
        default:
          return 0;
      }
    });
    items.forEach(item => list.appendChild(item));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applySort(btn.dataset.sort);
    });
  });

  const initial = document.querySelector('.shop-sort .chip.is-active');
  if (initial) applySort(initial.dataset.sort);
})();
