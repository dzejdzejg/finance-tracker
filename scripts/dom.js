export const settingsBtn = document.querySelector('.topbar__settings');
export const modal = document.querySelector('.modal');
export const modalOverlay = document.querySelector('.modal__overlay');
export const closeBtn = document.querySelector('.modal__close');

export const navLinks = document.querySelectorAll('[data-go]');
export const views = document.querySelectorAll('.view');

export const toastEl = document.querySelector('.toast');

/* Charts */
export const categoryCtx = document.getElementById('chart-category')?.getContext('2d');
export const timeCtx = document.getElementById('chart-time')?.getContext('2d');

/* Charts Analytics */
export const categoryCtxAnalytics = document.getElementById('analytics-category')?.getContext('2d');
export const timeCtxAnalytics = document.getElementById('analytics-month')?.getContext('2d');
export const cashflowCtxAnalytics = document.getElementById('analytics-cashflow')?.getContext('2d');
export const balanceCtxAnalytics = document.getElementById('analytics-balance')?.getContext('2d');

/* Transactions dashboard view */
export const incomeForm = document.querySelector('.operations__form--income');
export const expensesForm = document.querySelector('.operations__form--expenses');

export const reminderInput = document.querySelector('.history__input');
export const reminderAddBtn = document.querySelector('.history__add');

export const dashboardHistoryList = document.querySelector('.history__list');
export const dashboardHistoryEmpty = document.querySelector('.history__empty');

/* Transactions view */
export const transactionsList = document.querySelector('.transactions__list');
export const transactionsListEmpty = document.querySelector('.transactions__empty');

export const transactionsSearch = document.querySelector('.transactions__search');
export const transactionsFilterType = document.querySelector('.transactions__filter--type');
export const transactionsFilterCategory = document.querySelector('.transactions__filter--category');

export const transactionsFilterFrom = document.querySelector('.transactions__filter--from');
export const transactionsFilterTo = document.querySelector('.transactions__filter--to');

/* Reminders */
export const remindersList = document.querySelector('.history__reminders');
export const remindersEmpty = document.querySelector('.history__empty-reminders');

/* Budgets view */
export const budgetsList = document.querySelector('.budgets__list');
export const budgetsEmpty = document.querySelector('.budgets__empty');

export const budgetsAddBtn = document.querySelector('.budgets__add');
export const budgetsModal = document.querySelector('#budgetModal');
export const budgetsForm = document.querySelector('#budgetForm');

/* Amounts summary */
export const incomeAmount = document.querySelector('[data-summary="income"]');
export const expensesAmount = document.querySelector('[data-summary="expenses"]');
export const balanceAmount = document.querySelector('[data-summary="balance"]');

export const incomeTrendValue = document.querySelector('[data-trend="income"]');
export const expensesTrendValue = document.querySelector('[data-trend="expenses"]');
export const balanceTrendValue = document.querySelector('[data-trend="balance"]');

export const incomeTrendBox = document.querySelector('[data-trend-box="income"]');
export const expensesTrendBox = document.querySelector('[data-trend-box="expenses"]');
export const balanceTrendBox = document.querySelector('[data-trend-box="balance"]');
