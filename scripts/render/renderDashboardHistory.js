import { DEMO_DATA, CATEGORY_ICONS } from '../data/demoData.js';
import { dashboardHistoryList, dashboardHistoryEmpty, historySortBtn } from '../dom.js';

let historySortOrder = 'newest';

function formatDateLabel(iso) {
  if (!iso) return 'No date';

  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function updateSortIcon() {
  if (!historySortBtn) return;

  const icon = historySortBtn.querySelector('i');
  if (!icon) return;

  icon.className = historySortOrder === 'newest' ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up';
}

function toggleHistorySort() {
  historySortOrder = historySortOrder === 'newest' ? 'oldest' : 'newest';
  updateSortIcon();
  renderDashboardHistory();
}

export function renderDashboardHistory() {
  const transactionItems = [...DEMO_DATA.transactions]
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;

      return historySortOrder === 'newest' ? bTime - aTime : aTime - bTime;
    })
    .slice(0, 6);

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
      <li class="history__transaction" data-id="${t.id}">
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

export function initDashboardHistorySort() {
  if (!historySortBtn) return;

  historySortBtn.addEventListener('click', toggleHistorySort);
}
