export function aggregateCashflowByMonth(transactions) {
  const year = new Date().getFullYear();
  const months = [];

  for (let monthIndex = 0; monthIndex <= 6; monthIndex++) {
    const d = new Date(year, monthIndex, 1);

    months.push({
      key: `${year}-${String(monthIndex + 1).padStart(2, '0')}`,
      label: d.toLocaleString('en-US', { month: 'short' }),
      income: 0,
      expenses: 0,
    });
  }

  const indexByKey = months.reduce((acc, m, idx) => {
    acc[m.key] = idx;
    return acc;
  }, {});

  for (const t of transactions) {
    const key = t.date?.slice(0, 7);
    const idx = indexByKey[key];
    if (idx === undefined) continue;

    const amount = Number(t.amount) || 0;

    if (t.type === 'income') {
      months[idx].income += amount;
    }

    if (t.type === 'expense') {
      months[idx].expenses += amount;
    }
  }

  return {
    labels: months.map((m) => m.label),
    income: months.map((m) => Number(m.income.toFixed(2))),
    expenses: months.map((m) => Number(m.expenses.toFixed(2))),
  };
}
