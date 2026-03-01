import { DEMO_DATA } from '../data/demoData.js';
import { renderDashboardHistory, initDashboardHistorySort } from './renderDashboardHistory.js';
import { renderTransactionsList, renderFilterCategoriesByType } from './renderTransactions.js';
import { renderTotals } from './renderTotals.js';
import { renderCharts } from './renderCharts.js';
import { renderRemindersList } from './renderReminders.js';
import { renderBudgets, initBudgetsModal } from './renderBudgets.js';

renderDashboardHistory();
initDashboardHistorySort();
renderTransactionsList();
renderFilterCategoriesByType();
renderTotals();
renderCharts(DEMO_DATA.transactions);
renderRemindersList();
renderBudgets();
initBudgetsModal();
