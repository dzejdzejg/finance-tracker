import { DEMO_DATA } from '../data/demoData.js';
import { renderDashboardHistory } from './renderDashboardHistory.js';
import { renderTransactionsList } from './renderTransactions.js';
import { renderTotals } from './renderTotals.js';
import { renderCharts } from './renderCharts.js';
import { renderRemindersList } from './renderReminders.js';

renderDashboardHistory();
renderTransactionsList();
renderTotals();
renderCharts(DEMO_DATA.transactions);
renderRemindersList();
