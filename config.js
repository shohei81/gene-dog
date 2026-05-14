(function () {
  const body = document.body;
  if (!body.dataset.basePrice) return;

  const BASE = parseInt(body.dataset.basePrice, 10);
  const DELIVERY = parseInt(body.dataset.delivery || '240', 10);

  function fmtPrice(n) {
    return '£ ' + n.toLocaleString('en-GB') + '.00';
  }

  function updatePrices() {
    let dog = BASE;
    document.querySelectorAll('.chip.is-active').forEach(chip => {
      dog += parseInt(chip.dataset.delta || '0', 10);
    });
    const total = dog + DELIVERY;
    document.querySelectorAll('[data-price-dog]').forEach(el => {
      el.textContent = fmtPrice(dog);
    });
    document.querySelectorAll('[data-price-total]').forEach(el => {
      el.textContent = fmtPrice(total);
    });
  }

  function updateBindings(group, chip) {
    const key = group.dataset.config;
    if (!key) return;

    const label = chip.dataset.label || chip.textContent.trim();
    const selected = group.querySelector('.config__selected');
    if (selected) selected.textContent = label;

    document.querySelectorAll('[data-bind="' + key + '-label"]').forEach(el => {
      el.textContent = label;
    });
    if (chip.dataset.stock) {
      document.querySelectorAll('[data-bind="' + key + '-stock"]').forEach(el => {
        el.textContent = chip.dataset.stock;
      });
    }
  }

  document.querySelectorAll('.config__group').forEach(group => {
    group.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip || !group.contains(chip)) return;
      e.preventDefault();
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      updateBindings(group, chip);
      updatePrices();
    });
  });

  updatePrices();
})();
