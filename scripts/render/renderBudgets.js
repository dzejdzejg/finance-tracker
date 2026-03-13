import { budgetsList, budgetsEmpty, budgetsAddBtn, budgetsModal, budgetsForm } from '../dom.js';
import { guardDemo } from '../state/controller.js';
import { appState } from '../state/state.js';
import { saveAll } from '../data/storage.js';
import { showToast } from '../events.js';
import { renderApp } from './renderApp.js';

function calcBudgetProgress(budget, transactions) {
  const now = new Date();

  const spent = transactions
    .filter((t) => {
      if (t.type !== 'expense') return false;
      if (t.category.toLowerCase() !== budget.category.toLowerCase()) return false;

      const tDate = new Date(t.date);

      if (budget.period === 'month') {
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      }
      if (budget.period === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return tDate >= startOfWeek;
      }
      if (budget.period === 'year') {
        return tDate.getFullYear() === now.getFullYear();
      }

      return false;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    spent,
    progress: Math.min(Math.round((spent / budget.limit) * 100), 100),
  };
}

export function renderBudgets(budgets = [], transactions = []) {
  const budgetsItems = budgets;

  if (!budgetsItems.length) {
    budgetsList.innerHTML = '';
    budgetsEmpty.hidden = false;
    budgetsEmpty.innerHTML = `
      <div class="budgets__empty-icon"><i class="fa-solid fa-wallet"></i></div>
      <p class="budgets__empty-title">No budgets yet</p>
      <p class="budgets__empty-subtitle">Click Add Budget to get started</p>
    `;
    return;
  }

  budgetsEmpty.hidden = true;

  budgetsList.innerHTML = budgetsItems
    .map((b) => {
      const { spent, progress } = calcBudgetProgress(b, transactions);

      return `
      <li class="budgets__item" data-id="${b.id}">
        <div class="budgets__info">
          <span class="budgets__category">${b.category}</span>
          <span class="budgets__limit">$${b.limit} / ${b.period}</span>
        </div>

        <div class="budgets__progress">
          <div class="budgets__progress-bar" style="width: ${progress}%"></div>
        </div>

        <div class="budgets__footer">
          <span class="budgets__spent">$${spent.toFixed(2)} spent</span>
          <button class="budgets__delete" aria-label="Delete budget">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    `;
    })
    .join('');
}

function openBudgetModal() {
  if (!budgetsModal) return;
  budgetsModal.hidden = false;
}

function closeBudgetModal() {
  if (!budgetsModal) return;
  budgetsModal.hidden = true;
  budgetsForm?.reset();
}

export function initBudgetsModal() {
  if (!budgetsAddBtn || !budgetsModal) return;

  budgetsAddBtn.addEventListener('click', () => {
    if (guardDemo()) return;
    openBudgetModal();
  });

  budgetsModal.addEventListener('click', (e) => {
    const el = e.target instanceof HTMLElement ? e.target.closest('[data-close="true"]') : null;
    if (el) closeBudgetModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!budgetsModal.hidden && e.key === 'Escape') closeBudgetModal();
  });

  budgetsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (guardDemo()) return;

    const data = Object.fromEntries(new FormData(budgetsForm));

    const budgetCategory = data.category[0].toUpperCase() + data.category.slice(1);

    const budget = {
      id: `b_${Date.now()}`,
      category: budgetCategory,
      limit: parseFloat(data.limit),
      period: data.period,
    };

    appState.budgets.push(budget);
    saveAll();
    renderApp();
    showToast('Budget added!', 'success');

    closeBudgetModal();
  });
}
