import { appState } from '../state/state.js';

const KEYS = {
  MODE: 'ft_mode',
  TRANSACTIONS: 'ft_transactions',
  BUDGETS: 'ft_budgets',
  REMINDERS: 'ft_reminders',
};

export function saveMode(mode) {
  localStorage.setItem(KEYS.MODE, mode);
}

export function saveTransactions(transactions) {
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

export function saveBudgets(budgets) {
  localStorage.setItem(KEYS.BUDGETS, JSON.stringify(budgets));
}

export function saveReminders(reminders) {
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(reminders));
}

export function saveAll() {
  saveMode(appState.mode);
  saveTransactions(appState.transactions);
  saveBudgets(appState.budgets);
  saveReminders(appState.reminders);
}

export function loadState() {
  const mode = localStorage.getItem(KEYS.MODE) ?? 'demo';
  appState.mode = mode;

  if (mode === 'user') {
    appState.transactions = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) ?? '[]');
    appState.budgets = JSON.parse(localStorage.getItem(KEYS.BUDGETS) ?? '[]');
    appState.reminders = JSON.parse(localStorage.getItem(KEYS.REMINDERS) ?? '[]');
  }
}

export function clearUserData() {
  localStorage.removeItem(KEYS.TRANSACTIONS);
  localStorage.removeItem(KEYS.BUDGETS);
  localStorage.removeItem(KEYS.REMINDERS);
  localStorage.removeItem(KEYS.MODE);
}
