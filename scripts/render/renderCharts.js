import { analyticsEmpty } from '../dom.js';
import { initCharts, updateCategoryChart, updateTimeChart, updateCashflowChart, updateBalanceChart } from '../chart.js';
import { aggregateExpensesByCategory } from '../state/aggregateExpensesByCategory.js';
import { aggregateExpensesByMonth } from '../state/aggregateExpensesByMonth.js';
import { aggregateCashflowByMonth } from '../state/aggregateCashflowByMonth.js';
import { aggregateBalanceGrowth } from '../state/aggregateBalanceGrowth.js';

export function renderCharts(transactions = []) {
  initCharts();

  const hasData = transactions.length > 0;

  analyticsEmpty.hidden = hasData;

  if (!hasData) return;

  const { labels: catLabels, values: catValues } = aggregateExpensesByCategory(transactions);
  updateCategoryChart(catLabels, catValues);

  const { labels: monthLabels, values: monthValues } = aggregateExpensesByMonth(transactions);
  updateTimeChart(monthLabels, monthValues);

  const { labels, income, expenses } = aggregateCashflowByMonth(transactions);
  updateCashflowChart(labels, income, expenses);

  const { labels: balLabels, values: balValues } = aggregateBalanceGrowth(transactions, 0);
  updateBalanceChart(balLabels, balValues);
}
