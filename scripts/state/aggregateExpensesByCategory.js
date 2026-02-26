export function aggregateExpensesByCategory(transactions) {
  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Others'];

  const totalsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = 0;
    return acc;
  }, {});

  for (const t of transactions) {
    if (t.type !== 'expense') continue;

    const amount = Number(t.amount) || 0;
    const cat = t.category;

    if (totalsByCategory[cat] !== undefined) {
      totalsByCategory[cat] += amount;
    } else {
      totalsByCategory.Others += amount;
    }
  }

  const labels = categories;
  const values = labels.map((l) => totalsByCategory[l]);

  return { labels, values };
}
