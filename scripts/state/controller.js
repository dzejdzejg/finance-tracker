import {
  reminderInput,
  reminderAddBtn,
  incomeForm,
  expensesForm,
  transactionsList,
  topbarBadge,
  newsletterInput,
  newsletterBtn,
  modal,
  startWithEmptyBtn,
  incomeDesc,
  expenseDesc,
  remindersList,
  budgetsList,
} from '../dom.js';
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

  if (startWithEmptyBtn) {
    startWithEmptyBtn.textContent = 'Back to demo mode';
    startWithEmptyBtn.classList.add('modal__demo-btn--danger');
  }

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

  if (startWithEmptyBtn) {
    startWithEmptyBtn.textContent = 'Start with empty data';
    startWithEmptyBtn.classList.remove('modal__demo-btn--danger');
  }
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

/* === CHECK BUDGET WARNING === */
function checkBudgetWarnings(transaction) {
  if (transaction.type !== 'expense') return false;

  let exceeded = false;

  appState.budgets.forEach((budget) => {
    if (budget.category.toLowerCase() !== transaction.category.toLowerCase()) return;

    const now = new Date();
    const spent = appState.transactions
      .filter((t) => {
        if (t.type !== 'expense') return false;
        if (t.category.toLowerCase() !== budget.category.toLowerCase()) return false;

        const tDate = new Date(t.date);

        if (budget.period === 'month') return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();

        if (budget.period === 'week') {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          return tDate >= startOfWeek;
        }

        if (budget.period === 'year') return tDate.getFullYear() === now.getFullYear();
        return false;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    if (spent >= budget.limit) exceeded = true;
  });

  return exceeded;
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
  const exceeded = checkBudgetWarnings(transaction);
  saveAll();
  renderApp();
  form.reset();
  if (exceeded) {
    showToast(`⚠️ Budget exceeded for ${transaction.category}!`, 'warning', 5000);
  } else {
    showToast('Expense added!', 'success');
  }
}

/* === REMINDERS === */
function handleReminderAdd() {
  if (guardDemo()) return;

  const value = reminderInput?.value.trim();
  if (!value) {
    showToast('Please enter a reminder.', 'error');
    return;
  }

  if (value.length < 3) {
    showToast('Reminder must be at least 3 characters.', 'error');
    return;
  }

  if (value.length > 100) {
    showToast('Reminder must be under 100 characters.', 'error');
    return;
  }

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

/* === REMINDERS LIST (delete) === */
function handleRemindersListClick(e) {
  const target = e.target instanceof HTMLElement ? e.target : null;
  if (!target) return;

  const deleteBtn = target.closest('.history__reminder-delete');
  if (!deleteBtn) return;
  if (guardDemo()) return;

  const item = target.closest('[data-id]');
  const id = item?.dataset.id;
  if (!id) return;

  appState.reminders = appState.reminders.filter((r) => r.id !== id);
  saveAll();
  renderApp();
  showToast('Reminder deleted.', 'success');
}

/* === BUDGETS LIST (delete) === */
function handleBudgetsListClick(e) {
  const target = e.target instanceof HTMLElement ? e.target : null;
  if (!target) return;

  const deleteBtn = target.closest('.budgets__delete');
  if (!deleteBtn) return;
  if (guardDemo()) return;

  const item = target.closest('[data-id]');
  const id = item?.dataset.id;
  if (!id) return;

  appState.budgets = appState.budgets.filter((b) => b.id !== id);
  saveAll();
  renderApp();
  showToast('Budget deleted.', 'success');
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
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    appState.transactions = appState.transactions.filter((t) => t.id !== id);
    saveAll();
    renderApp();
    showToast('Transaction deleted.', 'info');
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
    const demo = isDemo();
    startWithEmptyBtn.textContent = demo ? 'Start with empty data' : 'Back to demo mode';
    if (!demo) startWithEmptyBtn.classList.add('modal__demo-btn--danger');
  }

  incomeForm?.addEventListener('submit', handleIncomeSubmit);
  expensesForm?.addEventListener('submit', handleExpensesSubmit);
  reminderAddBtn?.addEventListener('click', handleReminderAdd);
  transactionsList?.addEventListener('click', handleTransactionsListClick);
  newsletterBtn?.addEventListener('click', handleNewsletterSubscribe);
  remindersList?.addEventListener('click', handleRemindersListClick);
  budgetsList?.addEventListener('click', handleBudgetsListClick);
  reminderInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleReminderAdd();
    }
  });

  startWithEmptyBtn?.addEventListener('click', () => {
    if (isDemo()) {
      handleStartWithEmptyData();
    } else {
      switchToDemoMode();
    }
  });
}
