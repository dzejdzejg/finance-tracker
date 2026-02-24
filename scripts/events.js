import { settingsBtn, modal, modalOverlay, closeBtn, navLinks, views } from './dom.js';

function openSettings() {
  modal?.classList.add('is-shown');
}

function closeSettings() {
  modal?.classList.remove('is-shown');
}

function goToView(target) {
  if (target === 'settings') {
    openSettings();
    return;
  }

  navLinks.forEach((l) => l.removeAttribute('aria-current'));

  const activeLink = [...navLinks].find((l) => l.dataset.go === target);

  activeLink?.setAttribute('aria-current', 'page');

  views.forEach((view) => {
    const isTarget = view.dataset.view === target;
    view.hidden = !isTarget;
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-go]');
  if (!trigger) return;

  const target = trigger.dataset.go;
  goToView(target);
});

settingsBtn?.addEventListener('click', openSettings);
closeBtn?.addEventListener('click', closeSettings);
modalOverlay?.addEventListener('click', closeSettings);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-shown')) {
    closeSettings();
  }
});
