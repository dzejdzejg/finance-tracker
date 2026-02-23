import { chartCategory, chartTime } from './dom.js';

new Chart(chartCategory, {
  type: 'doughnut',
  data: {
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Housing', 'Other'],
    datasets: [
      {
        label: '# of Votes',
        data: [320, 190, 328, 253, 680, 354],
        backgroundColor: ['#4F46E5', '#22C55E', '#F97316', '#c05b5b', '#06B6D4', '#dcea11', '#64748B'],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    layout: {
      padding: { top: 6, bottom: 40, right: 30 },
    },
    radius: '90%',
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
          font: {
            size: 16,
            weight: '800',
            family: 'Nunito',
          },
        },
      },
    },
  },
});

new Chart(chartTime, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Spending',
        data: [1200, 950, 1430, 800, 1670, 1100, 980],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { bottom: 10, left: 8, right: 8, top: 6 },
    },
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
      x: {
        offset: true,
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
          padding: 6,
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + ' $',
        },
      },
    },
  },
});
