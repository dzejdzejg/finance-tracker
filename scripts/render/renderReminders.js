import { remindersList, remindersEmpty } from '../dom.js';

export function renderRemindersList(reminders = []) {
  const reminderItems = reminders;

  if (!reminderItems.length) {
    remindersList.innerHTML = '';
    remindersEmpty.hidden = false;
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
