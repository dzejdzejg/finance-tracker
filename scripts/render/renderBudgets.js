import { budgetsList, budgetsEmpty, budgetsAddBtn, budgetsModal, budgetsForm } from '../dom.js';
import { guardDemo } from '../state/controller.js';

export function renderBudgets(budgets = []) {
  const budgetsItems = budgets;

  if (!budgetsItems.length) {
    budgetsList.innerHTML = '';
    budgetsEmpty.hidden = false;
    return;
  }

  budgetsEmpty.hidden = true;

  budgetsList.innerHTML = budgetsItems
    .map((b) => {
      return `
      <li class="budgets__item">
        <div class="budgets__info">
          <span class="budgets__category">${b.category}</span>
          <span class="budgets__limit">$${b.limit} / ${b.period}</span>
        </div>

        <div class="budgets__progress">
          <div class="budgets__progress-bar" style="width: ${b.progress}%"></div>
        </div>

        <span class="budgets__spent">$195 spent</span>
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

    closeBudgetModal();
  });
}
