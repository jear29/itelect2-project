import express from 'express';
import { tasks } from '../src/utils.js';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

// GET /api/tasks -- returns the mock task array as JSON
router.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /api/tasks/:id -- returns single matching task as JSON or 404
router.get('/tasks/:id', (req, res) => {
    console.log(req.params.id); // URL segment
    console.log(req.query.sort); // ?sort=asc
    console.log(req.body); // JSON payload

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id.toString() === req.params.id) {
            return res.status(200).json(tasks[i]);
        }
    }
    res.status(404).json({ error: "Task not found" });
});

// GET /api/users -- returns transformed { id, name, email } cached user list
router.get('/users', async (req, res) => {
    const users = await fetchSampleUsers();
    res.status(200).json(users);
});

export default router;