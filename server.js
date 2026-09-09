import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing from .env -- the API cannot sign tokens.");
  process.exit(1);
}

app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", router);

app.listen(PORT, () => console.log(`Running on port ${PORT} with no JWT_SECRET error`));

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'That email is already registered' });
  }
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});