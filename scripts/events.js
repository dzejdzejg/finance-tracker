import { settingsBtn, modal, modalOverlay, closeBtn, navLinks, views } from './dom.js';

function openSettings() {
  modal?.classList.add('is-shown');
}

function closeSettings() {
  modal?.classList.remove('is-shown');
}

settingsBtn?.addEventListener('click', openSettings);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.dataset.go;

    if (target === 'settings') {
      openSettings();
      return;
    }

    navLinks.forEach((l) => l.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');

    views.forEach((view) => {
      const isTarget = view.dataset.view === target;
      view.hidden = !isTarget;
    });
  });
});

closeBtn?.addEventListener('click', closeSettings);
modalOverlay?.addEventListener('click', closeSettings);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-shown')) {
    closeSettings();
  }
});
