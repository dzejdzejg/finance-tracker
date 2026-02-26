import { DEMO_DATA } from '../data/demoData.js';
import { calcTotals } from '../state/calcTotals.js';
import { incomeAmount, expensesAmount, balanceAmount, incomeTrendValue, expensesTrendValue, balanceTrendValue, incomeTrendBox, expensesTrendBox, balanceTrendBox } from '../dom.js';

function formatMoney(value) {
  return `$ ${Number(value).toFixed(2)}`;
}

function formatBadgeValue(value) {
  return `${Number(value).toFixed(2)}`;
}

function setTrend(boxEl, isUp) {
  if (!boxEl) return;
  boxEl.classList.toggle('operations__trend--up', isUp);
  boxEl.classList.toggle('operations__trend--down', !isUp);

  const icon = boxEl.querySelector('i');
  if (!icon) return;
  icon.classList.toggle('fa-arrow-trend-up', isUp);
  icon.classList.toggle('fa-arrow-trend-down', !isUp);
}

export function renderTotals() {
  const { income, expenses, balance } = calcTotals(DEMO_DATA.transactions);

  if (incomeAmount) incomeAmount.textContent = formatMoney(income);
  if (expensesAmount) expensesAmount.textContent = formatMoney(expenses);
  if (balanceAmount) balanceAmount.textContent = formatMoney(balance);

  if (incomeTrendValue) incomeTrendValue.textContent = formatBadgeValue(income);
  if (expensesTrendValue) expensesTrendValue.textContent = formatBadgeValue(expenses);
  if (balanceTrendValue) balanceTrendValue.textContent = formatBadgeValue(balance);

  setTrend(incomeTrendBox, true);
  setTrend(expensesTrendBox, false);
  setTrend(balanceTrendBox, balance >= 0);
}
