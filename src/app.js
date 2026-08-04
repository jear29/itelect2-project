// app.js - Main application entry point
import { formatDate, validateTask, mergeTaskUpdate, TaskValidationError, createTask } from './utils.js';
import { fetchSampleUsers, fetchSampleUsersPromise } from './api.js';

console.log('Server starting...');

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask({ title: 'Title', dueDate: new Date("2026-07-22") }));

console.log(mergeTaskUpdate({ title: 'Title' }, { title: 'New Title' }));

// calling the fetchSampleUsersPromise example
const usersPromise = await fetchSampleUsersPromise();
console.log(usersPromise);

console.log(); 

// call fetchSampleUsers and createTask
async function main() {
    try {
        const users = await fetchSampleUsers();

        const sampleUsers = users.map(({ id, name, email }) => ({
            id,
            name,
            email
        }));

        console.log(sampleUsers);

        const task = createTask({
            title: "New Task",
            dueDate: new Date("2026-07-22")
        });

        console.log(task);
    } catch (err) {
        console.error(err);
    }
}
main();