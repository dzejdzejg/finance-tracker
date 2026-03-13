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
      return `
            <li class="history__reminder-item" data-id="${r.id}">
              <span class="history__reminder-icon">
                <i class="fa-regular fa-lightbulb"></i>
              </span>
              <span class="history__reminder-text" title="${r.name}">${r.name}</span>
              <button class="history__reminder-delete" aria-label="Delete reminder">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </li>
      `;
    })
    .join('');
}
