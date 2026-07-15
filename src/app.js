// app.js - Main application entry point
import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

console.log('Server starting...');

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask({ title: 'Title', dueDate: new Date("2026-07-22") }));

console.log(mergeTaskUpdate({ title: 'Title' }, { title: 'New Title' }));