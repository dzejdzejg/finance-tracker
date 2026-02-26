export const settingsBtn = document.querySelector('.topbar__settings');
export const modal = document.querySelector('.modal');
export const modalOverlay = document.querySelector('.modal__overlay');
export const closeBtn = document.querySelector('.modal__close');

export const navLinks = document.querySelectorAll('[data-go]');
export const views = document.querySelectorAll('.view');

/* Charts */
export const categoryCtx = document.getElementById('chart-category')?.getContext('2d');
export const timeCtx = document.getElementById('chart-time')?.getContext('2d');

/* Transactions dashboard view */
export const dashboardHistoryList = document.querySelector('.history__list');
export const dashboardHistoryEmpty = document.querySelector('.history__empty');

/* Transactions view */
export const transactionsList = document.querySelector('.transactions__list');
export const transactionsListEmpty = document.querySelector('.transactions__empty');

/* Reminders */
export const remindersList = document.querySelector('.history__reminders');
export const remindersEmpty = document.querySelector('.history__empty-reminders');

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
