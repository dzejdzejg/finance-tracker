import { reminderInput, reminderAddBtn, incomeForm, expensesForm } from '../dom.js';
import { appMode } from './state.js';
import { showToast } from '../events.js';

export function guardDemo() {
  if (appMode.demo) {
    showToast('Available in user mode. Click "Start with empty data" in Settings.', 'info');
    return true;
  }
  return false;
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

export function initController() {
  incomeForm?.addEventListener('submit', handleIncomeSubmit);
  expensesForm?.addEventListener('submit', handleExpensesSubmit);
  reminderAddBtn?.addEventListener('click', handleReminderAdd);
}
