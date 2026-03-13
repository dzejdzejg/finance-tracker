export const themeBtn = document.querySelector('.topbar__theme');
export const settingsBtn = document.querySelector('.topbar__settings');

export const modal = document.querySelector('.modal');
export const modalOverlay = document.querySelector('.modal__overlay');
export const closeBtn = document.querySelector('.modal__close');
export const startWithEmptyBtn = document.querySelector('.modal__demo-btn');
export const topbarBadge = document.querySelector('.topbar__badge');

export const themeToggle = document.getElementById('toggle-theme');
export const animationsToggle = document.getElementById('toggle-animations');
export const exportJSONBtn = document.querySelector('.modal__setting-download-json');
export const exportCSVBtn = document.querySelector('.modal__setting-download-csv');

export const navLinks = document.querySelectorAll('[data-go]');
export const views = document.querySelectorAll('.view');

export const newsletterInput = document.querySelector('.sidebar__input');
export const newsletterBtn = document.querySelector('.sidebar__btn');

export const toastEl = document.querySelector('.toast');

/* Charts */
export const categoryCtx = document.getElementById('chart-category')?.getContext('2d');
export const timeCtx = document.getElementById('chart-time')?.getContext('2d');

export const chartsCardsWrapper = document.querySelector('.charts__cards');
export const chartsEmpty = document.querySelector('.charts__empty');

/* Charts Analytics */
export const categoryCtxAnalytics = document.getElementById('analytics-category')?.getContext('2d');
export const timeCtxAnalytics = document.getElementById('analytics-month')?.getContext('2d');
export const cashflowCtxAnalytics = document.getElementById('analytics-cashflow')?.getContext('2d');
export const balanceCtxAnalytics = document.getElementById('analytics-balance')?.getContext('2d');

export const analyticsGrid = document.querySelector('.analytics__grid');
export const analyticsEmpty = document.querySelector('.analytics__empty');

/* Crypto */
export const cryptoList = document.querySelector('.crypto__list');
export const cryptoListSidebar = document.querySelector('.sidebar__crypto-list');

export const cryptoLoadingSidebar = document.querySelector('.sidebar__crypto-loading');
export const cryptoEmptySidebar = document.querySelector('.sidebar__crypto-empty');

/* Transactions dashboard view */
export const incomeForm = document.querySelector('.operations__form--income');
export const expensesForm = document.querySelector('.operations__form--expenses');

export const reminderInput = document.querySelector('.history__input');
export const reminderAddBtn = document.querySelector('.history__add');

export const dashboardHistoryList = document.querySelector('.history__list');
export const dashboardHistoryEmpty = document.querySelector('.history__empty');
export const historySortBtn = document.querySelector('.history__sort');

/* Transactions view */
export const transactionsList = document.querySelector('.transactions__list');
export const transactionsListEmpty = document.querySelector('.transactions__empty');

export const transactionsSearch = document.querySelector('.transactions__search');
export const transactionsFilterType = document.querySelector('.transactions__filter--type');
export const transactionsFilterCategory = document.querySelector('.transactions__filter--category');

export const transactionsFilterFrom = document.querySelector('.transactions__filter--from');
export const transactionsFilterTo = document.querySelector('.transactions__filter--to');

export const transactionsLoadMore = document.querySelector('.transactions__load-more');

/* Reminders */
export const remindersList = document.querySelector('.history__reminders');
export const remindersEmpty = document.querySelector('.history__empty-reminders');
export const dueDateInput = document.querySelector('.history__input-date');

/* Analytics view */
export const analyticsRange = document.querySelector('.analytics__range');
export const analyticsCategory = document.querySelector('.analytics__category');

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

/* Descriptions */
export const incomeDesc = document.getElementById('income-description');
export const expenseDesc = document.getElementById('expenses-description');

/* Transactions badge */
export const navBadgeTransactions = document.getElementById('nav-badge-transactions');
export const navBadgeTransactionsMobile = document.getElementById('nav-badge-transactions-mobile');
