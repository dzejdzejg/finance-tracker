export const DEMO_DATA = {
  transactions: [
    // JAN 2026
    { id: 't1', type: 'income', amount: 3100, date: '2026-01-05', category: 'Salary', description: 'Monthly Salary' },
    { id: 't2', type: 'expense', amount: 420, date: '2026-01-06', category: 'Bills', description: 'Rent part' },
    { id: 't3', type: 'expense', amount: 95.5, date: '2026-01-10', category: 'Food', description: 'Groceries' },
    { id: 't4', type: 'expense', amount: 60, date: '2026-01-15', category: 'Travel', description: 'Train tickets' },
    { id: 't5', type: 'expense', amount: 180, date: '2026-01-22', category: 'Shopping', description: 'Winter jacket' },

    // FEB 2026
    { id: 't6', type: 'expense', amount: 350, date: '2026-02-04', category: 'Bills', description: 'Electricity' },
    { id: 't7', type: 'income', amount: 3200, date: '2026-02-07', category: 'Salary', description: 'Monthly Salary' },
    { id: 't8', type: 'income', amount: 200, date: '2026-02-14', category: 'Bonus', description: 'Work Bonus' },
    { id: 't9', type: 'expense', amount: 79.32, date: '2026-02-19', category: 'Food', description: '' },
    { id: 't10', type: 'income', amount: 730, date: '2026-02-23', category: 'Scholarship', description: '' },

    // MAR 2026
    { id: 't11', type: 'expense', amount: 44.76, date: '2026-03-02', category: 'Entertainment', description: 'Friday Party' },
    { id: 't12', type: 'expense', amount: 7.4, date: '2026-03-04', category: 'Travel', description: 'Uber drive' },
    { id: 't13', type: 'income', amount: 3200, date: '2026-03-05', category: 'Salary', description: 'Monthly Salary' },
    { id: 't14', type: 'income', amount: 150, date: '2026-03-10', category: 'Gift', description: 'Gift from friend for birthday' },
    { id: 't15', type: 'expense', amount: 200, date: '2026-03-11', category: 'Others', description: '' },
    { id: 't16', type: 'expense', amount: 320.99, date: '2026-03-13', category: 'Shopping', description: 'My dream shoes' },
    { id: 't17', type: 'expense', amount: 14.99, date: '2026-03-14', category: 'Others', description: 'Netflix payment' },

    // APR 2026
    { id: 't18', type: 'income', amount: 3200, date: '2026-04-05', category: 'Salary', description: 'Monthly Salary' },
    { id: 't19', type: 'expense', amount: 390, date: '2026-04-07', category: 'Bills', description: 'Utilities + Internet' },
    { id: 't20', type: 'expense', amount: 120.75, date: '2026-04-12', category: 'Food', description: 'Weekly groceries' },
    { id: 't21', type: 'expense', amount: 85, date: '2026-04-18', category: 'Entertainment', description: 'Concert ticket' },
    { id: 't22', type: 'expense', amount: 240, date: '2026-04-21', category: 'Others', description: 'Car service' },

    // MAY 2026
    { id: 't23', type: 'income', amount: 3200, date: '2026-05-05', category: 'Salary', description: 'Monthly Salary' },
    { id: 't24', type: 'expense', amount: 410, date: '2026-05-06', category: 'Bills', description: 'Rent + utilities' },
    { id: 't25', type: 'expense', amount: 140.2, date: '2026-05-11', category: 'Food', description: 'Groceries + snacks' },
    { id: 't26', type: 'expense', amount: 65.5, date: '2026-05-16', category: 'Travel', description: 'Weekend trip tickets' },
    { id: 't27', type: 'expense', amount: 230, date: '2026-05-22', category: 'Shopping', description: 'New headphones' },
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
