import { reminderInput, reminderAddBtn, incomeForm, expensesForm, transactionsList, topbarBadge, newsletterInput, newsletterBtn, modal, startWithEmptyBtn, incomeDesc, expenseDesc } from '../dom.js';
import { appState, isDemo } from './state.js';
import { showToast } from '../events.js';
import { renderApp } from '../render/renderApp.js';
import { loadState, saveAll } from '../data/storage.js';

export function guardDemo() {
  if (isDemo()) {
    showToast('Available in user mode. Click "Start with empty data" in Settings.', 'info');
    return true;
  }
  return false;
}

function updateDemoBadge() {
  if (!topbarBadge) return;
  topbarBadge.hidden = !isDemo();
}

/* === HOME PLACEHOLDERS === */
function updateFormPlaceholders() {
  const demoText = 'Change demo mode in settings to add transactions';
  const userTextIncome = 'e.g. Monthly salary, freelance work...';
  const userTextExpense = 'e.g. Groceries, new shoes, netflix...';
  const userTextReminder = 'e.g. Pay rent on Friday...';

  const demo = isDemo();
  if (incomeDesc) incomeDesc.placeholder = demo ? demoText : userTextIncome;
  if (expenseDesc) expenseDesc.placeholder = demo ? demoText : userTextExpense;
  if (reminderInput) reminderInput.placeholder = demo ? demoText : userTextReminder;
}

/* === SWITCH TO USER MODE === */
export function switchToUserMode() {
  appState.mode = 'user';
  appState.transactions = [];
  appState.budgets = [];
  appState.reminders = [];

  saveAll();
  updateFormPlaceholders();
  updateDemoBadge();
  renderApp();

  modal?.classList.remove('is-shown');

  if (startWithEmptyBtn) startWithEmptyBtn.textContent = 'Back to demo mode';

  showToast('User mode activated! Add your first transaction.', 'success');
}

/* === SWITCH BACK TO DEMO (future) === */
export function switchToDemoMode() {
  const confirmed = window.confirm('This will clear all your data and show demo data. Are you sure to continue?');
  if (!confirmed) return;

  // clearUserData(); FUTURE
  appState.mode = 'demo';
  appState.transactions = [];
  appState.budgets = [];
  appState.reminders = [];

  saveAll();
  updateFormPlaceholders();
  updateDemoBadge();
  renderApp();

  modal?.classList.remove('is-shown');

  if (startWithEmptyBtn) startWithEmptyBtn.textContent = 'Start with empty data';
}

/* === NEWSLETTER === */
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

  showToast('Subscribed!', 'success');
  newsletterInput.value = '';
}

/* === INCOME FORM === */
function handleIncomeSubmit(e) {
  e.preventDefault();
  if (guardDemo()) return;

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const transaction = {
    id: `t_${Date.now()}`,
    type: 'income',
    amount: parseFloat(data.amount),
    date: data.date,
    category: data.category,
    description: data.description?.trim() ?? '',
  };

  appState.transactions.push(transaction);
  saveAll();
  renderApp();

  form.reset();
  showToast('Income added!', 'success');
}

/* === EXPENSES FORM === */
function handleExpensesSubmit(e) {
  e.preventDefault();
  if (guardDemo()) return;

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const transaction = {
    id: `t_${Date.now()}`,
    type: 'expense',
    amount: parseFloat(data.amount),
    date: data.date,
    category: data.category,
    description: data.description?.trim() ?? '',
  };

  appState.transactions.push(transaction);
  saveAll();
  renderApp();

  form.reset();
  showToast('Expense added!', 'success');
}

/* === REMINDERS === */
function handleReminderAdd() {
  if (guardDemo()) return;

  const value = reminderInput?.value.trim();
  if (!value) return;

  const reminder = {
    id: `r_${Date.now()}`,
    name: value,
  };

  appState.reminders.push(reminder);
  saveAll();
  renderApp();

  reminderInput.value = '';
  showToast('Reminder added!', 'success');
}

/* === TRANSACTIONS LIST (edit/delete) === */
function handleTransactionsListClick(e) {
  const target = e.target instanceof HTMLElement ? e.target : null;
  if (!target) return;

  const editBtn = target.closest('.transactions__edit');
  const deleteBtn = target.closest('.transactions__delete');

  if (!editBtn && !deleteBtn) return;
  if (guardDemo()) return;

  const item = target.closest('[data-id]');
  const id = item?.dataset.id;
  if (!id) return;

  if (deleteBtn) {
    appState.transactions = appState.transactions.filter((t) => t.id !== id);
    saveAll();
    renderApp();
    showToast('Transaction deleted.', 'success');
  }

  if (editBtn) {
    // inline edit future
  }
}

/* === START WITH EMPTY DATA === */
function handleStartWithEmptyData() {
  const confirmed = window.confirm('This will clear all demo data and start fresh. Continue?');

  if (!confirmed) return;
  switchToUserMode();
}

/* === INIT === */
export function initController() {
  loadState();
  updateFormPlaceholders();
  updateDemoBadge();

  if (startWithEmptyBtn) {
    startWithEmptyBtn.textContent = isDemo() ? 'Start with empty data' : 'Back to demo mode';
  }

  incomeForm?.addEventListener('submit', handleIncomeSubmit);
  expensesForm?.addEventListener('submit', handleExpensesSubmit);
  reminderAddBtn?.addEventListener('click', handleReminderAdd);
  transactionsList?.addEventListener('click', handleTransactionsListClick);
  newsletterBtn?.addEventListener('click', handleNewsletterSubscribe);

  startWithEmptyBtn?.addEventListener('click', () => {
    if (isDemo()) {
      handleStartWithEmptyData();
    } else {
      switchToDemoMode();
    }
  });
}
