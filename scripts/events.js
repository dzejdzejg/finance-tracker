import { settingsBtn, modal, modalOverlay, closeBtn } from './dom.js';

settingsBtn?.addEventListener('click', () => {
  modal?.classList.toggle('is-shown');
});

closeBtn?.addEventListener('click', () => {
  modal?.classList.remove('is-shown');
});

modalOverlay?.addEventListener('click', () => {
  modal?.classList.remove('is-shown');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-shown')) {
    modal.classList.remove('is-shown');
  }
});
