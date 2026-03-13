import { analyticsEmpty, analyticsGrid, chartsCardsWrapper, chartsEmpty } from '../dom.js';
import { initCharts, updateCategoryChart, updateTimeChart, updateCashflowChart, updateBalanceChart } from '../chart.js';
import { aggregateExpensesByCategory } from '../state/aggregateExpensesByCategory.js';
import { aggregateExpensesByMonth } from '../state/aggregateExpensesByMonth.js';
import { aggregateCashflowByMonth } from '../state/aggregateCashflowByMonth.js';
import { aggregateBalanceGrowth } from '../state/aggregateBalanceGrowth.js';

export function renderCharts(transactions = []) {
  initCharts();
  const hasData = transactions.some((t) => t.type === 'expense');

  chartsEmpty.hidden = hasData;
  analyticsEmpty.hidden = hasData;

  if (!hasData) {
    chartsEmpty.innerHTML = `
    <div class="charts__empty-icon"><i class="fa-solid fa-chart-pie"></i></div>
    <p class="charts__empty-title">No data yet</p>
    <p class="charts__empty-subtitle">Add expenses to see charts</p>
  `;
    analyticsEmpty.innerHTML = `
    <div class="analytics__empty-icon"><i class="fa-solid fa-chart-line"></i></div>
    <p class="analytics__empty-title">No data yet</p>
    <p class="analytics__empty-subtitle">Add transactions to see analytics</p>
  `;
  }

  if (chartsCardsWrapper) chartsCardsWrapper.hidden = !hasData;
  if (analyticsGrid) analyticsGrid.hidden = !hasData;

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
