import { reminderInput, reminderAddBtn, incomeForm, expensesForm, transactionsList, topbarBadge, newsletterInput, newsletterBtn } from '../dom.js';
import { appMode } from './state.js';
import { showToast } from '../events.js';

export function guardDemo() {
  if (appMode.demo) {
    showToast('Available in user mode. Click "Start with empty data" in Settings.', 'info');
    return true;
  }
  return false;
}

function updateDemoBadge() {
  if (!topbarBadge) return;
  topbarBadge.hidden = !appMode.demo;
}

function handleNewsletterSubscribe() {
  const email = newsletterInput?.value.trim() ?? '';

  if (!email) {
    showToast('Please enter your email address.', 'error');
    return;
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    showToast('Please enter a valid email address (e.g. name@example.com).', 'error');
    return;
  }

  if (guardDemo()) return;

  // user mode (TODO later)
  showToast('Subscribed!', 'success');
  newsletterInput.value = '';
}

function handleIncomeSubmit(e) {
  e.preventDefault();

  if (guardDemo()) return;

  // user mode (TODO later)
}

function handleExpensesSubmit(e) {
  e.preventDefault();

  if (guardDemo()) return;

  // user mode (TODO later)
}

function handleReminderAdd() {
  if (guardDemo()) return;

  const value = reminderInput?.value.trim();
  if (!value) return;

  console.log('ADD REMINDER (user mode later):', value);

  reminderInput.value = '';
}

function handleTransactionsListClick(e) {
  const target = e.target instanceof HTMLElement ? e.target : null;
  if (!target) return;

  const editBtn = target.closest('.transactions__edit');
  const deleteBtn = target.closest('.transactions__delete');

  if (!editBtn && !deleteBtn) return;

  if (guardDemo()) return;
}

export function initController() {
  updateDemoBadge();

  incomeForm?.addEventListener('submit', handleIncomeSubmit);
  expensesForm?.addEventListener('submit', handleExpensesSubmit);
  reminderAddBtn?.addEventListener('click', handleReminderAdd);
  transactionsList?.addEventListener('click', handleTransactionsListClick);
  newsletterBtn?.addEventListener('click', handleNewsletterSubscribe);
}
