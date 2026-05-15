(function () {
  const body = document.body;
  if (!body.dataset.basePrice) return;

  const BASE = parseInt(body.dataset.basePrice, 10);
  const DELIVERY = parseInt(body.dataset.delivery || '240', 10);

  function fmtPrice(n) {
    return '£ ' + n.toLocaleString('en-GB') + '.00';
  }

  function fmtDelta(n) {
    if (n === 0) return fmtPrice(0);
    const sign = n > 0 ? '+ ' : '− ';
    return sign + '£ ' + Math.abs(n).toLocaleString('en-GB') + '.00';
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

  function updateLineItems() {
    document.querySelectorAll('.config__group').forEach(group => {
      const key = group.dataset.config;
      if (!key) return;
      const row = document.querySelector('[data-line-item="' + key + '"]');
      if (!row) return;

      const chip = group.querySelector('.chip.is-active');
      if (!chip) {
        row.hidden = true;
        return;
      }
      const delta = parseInt(chip.dataset.delta || '0', 10);
      if (delta === 0) {
        row.hidden = true;
        return;
      }
      row.hidden = false;

      const label = chip.dataset.label || chip.textContent.trim();
      const labelEl = row.querySelector('[data-bind="' + key + '-line-label"]');
      const priceEl = row.querySelector('[data-bind="' + key + '-line-price"]');
      if (labelEl) labelEl.textContent = label;
      if (priceEl) priceEl.textContent = fmtDelta(delta);
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
      updateLineItems();
      updatePrices();
    });
  });

  updateLineItems();
  updatePrices();
})();
