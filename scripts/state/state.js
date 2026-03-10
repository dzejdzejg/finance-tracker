export const appState = {
  mode: 'demo',
  transactions: [],
  budgets: [],
  reminders: [],
};

export const isDemo = () => appState.mode === 'demo';