import { categoryCtx, timeCtx } from './dom.js';

let categoryChart = null;
let timeChart = null;

export function initCharts() {
  if (categoryCtx && !categoryChart) {
    categoryChart = new Chart(categoryCtx, {
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
    });
  }

  if (timeCtx && !timeChart) {
    timeChart = new Chart(timeCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{ label: 'Spending Over Month', data: [] }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { bottom: 10, left: 8, right: 8, top: 6 } },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              padding: 12,
              font: { size: 11, weight: '700', family: 'Nunito' },
            },
          },
        },
        scales: {
          x: { offset: true, grid: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 7, padding: 6, font: { size: 11 } } },
          y: { beginAtZero: true, ticks: { callback: (value) => value + ' $' } },
        },
      },
    });
  }
}

export function updateCategoryChart(labels, values) {
  if (!categoryChart) return;
  categoryChart.data.labels = labels;
  categoryChart.data.datasets[0].data = values;
  categoryChart.update();
}

export function updateTimeChart(labels, values) {
  if (!timeChart) return;
  timeChart.data.labels = labels;
  timeChart.data.datasets[0].data = values;
  timeChart.update();
}
