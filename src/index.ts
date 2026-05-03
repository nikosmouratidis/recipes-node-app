import "dotenv/config";
import express from "express";
import cors from "cors";
import { sql } from "./db.js";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use(cors());

type VersionRow = {
  version: string;
};

app.get("/api/recipe/search", (_req, res) => {
  res.json({ message: "success" });
});

app.get("/api/db/health", async (_req, res, next) => {
  try {
    const [result] = (await sql`SELECT version()`) as VersionRow[];

    res.json({
      status: "ok",
      database: "neon",
      version: result?.version,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
