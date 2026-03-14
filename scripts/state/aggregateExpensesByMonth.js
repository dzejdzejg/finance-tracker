export function aggregateExpensesByMonth(transactions) {
  const year = new Date().getFullYear();
  const months = [];

  for (let monthIndex = 0; monthIndex <= 6; monthIndex++) {
    const d = new Date(year, monthIndex, 1);

    months.push({
      key: `${year}-${String(monthIndex + 1).padStart(2, '0')}`,
      label: d.toLocaleString('en-US', { month: 'short' }),
      total: 0,
    });
  }

  const indexByKey = months.reduce((acc, m, idx) => {
    acc[m.key] = idx;
    return acc;
  }, {});

  for (const t of transactions) {
    if (t.type !== 'expense') continue;

    const amount = Number(t.amount) || 0;
    const key = t.date?.slice(0, 7);

    const idx = indexByKey[key];
    if (idx === undefined) continue;

    months[idx].total += amount;
  }

  return {
    labels: months.map((m) => m.label),
    values: months.map((m) => Number(m.total.toFixed(2))),
  };
}
