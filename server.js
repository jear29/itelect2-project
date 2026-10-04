import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {
  console.error("JWT_SECRET in .env must be at least 32 characters.");
  process.exit(1);
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Last, and after every route: Express only reaches it when something threw.
app.use(errorHandler);
app.listen(PORT, () => {

  console.log(`Running on port ${PORT} with no JWT_SECRET error`);

});
