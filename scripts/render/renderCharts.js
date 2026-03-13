import { analyticsCategory, analyticsEmpty, analyticsGrid, analyticsRange, chartsCardsWrapper, chartsEmpty } from '../dom.js';
import { initCharts, updateCategoryChart, updateTimeChart, updateCashflowChart, updateBalanceChart } from '../chart.js';
import { aggregateExpensesByCategory } from '../state/aggregateExpensesByCategory.js';
import { aggregateExpensesByMonth } from '../state/aggregateExpensesByMonth.js';
import { aggregateCashflowByMonth } from '../state/aggregateCashflowByMonth.js';
import { aggregateBalanceGrowth } from '../state/aggregateBalanceGrowth.js';

let _transactions = [];

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

export function renderAnalyticsWithFilters(transactions) {
  if (transactions !== undefined) _transactions = transactions;

  const days = parseInt(analyticsRange?.value ?? '30');
  const category = analyticsCategory?.value ?? 'all';

  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() - days);

  const filtered = _transactions.filter((t) => {
    const tDate = new Date(t.date);
    if (tDate < cutoff) return false;
    if (category !== 'all' && t.type === 'expense' && t.category.toLowerCase() !== category.toLowerCase()) return false;
    return true;
  });

  renderCharts(filtered);
}

export function renderAnalyticsCategoryOptions(transactions) {
  if (!analyticsCategory) return;

  const currentValue = analyticsCategory.value;

  const categories = [...new Set(transactions.filter((t) => t.type === 'expense').map((t) => t.category))].sort();

  analyticsCategory.innerHTML = `<option value="all">All categories</option>` + categories.map((c) => `<option value="${c}">${c}</option>`).join('');

  if ([...analyticsCategory.options].some((o) => o.value === currentValue)) {
    analyticsCategory.value = currentValue;
  }
}
