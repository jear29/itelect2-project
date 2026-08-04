export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = (task  = {}) => {
    const { title, dueDate } = task;
    return Boolean(title && dueDate);
};

export const mergeTaskUpdate = (original, ...updates) => {
    return updates.reduce((merged, update) => ({ ...merged, ...update }), { ...original });
};

export class TaskValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskValidationError";
    }
}

export const createTask = (taskData) => {
    if (!validateTask(taskData)) {
        throw new TaskValidationError("Invalid task data");
    }

    return {
        id: Date.now(),
        completed: false,
        ...taskData
    };
};

export const tasks = [
    { id: 1, title: "Learn Node.js", completed: true, dueDate: "2026-07-29" },
    { id: 2, title: "Build Express API", completed: false, dueDate: "2026-08-04" },
    { id: 3, title: "Complete GT5 Assignment", completed: false, dueDate: "2026-08-05" }
];