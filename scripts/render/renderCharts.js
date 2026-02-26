import { initCharts, updateCategoryChart, updateTimeChart } from '../chart.js';
import { aggregateExpensesByCategory } from '../state/aggregateExpensesByCategory.js';
import { aggregateExpensesByMonth } from '../state/aggregateExpensesByMonth.js';

export function renderCharts(transactions = []) {
  initCharts();

  const { labels: catLabels, values: catValues } = aggregateExpensesByCategory(transactions);
  updateCategoryChart(catLabels, catValues);

  const { labels: monthLabels, values: monthValues } = aggregateExpensesByMonth(transactions);
  updateTimeChart(monthLabels, monthValues);
}
