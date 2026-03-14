import { CATEGORY_ICONS } from '../data/demoData.js';
import {
  transactionsList,
  transactionsListEmpty,
  transactionsSearch,
  transactionsFilterType,
  transactionsFilterCategory,
  transactionsFilterFrom,
  transactionsFilterTo,
  transactionsLoadMore,
} from '../dom.js';

function formatDateLabel(iso) {
  if (!iso) return 'No date';

  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function norm(v) {
  return String(v ?? '')
    .trim()
    .toLowerCase();
}

let _transactions = [];
let _visibleCount = 10;

function getFilteredTransactions() {
  const typeSelected = norm(transactionsFilterType.value);
  const categorySelected = norm(transactionsFilterCategory.value);
  const q = norm(transactionsSearch.value);

  const fromValue = transactionsFilterFrom.value;
  const toValue = transactionsFilterTo.value;

  const fromTime = fromValue ? new Date(`${fromValue}T00:00:00`).getTime() : null;

  const toTime = toValue ? new Date(`${toValue}T23:59:59.999`).getTime() : null;

  return _transactions.filter((t) => {
    const tType = norm(t.type);
    const tCategory = norm(t.category);
    const tDescr = norm(t.description);
    const tAmount = Number(t.amount ?? 0).toFixed(2);

    const tTime = t.date ? new Date(t.date).getTime() : null;

    const typeOk = typeSelected === 'all' || (typeSelected === 'income' && tType === 'income') || (typeSelected === 'expenses' && (tType === 'expense' || tType === 'expenses'));

    const categoryOk = categorySelected === 'all' || tCategory === categorySelected;

    const searchOk = q === '' || tCategory.includes(q) || tDescr.includes(q) || tType.includes(q) || tAmount.includes(q) || (t.date ? norm(t.date).includes(q) : false);

    const fromOk = fromTime === null || (tTime !== null && tTime >= fromTime);
    const toOk = toTime === null || (tTime !== null && tTime <= toTime);

    return typeOk && categoryOk && searchOk && fromOk && toOk;
  });
}

export function renderEditForm(id) {
  const t = _transactions.find((t) => t.id === id);
  if (!t) return;

  const item = transactionsList.querySelector(`[data-id="${id}"]`);
  if (!item) return;

  item.innerHTML = `
    <div class="transactions__edit-form">
      <input class="transactions__edit-input" type="text" name="description" value="${t.description ?? ''}" placeholder="Description" />
      <input class="transactions__edit-input" type="number" name="amount" value="${t.amount}" placeholder="Amount" min="0" step="0.01" />
      <input class="transactions__edit-input" type="date" name="date" value="${t.date ?? ''}" />
      <div class="transactions__edit-actions">
        <button class="transactions__edit-save" data-id="${id}">Save</button>
        <button class="transactions__edit-cancel" data-id="${id}">Cancel</button>
      </div>
    </div>
  `;

  item.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        item.querySelector('.transactions__edit-save')?.click();
      }
    },
    { once: true },
  );
}

export function renderTransactionsList(transactions) {
  if (Array.isArray(transactions)) _transactions = transactions;

  const transactionItems = getFilteredTransactions().sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });

  if (!transactionItems.length) {
    transactionsList.innerHTML = '';
    transactionsListEmpty.hidden = false;
    transactionsLoadMore.hidden = true;
    transactionsListEmpty.innerHTML = `
      <div class="transactions__empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
      <p class="transactions__empty-title">No transactions found</p>
      <p class="transactions__empty-subtitle">Try adjusting your filters</p>
    `;
    return;
  }

  transactionsListEmpty.hidden = true;

  const visible = transactionItems.slice(0, _visibleCount);
  const hasMore = transactionItems.length > _visibleCount;

  transactionsList.innerHTML = visible
    .map((t, i) => {
      const isExpense = t.type === 'expense';
      const amountClass = isExpense ? 'transactions__amount--expense' : 'transactions__amount--income';
      const iconClass = CATEGORY_ICONS?.[t.category] ?? 'fa-receipt';

      return `
      <li class="transactions__item transaction__item--animate" data-id="${t.id}" style="animation-delay: ${i * 0.05}s">
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

        <span class="transactions__description">${t.description}</span>
      </li>
    `;
    })
    .join('');

  if (hasMore) {
    transactionsLoadMore.textContent = `Load more (${transactionItems.length - _visibleCount} remaining)`;
    transactionsLoadMore.hidden = false;
    transactionsLoadMore.onclick = () => {
      _visibleCount += 10;
      renderTransactionsList();
    };
  } else {
    transactionsLoadMore.hidden = true;
  }
}

let _filtersInitialized = false;
let _suppressCategoryChange = false;

export function renderFilterCategoriesByType(transactions) {
  if (Array.isArray(transactions)) _transactions = transactions;

  const allOptions = `
    <option value="all">All categories</option>
    <optgroup label="Income">
      <option value="salary">Salary</option>
      <option value="bonus">Bonus</option>
      <option value="bank-interest">Bank Interest</option>
      <option value="overtime">Overtime</option>
      <option value="scholarship">Scholarship</option>
      <option value="gift">Gift</option>
      <option value="refund">Refund</option>
    </optgroup>
    <optgroup label="Expenses">
      <option value="food">Food</option>
      <option value="travel">Travel</option>
      <option value="shopping">Shopping</option>
      <option value="bills">Bills</option>
      <option value="entertainment">Entertainment</option>
    </optgroup>
    <option value="others">Others</option>`;

  const incomeOptions = `
    <option value="all">Income categories</option>
    <option value="salary">Salary</option>
    <option value="bonus">Bonus</option>
    <option value="bank-interest">Bank Interest</option>
    <option value="overtime">Overtime</option>
    <option value="scholarship">Scholarship</option>
    <option value="gift">Gift</option>
    <option value="refund">Refund</option>
    `;

  const expensesOptions = `
    <option value="all">Expenses categories</option>
    <option value="food">Food</option>
    <option value="travel">Travel</option>
    <option value="shopping">Shopping</option>
    <option value="bills">Bills</option>
    <option value="entertainment">Entertainment</option>
    `;

  function updateCategoryOptions() {
    _visibleCount = 10;
    _suppressCategoryChange = true;

    const type = transactionsFilterType.value;

    if (type === 'income') transactionsFilterCategory.innerHTML = incomeOptions;
    else if (type === 'expenses') transactionsFilterCategory.innerHTML = expensesOptions;
    else transactionsFilterCategory.innerHTML = allOptions;

    transactionsFilterCategory.value = 'all';
    _suppressCategoryChange = false;

    renderTransactionsList();
  }

  updateCategoryOptions();

  if (_filtersInitialized) return;
  _filtersInitialized = true;

  transactionsSearch.addEventListener('input', () => {
    _visibleCount = 10;
    renderTransactionsList();
  });
  transactionsFilterType.addEventListener('change', () => {
    _visibleCount = 10;
    updateCategoryOptions();
  });
  transactionsFilterCategory.addEventListener('change', () => {
    if (_suppressCategoryChange) return;
    _visibleCount = 10;
    renderTransactionsList();
  });
  transactionsFilterFrom.addEventListener('change', () => {
    _visibleCount = 10;
    renderTransactionsList();
  });
  transactionsFilterTo.addEventListener('change', () => {
    _visibleCount = 10;
    renderTransactionsList();
  });
}
