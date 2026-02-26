export const chartCategory = document.getElementById('chart-category').getContext('2d');
export const chartTime = document.getElementById('chart-time').getContext('2d');

export const settingsBtn = document.querySelector('.topbar__settings');
export const modal = document.querySelector('.modal');
export const modalOverlay = document.querySelector('.modal__overlay');
export const closeBtn = document.querySelector('.modal__close');

export const navLinks = document.querySelectorAll('[data-go]');
export const views = document.querySelectorAll('.view');

/* Transactions dashboard view */
export const dashboardHistoryList = document.querySelector('.history__list');
export const dashboardHistoryEmpty = document.querySelector('.history__empty');

/* Transactions view */
export const transactionsList = document.querySelector('.transactions__list');
export const transactionsListEmpty = document.querySelector('.transactions__empty');

/* Reminders */
export const remindersList = document.querySelector('.history__reminders');
export const remindersEmpty = document.querySelector('.history__empty-reminders');
