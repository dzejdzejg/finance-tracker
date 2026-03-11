import { DEMO_DATA } from '../data/demoData.js';
import { appState } from '../state/state.js';
import { renderDashboardHistory, initDashboardHistorySort } from './renderDashboardHistory.js';
import { renderTransactionsList, renderFilterCategoriesByType } from './renderTransactions.js';
import { renderTotals } from './renderTotals.js';
import { renderCharts } from './renderCharts.js';
import { renderCrypto } from './renderCrypto.js';
import { renderRemindersList } from './renderReminders.js';
import { renderBudgets, initBudgetsModal } from './renderBudgets.js';

export function getActiveData() {
  if (appState.mode === 'demo') return DEMO_DATA;
  return {
    transactions: appState.transactions,
    budgets: appState.budgets,
    reminders: appState.reminders,
  };
}

export function renderApp() {
  const data = getActiveData();

  renderDashboardHistory(data.transactions);
  renderTransactionsList(data.transactions);
  renderFilterCategoriesByType();
  renderTotals(data.transactions);
  renderCharts(data.transactions);
  renderRemindersList(data.reminders);
  renderBudgets(data.budgets);
}

export function initApp() {
  initDashboardHistorySort();
  initBudgetsModal();
  renderCrypto();
  renderApp();
}
