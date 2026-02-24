import { RIGID_DATA, CATEGORY_ICONS } from '../data/demoData.js';
import { dashboardHistoryList, dashboardHistoryEmpty } from '../dom.js';

function formatDateLabel(iso) {
  if (!iso) return 'No date';

  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function renderDashboardHistory() {
  const transactionItems = RIGID_DATA.transactions.slice(0, 6);

  if (!transactionItems.length) {
    dashboardHistoryList.innerHTML = '';
    dashboardHistoryEmpty.hidden = false;
    return;
  }

  dashboardHistoryEmpty.hidden = true;

  dashboardHistoryList.innerHTML = transactionItems
    .map((t) => {
      const isExpense = t.type === 'expense';
      const amountClass = isExpense ? 'history__amount--expenses' : 'history__amount--income';

      const iconClass = CATEGORY_ICONS?.[t.category] ?? 'fa-receipt';

      return `
      <li class="history__transaction">
        <span class="history__icon">
          <i class="fa-solid ${iconClass}"></i>
        </span>

        <span class="history__name">${t.category}</span>
        <span class="history__description-note">${t.description ?? ''}</span>

        <time class="history__date" datetime="${t.date ?? ''}">${formatDateLabel(t.date)}</time>

        <span class="history__amount ${amountClass}">$${Number(t.amount).toFixed(2)}</span>
      </li>
    `;
    })
    .join('');
}
