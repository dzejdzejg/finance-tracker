export function calcTotals(transactions) {
  const totals = transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount) || 0;

      if (t.type === 'income') acc.income += amount;
      if (t.type === 'expense') acc.expenses += amount;
      return acc;
    },
    { income: 0, expenses: 0 },
  );

  return {
    income: totals.income,
    expenses: totals.expenses,
    balance: totals.income - totals.expenses,
  };
}
