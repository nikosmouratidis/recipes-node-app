import express from "express";
import cors from "cors";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/recipe/search", (_req, res) => {
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
