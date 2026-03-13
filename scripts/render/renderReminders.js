import { remindersList, remindersEmpty } from '../dom.js';

export function renderRemindersList(reminders = []) {
  const reminderItems = reminders;

  if (!reminderItems.length) {
    remindersList.innerHTML = '';
    remindersEmpty.hidden = false;
    remindersEmpty.innerHTML = `
      <div class="history__empty-reminders-icon"><i class="fa-solid fa-bell"></i></div>
      <p class="history__empty-reminders-title">No reminders yet</p>
      <p class="history__empty-reminders-subtitle">Add a reminder to stay on track</p>
    `;
    return;
  }

  remindersEmpty.hidden = true;

  remindersList.innerHTML = reminderItems
    .map((r) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const due = new Date(r.dueDate + 'T00:00:00');
      const isOverdue = r.dueDate && due < now;
      const isDueToday = r.dueDate && due.toDateString() === now.toDateString();

      const dueDateLabel = r.dueDate
        ? `<time class="history__reminder-due 
        ${isOverdue ? 'history__reminder-due--overdue' : ''} 
        ${isDueToday ? 'history__reminder-due--today' : ''}">
          · ${new Date(r.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </time>`
        : '';

      return `
            <li class="history__reminder-item" data-id="${r.id}">
              <span class="history__reminder-icon">
                <i class="fa-regular fa-lightbulb"></i>
              </span>
              <span class="history__reminder-text" title="${r.name}">${r.name}</span>
              ${dueDateLabel}
              <button class="history__reminder-delete" aria-label="Delete reminder">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </li>
      `;
    })
    .join('');
}
