import express from 'express';
import db from "../models/index.cjs";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";
const { Task, User, Sequelize } = db;
const { Op } = Sequelize;

const router = express.Router();

const TASK_FIELDS = [
    "title", "dueDate","completed", "userId",
];

// GET /api/tasks -- returns the mock task array as JSON
router.get("/tasks", async (req, res) => {
    const { search } = req.query;

    const where = {};

    if (search) {
    // Sequelize sends search as a VALUE, never as SQL
        where.title = { [Op.iLike]: `%${search}%` };
    }

    const tasks = await Task.findAll({
        where,
        include: User,
        order: [["id", "ASC"]],
    });
    res.json(tasks);
});

// GET /api/tasks/:id -- returns single matching task as JSON or 404
router.get("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) {
    return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

// GET /api/users -- returns transformed { id, name, email } cached user list
router.get("/users", async (req, res) => {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.json(users);
});

router.post("/tasks", verifyToken, async (req, res) => {
    const { title, dueDate } = req.body;
    if (!title || !dueDate) {
        return res.status(400).json({ error: "title and dueDate are required" });
    }
    const task = await Task.create(req.body, {fields: TASK_FIELDS});
    res.status(201).json(task);
});

router.put("/tasks/:id", verifyToken, async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
    return res.status(404).json({ error: "Task not found" });
    }
    await task.update(req.body, {fields: TASK_FIELDS});
    res.json(task);
});

router.delete("/tasks/:id", verifyToken, requireRole("admin"), async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Deleted", task, deletedBy: req.user.email });
});

export default router;