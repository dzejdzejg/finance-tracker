import { DEMO_DATA, CATEGORY_ICONS } from '../data/demoData.js';
import { transactionsList, transactionsListEmpty, transactionsSearch, transactionsFilterType, transactionsFilterCategory, transactionsFilterFrom, transactionsFilterTo } from '../dom.js';

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

function getFilteredTransactions() {
  const typeSelected = norm(transactionsFilterType.value);
  const categorySelected = norm(transactionsFilterCategory.value);
  const q = norm(transactionsSearch.value);

  const fromValue = transactionsFilterFrom.value; // "YYYY-MM-DD" albo ""
  const toValue = transactionsFilterTo.value; // "YYYY-MM-DD" albo ""

  // start dnia od
  const fromTime = fromValue ? new Date(`${fromValue}T00:00:00`).getTime() : null;
  // koniec dnia do (żeby "to" było inkluzywne)
  const toTime = toValue ? new Date(`${toValue}T23:59:59.999`).getTime() : null;

  return DEMO_DATA.transactions.filter((t) => {
    const tType = norm(t.type);
    const tCategory = norm(t.category);
    const tDescr = norm(t.description);
    const tAmount = Number(t.amount ?? 0).toFixed(2);

    const tTime = t.date ? new Date(t.date).getTime() : null;

    const typeOk = typeSelected === 'all' || (typeSelected === 'income' && tType === 'income') || (typeSelected === 'expenses' && (tType === 'expense' || tType === 'expenses'));

    const categoryOk = categorySelected === 'all' || tCategory === categorySelected;

    const searchOk = q === '' || tCategory.includes(q) || tDescr.includes(q) || tType.includes(q) || tAmount.includes(q) || (t.date ? norm(t.date).includes(q) : false);

    // jeśli ustawiono from/to, a transakcja nie ma daty -> wypada z listy
    const fromOk = fromTime === null || (tTime !== null && tTime >= fromTime);
    const toOk = toTime === null || (tTime !== null && tTime <= toTime);

    return typeOk && categoryOk && searchOk && fromOk && toOk;
  });
}

export function renderTransactionsList() {
  const transactionItems = getFilteredTransactions().sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });

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

        <span class="transactions__description">${t.description}</span>
      </li>
    `;
    })
    .join('');
}

export function renderFilterCategoriesByType() {
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
    const type = transactionsFilterType.value;

    if (type === 'income') transactionsFilterCategory.innerHTML = incomeOptions;
    else if (type === 'expenses') transactionsFilterCategory.innerHTML = expensesOptions;
    else transactionsFilterCategory.innerHTML = allOptions;

    transactionsFilterCategory.value = 'all';

    renderTransactionsList();
  }

  updateCategoryOptions();
  renderTransactionsList();

  transactionsSearch.addEventListener('input', renderTransactionsList);
  transactionsFilterType.addEventListener('change', updateCategoryOptions);
  transactionsFilterCategory.addEventListener('change', renderTransactionsList);
  transactionsFilterFrom.addEventListener('change', renderTransactionsList);
  transactionsFilterTo.addEventListener('change', renderTransactionsList);
}
