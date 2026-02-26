export const DEMO_DATA = {
  transactions: [
    { id: 't1', type: 'income', amount: 3200, date: '2026-02-07', category: 'Salary', description: 'Monthly Salary' },
    { id: 't2', type: 'income', amount: 200, date: '2026-02-14', category: 'Bonus', description: 'Work Bonus' },
    { id: 't3', type: 'expense', amount: 350, date: '2026-02-04', category: 'Bills', description: 'Electricity' },
    { id: 't4', type: 'expense', amount: 79.32, date: '2026-02-19', category: 'Food', description: '' },
    { id: 't5', type: 'income', amount: 730, date: '2026-02-23', category: 'Scholarship', description: '' },
    { id: 't6', type: 'expense', amount: 44.76, date: '2026-03-02', category: 'Entertainment', description: 'Friday Party' },
    { id: 't7', type: 'expense', amount: 7.4, date: '2026-03-04', category: 'Travel', description: 'Uber drive' },
    { id: 't8', type: 'income', amount: 150, date: '2026-03-10', category: 'Gift', description: 'Gift from friend for birthday' },
    { id: 't9', type: 'expense', amount: 200, date: '2026-03-11', category: 'Others', description: '' },
    { id: 't10', type: 'expense', amount: 320.99, date: '2026-03-13', category: 'Shopping', description: 'My dream shoes' },
    { id: 't11', type: 'expense', amount: 14.99, date: '2026-03-14', category: 'Others', description: 'Netflix payment' },
  ],
  budgets: [
    { id: 'b1', category: 'Food', limit: 300, period: 'month' },
    { id: 'b2', category: 'Entertainment', limit: 120, period: 'month' },
    { id: 'b3', category: 'Bills', limit: 350, period: 'month' },
    { id: 'b4', category: 'Others', limit: 100, period: 'month' },
  ],
  reminders: [
    { id: 'r1', name: 'Amazon Prime renews this month' },
    { id: 'r2', name: 'Netflix due in 3 days' },
    { id: 'r3', name: 'iCloud storage renewal next week' },
    { id: 'r4', name: 'Credit card payment due 18th' },
    { id: 'r5', name: 'Fuel budget check this week' },
  ],
  settings: {
    theme: 'light',
    animations: true,
  },
};

export const CATEGORY_ICONS = {
  // INCOME
  Salary: 'fa-briefcase',
  Bonus: 'fa-gift',
  BankInterest: 'fa-building-columns',
  Overtime: 'fa-clock',
  Scholarship: 'fa-graduation-cap',
  Gift: 'fa-cake-candles',
  Refund: 'fa-rotate-left',

  // EXPENSES
  Food: 'fa-utensils',
  Travel: 'fa-plane',
  Shopping: 'fa-bag-shopping',
  Bills: 'fa-file-invoice-dollar',
  Entertainment: 'fa-film',

  Others: 'fa-box',
};
