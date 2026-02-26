import { aggregateCashflowByMonth } from './aggregateCashflowByMonth.js';

export function aggregateBalanceGrowth(transactions, startingBalance = 0) {
  const { labels, income, expenses } = aggregateCashflowByMonth(transactions);

  const values = [];
  let balance = Number(startingBalance) || 0;

  for (let i = 0; i < labels.length; i++) {
    balance += (Number(income[i]) || 0) - (Number(expenses[i]) || 0);
    values.push(Number(balance.toFixed(2)));
  }

  return { labels, values };
}
