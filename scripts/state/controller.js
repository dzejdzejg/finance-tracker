import { reminderInput, reminderAddBtn, incomeForm, expensesForm, transactionsList, topbarBadge, newsletterInput, newsletterBtn, modal, startWithEmptyBtn, incomeDesc, expenseDesc } from '../dom.js';
import { appState, isDemo } from './state.js';
import { showToast } from '../events.js';
import { renderApp } from '../render/renderApp.js';
import { loadState, saveAll } from '../data/storage.js';
import { renderEditForm } from '../render/renderTransactions.js';

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

  const dataAmount = parseFloat(data.amount);
  if (!dataAmount || dataAmount <= 0) {
    showToast('Amount must be greater than 0.', 'error');
    return;
  }

  const transaction = {
    id: `t_${Date.now()}`,
    type: 'income',
    amount: dataAmount,
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

  const dataAmount = parseFloat(data.amount);
  if (!dataAmount || dataAmount <= 0) {
    showToast('Amount must be greater than 0.', 'error');
    return;
  }

  const transaction = {
    id: `t_${Date.now()}`,
    type: 'expense',
    amount: dataAmount,
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
  const saveBtn = target.closest('.transactions__edit-save');
  const cancelBtn = target.closest('.transactions__edit-cancel');

  if (!editBtn && !deleteBtn && !saveBtn && !cancelBtn) return;

  if (cancelBtn) {
    renderApp();
    return;
  }

  if (saveBtn) {
    const id = saveBtn.dataset.id;
    const item = transactionsList.querySelector(`[data-id="${id}"]`);
    if (!item) return;

    const description = item.querySelector('[name="description"]').value.trim();
    const amount = parseFloat(item.querySelector('[name="amount"]').value);
    const date = item.querySelector('[name="date"]').value;

    if (!amount || !date) {
      showToast('Amount and date are required.', 'error');
      return;
    }

    const idx = appState.transactions.findIndex((t) => t.id === id);
    if (idx === -1) return;

    appState.transactions[idx] = {
      ...appState.transactions[idx],
      description,
      amount,
      date,
    };

    saveAll();
    renderApp();
    showToast('Transaction updated', 'success');
    return;
  }

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
    renderEditForm(id);
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
