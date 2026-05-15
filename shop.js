(function () {
  const list = document.querySelector('.editions-grid');
  if (!list) return;
  const select = document.querySelector('.shop-sort__select');
  if (!select) return;

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

  select.addEventListener('change', () => applySort(select.value));
  applySort(select.value);
})();
