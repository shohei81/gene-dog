(function () {
  const navInner = document.querySelector('.nav__inner');
  if (!navInner) return;

  const burger = document.createElement('button');
  burger.type = 'button';
  burger.className = 'nav__burger';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';
  navInner.insertBefore(burger, navInner.firstChild);

  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.hidden = true;

  const leftLinks = document.querySelector('.nav__left');
  const rightLinks = document.querySelector('.nav__right');
  const accountPanel = document.querySelector('.account-panel');

  let html = '<div class="mobile-drawer__inner">';
  if (leftLinks) {
    html += '<ul class="mobile-drawer__main">' + leftLinks.innerHTML + '</ul>';
  }
  if (accountPanel) {
    html += '<div class="mobile-drawer__account">' + accountPanel.innerHTML + '</div>';
  }
  if (rightLinks) {
    const rightClone = rightLinks.cloneNode(true);
    const accountLi = rightClone.querySelector('.nav__account');
    if (accountLi) accountLi.remove();
    html += '<ul class="mobile-drawer__util">' + rightClone.innerHTML + '</ul>';
  }
  html += '</div>';
  drawer.innerHTML = html;
  document.body.appendChild(drawer);

  function open() {
    drawer.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    burger.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    drawer.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', () => {
    if (drawer.hidden) open();
    else close();
  });
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.hidden) close();
  });
})();
