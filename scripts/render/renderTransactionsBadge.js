import { navBadgeTransactions, navBadgeTransactionsMobile } from '../dom.js';

export function renderNavBadges(transactions = []) {
  const count = transactions.length;
  const hasCount = count > 0;
  const label = count > 99 ? '99+' : String(count);

  if (navBadgeTransactions) {
    navBadgeTransactions.hidden = !hasCount;
    navBadgeTransactions.textContent = label;
  }

  if (navBadgeTransactionsMobile) {
    navBadgeTransactionsMobile.hidden = !hasCount;
    navBadgeTransactionsMobile.textContent = label;
  }
}
