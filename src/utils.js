export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = (task  = {}) => {
    const { title, dueDate } = task;
    return Boolean(title && dueDate);
};

export const mergeTaskUpdate = (original, ...updates) => {
    return updates.reduce((merged, update) => ({ ...merged, ...update }), { ...original });
};
