import {
  settingsBtn,
  modal,
  modalOverlay,
  closeBtn,
  navLinks,
  views,
  toastEl,
  themeBtn,
  themeToggle,
  animationsToggle,
  exportJSONBtn,
  exportCSVBtn,
  analyticsCategory,
  analyticsRange,
} from './dom.js';
import { getActiveData } from './render/renderApp.js';
import { resizeCharts } from './chart.js';
import { isDemo } from './state/state.js';
import { renderAnalyticsWithFilters } from './render/renderCharts.js';

function openSettings() {
  modal?.classList.add('is-shown');
  syncSettingsUI();
}

function closeSettings() {
  modal?.classList.remove('is-shown');
}

/* === THEME === */
function setTheme(isDark) {
  document.body.classList.toggle('is-dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  syncSettingsUI();
}

function toggleTheme() {
  setTheme(!document.body.classList.contains('is-dark'));
}

/* === ANIMATIONS === */
function setAnimationsEnabled(enabled) {
  document.body.classList.toggle('no-anim', !enabled);
  localStorage.setItem('animations', enabled ? 'on' : 'off');
  syncSettingsUI();
}

/* === SYNC UI === */
function syncSettingsUI() {
  const isDark = document.body.classList.contains('is-dark');
  themeToggle && (themeToggle.checked = isDark);

  const animationsEnabled = !document.body.classList.contains('no-anim');
  animationsToggle && (animationsToggle.checked = animationsEnabled);
}

/* === EXPORT JSON === */
function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/* === EXPORT CSV === */
function downloadCsv(filename, transactions) {
  const headers = 'id;type;amount;date;category;description';
  const rows = transactions
    .map((t) => {
      return `${t.id};${t.type};${String(t.amount).replace('.', ',')};${t.date};${t.category};"${t.description ?? ''}"`;
    })
    .join('\n');

  const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/* === GO TO VIEW === */
function goToView(target) {
  if (target === 'settings') {
    openSettings();
    return;
  }

  const links = Array.from(navLinks);

  links.forEach((l) => l.removeAttribute('aria-current'));

  links.filter((l) => l.dataset.go === target).forEach((l) => l.setAttribute('aria-current', 'page'));

  views.forEach((view) => (view.hidden = view.dataset.view !== target));

  if (target === 'dashboard' || target === 'analytics') {
    requestAnimationFrame(() => {
      resizeCharts();
    });
  }

  localStorage.setItem('activeView', target);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-go]');
  if (!trigger) return;

  const target = trigger.dataset.go;
  goToView(target);
});

/* === TOAST === */
let toastTimeout;

export function showToast(message, type = 'info', duration = 3000) {
  if (!toastEl) return;

  clearTimeout(toastTimeout);

  toastEl.textContent = message;

  toastEl.classList.remove('toast--success', 'toast--error', 'toast--info', 'toast--warning');
  toastEl.classList.add(`toast--${type}`);

  toastEl.hidden = false;
  void toastEl.offsetWidth;
  toastEl.classList.add('toast--visible');

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('toast--visible');

    setTimeout(() => {
      toastEl.hidden = true;
    }, 250);
  }, duration);
}

/* ===== INIT from localStorage ===== */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('is-dark');

const savedAnimations = localStorage.getItem('animations');
if (savedAnimations === 'off') document.body.classList.add('no-anim');

syncSettingsUI();

const savedView = localStorage.getItem('activeView');
const allowedViews = new Set(['dashboard', 'transactions', 'analytics', 'budgets']);
if (allowedViews.has(savedView)) goToView(savedView);

document.querySelector('.views')?.classList.add('is-ready');

settingsBtn?.addEventListener('click', openSettings);
closeBtn?.addEventListener('click', closeSettings);
modalOverlay?.addEventListener('click', closeSettings);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-shown')) closeSettings();
});

themeBtn?.addEventListener('click', toggleTheme);

themeToggle?.addEventListener('change', (e) => setTheme(e.target.checked));
animationsToggle?.addEventListener('change', (e) => setAnimationsEnabled(e.target.checked));

[analyticsRange, analyticsCategory].forEach((el) => {
  el?.addEventListener('change', () => {
    if (isDemo()) {
      showToast('Analytics filters will be available in user mode.', 'info');
      return;
    }

    renderAnalyticsWithFilters();
  });
});

exportJSONBtn?.addEventListener('click', () => {
  const data = getActiveData();

  if (!data.transactions.length && !data.budgets.length && !data.reminders.length) {
    showToast('No data to export.', 'error');
    return;
  }

  const payload = {
    exportedAt: new Date().toISOString(),
    transactions: data.transactions,
    budgets: data.budgets,
    reminders: data.reminders,
    settings: {
      theme: document.body.classList.contains('is-dark') ? 'dark' : 'light',
      animations: document.body.classList.contains('no-anim') ? 'off' : 'on',
    },
  };

  downloadJson('finance-tracker-export.json', payload);
  showToast('Exported JSON successfully', 'success');
});

exportCSVBtn?.addEventListener('click', () => {
  const data = getActiveData();

  if (!data.transactions.length) {
    showToast('No transactions to export.', 'error');
    return;
  }

  downloadCsv('finance-tracker-export.csv', data.transactions);
  showToast('Exported CSV successfully', 'success');
});
