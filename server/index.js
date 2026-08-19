import express from "express";
import cors from "cors";
import { calculateLove } from "./loveCalculator.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/calculate", (req, res) => {
  try {
    const { nameA, nameB } = req.body ?? {};
    const result = calculateLove(nameA, nameB);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Love Calculator API listening on http://localhost:${PORT}`);
});
