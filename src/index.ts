import "dotenv/config";
import express from "express";
import cors from "cors";

import { sql } from "./db";
import { searchRecipes } from "./recipe-api";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use(cors());

type VersionRow = {
  version: string;
};

app.get("/api/recipe/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);

  try {
    const results = await searchRecipes(searchTerm, page);
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while searching for recipes" });
  }
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
