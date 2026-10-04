import db from "../models/index.cjs";

const { User, Book } = db;

// GET /api/users

export async function listUsers(req, res) {

  const users = await User.findAll({

    include: Book,

    order: [["id", "ASC"]],

  });

  res.json(users);

}
