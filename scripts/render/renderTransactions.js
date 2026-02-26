import { DEMO_DATA, CATEGORY_ICONS } from '../data/demoData.js';
import { transactionsList, transactionsListEmpty } from '../dom.js';

function formatDateLabel(iso) {
  if (!iso) return 'No date';

  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function renderTransactionsList() {
  const transactionItems = DEMO_DATA.transactions;

  if (!transactionItems.length) {
    transactionsList.innerHTML = '';
    transactionsListEmpty.hidden = false;
    return;
  }

  transactionsListEmpty.hidden = true;

  transactionsList.innerHTML = transactionItems
    .map((t) => {
      const isExpense = t.type === 'expense';
      const amountClass = isExpense ? 'transactions__amount--expense' : 'transactions__amount--income';

      const iconClass = CATEGORY_ICONS?.[t.category] ?? 'fa-receipt';

      return `
      <li class="transactions__item" data-id="${t.id}">
        <span class="transactions__icon"><i class="fa-solid ${iconClass}"></i></span>

        <div class="transactions__info">
          <span class="transactions__name">${t.category}</span>
          <time class="transactions__date" datetime="${t.date ?? ''}">${formatDateLabel(t.date)}</time>
        </div>

        <span class="transactions__amount ${amountClass}">$${Number(t.amount).toFixed(2)}</span>

        <div class="transactions__actions">
          <button class="transactions__edit" aria-label="Edit transaction">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="transactions__delete" aria-label="Delete transaction">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    `;
    })
    .join('');
}
