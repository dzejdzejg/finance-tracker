import { categoryCtx, timeCtx, categoryCtxAnalytics, timeCtxAnalytics, cashflowCtxAnalytics, balanceCtxAnalytics } from './dom.js';

let categoryChart = null;
let timeChart = null;

let categoryChartAnalytics = null;
let timeChartAnalytics = null;

let cashflowChartAnalytics = null;
let balanceChartAnalytics = null;

function getCategoryConfig() {
  return {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          label: '$',
          data: [],
          backgroundColor: ['#4F46E5', '#22C55E', '#F97316', '#c05b5b', '#06B6D4', '#dcea11'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      layout: { padding: { top: 6, bottom: 40, right: 30 } },
      radius: '90%',
      plugins: {
        legend: {
          position: 'right',
          align: 'center',
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            padding: 20,
            font: { size: 16, weight: '800', family: 'Nunito' },
          },
        },
      },
    },
  };
}

function getTimeConfig() {
  return {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{ label: 'Spending Over Month', data: [] }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: 20, left: 8, right: 8, top: 6 } },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 14, weight: '700', family: 'Nunito' },
          },
        },
      },
      scales: {
        x: { offset: true, grid: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 7, padding: 6, font: { size: 11 } } },
        y: { beginAtZero: true, ticks: { callback: (value) => value + ' $' } },
      },
    },
  };
}

function getCashflowConfig() {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Income',
          data: [],
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Expenses',
          data: [],
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: 22, left: 8, right: 8, top: 6 } },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 14, weight: '700', family: 'Nunito' },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { padding: 6, font: { size: 11 } } },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value + ' $',
          },
        },
      },
    },
  };
}

function getBalanceConfig() {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Balance',
          data: [],
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: 20, left: 8, right: 8, top: 6 } },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 14, weight: '700', family: 'Nunito' },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { padding: 6, font: { size: 11 } } },
        y: {
          ticks: {
            callback: (value) => value + ' $',
          },
        },
      },
    },
  };
}

export function initCharts() {
  if (categoryCtx && !categoryChart) {
    categoryChart = new Chart(categoryCtx, getCategoryConfig());
  }

  if (timeCtx && !timeChart) {
    timeChart = new Chart(timeCtx, getTimeConfig());
  }

  if (categoryCtxAnalytics && !categoryChartAnalytics) {
    categoryChartAnalytics = new Chart(categoryCtxAnalytics, getCategoryConfig());
  }

  if (timeCtxAnalytics && !timeChartAnalytics) {
    timeChartAnalytics = new Chart(timeCtxAnalytics, getTimeConfig());
  }

  if (cashflowCtxAnalytics && !cashflowChartAnalytics) {
    cashflowChartAnalytics = new Chart(cashflowCtxAnalytics, getCashflowConfig());
  }

  if (balanceCtxAnalytics && !balanceChartAnalytics) {
    balanceChartAnalytics = new Chart(balanceCtxAnalytics, getBalanceConfig());
  }
}

export function updateCategoryChart(labels, values) {
  if (categoryChart) {
    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = values;
    categoryChart.update();
  }

  if (categoryChartAnalytics) {
    categoryChartAnalytics.data.labels = labels;
    categoryChartAnalytics.data.datasets[0].data = values;
    categoryChartAnalytics.update();
  }
}

export function updateTimeChart(labels, values) {
  if (timeChart) {
    timeChart.data.labels = labels;
    timeChart.data.datasets[0].data = values;
    timeChart.update();
  }

  if (timeChartAnalytics) {
    timeChartAnalytics.data.labels = labels;
    timeChartAnalytics.data.datasets[0].data = values;
    timeChartAnalytics.update();
  }
}

export function updateCashflowChart(labels, incomeValues, expenseValues) {
  if (!cashflowChartAnalytics) return;

  cashflowChartAnalytics.data.labels = labels;
  cashflowChartAnalytics.data.datasets[0].data = incomeValues;
  cashflowChartAnalytics.data.datasets[1].data = expenseValues;
  cashflowChartAnalytics.update();
}

export function updateBalanceChart(labels, values) {
  if (!balanceChartAnalytics) return;

  balanceChartAnalytics.data.labels = labels;
  balanceChartAnalytics.data.datasets[0].data = values;
  balanceChartAnalytics.update();
}
