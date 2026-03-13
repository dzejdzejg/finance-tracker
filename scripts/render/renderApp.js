import { DEMO_DATA } from '../data/demoData.js';
import { appState } from '../state/state.js';
import { renderDashboardHistory, initDashboardHistorySort } from './renderDashboardHistory.js';
import { renderTransactionsList, renderFilterCategoriesByType } from './renderTransactions.js';
import { renderTotals } from './renderTotals.js';
import { renderAnalyticsCategoryOptions, renderAnalyticsWithFilters } from './renderCharts.js';
import { renderCrypto } from './renderCrypto.js';
import { renderNavBadges } from './renderTransactionsBadge.js';
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
  renderNavBadges(data.transactions);
  renderTransactionsList(data.transactions);
  renderFilterCategoriesByType(data.transactions);
  renderTotals(data.transactions);
  renderAnalyticsCategoryOptions(data.transactions);
  renderAnalyticsWithFilters(data.transactions);
  renderRemindersList(data.reminders);
  renderBudgets(data.budgets, data.transactions);
}

export function initApp() {
  initDashboardHistorySort();
  initBudgetsModal();
  renderCrypto();
  renderApp();
}
