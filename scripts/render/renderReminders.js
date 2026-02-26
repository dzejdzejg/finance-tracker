import { DEMO_DATA } from '../data/demoData.js';
import { remindersList, remindersEmpty } from '../dom.js';

export function renderRemindersList() {
  const reminderItems = DEMO_DATA.reminders;

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
              <span class="history__reminder-text">${r.name}</span>
            </li>
      `;
    })
    .join('');
}
