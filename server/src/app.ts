import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/auth.routes";
import petsRoutes from "./routes/pets.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pets", petsRoutes);
app.use("/api/user", userRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err: unknown) => console.error(`DB connection error: ${err}`));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Привет, это Express сервер!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
