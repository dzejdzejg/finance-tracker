import './chart.js';
import './crypto.js';
import './events.js';
import './render/renderApp.js';
import { initApp } from './render/renderApp.js';
import { initController } from './state/controller.js';

initController();
initApp();
