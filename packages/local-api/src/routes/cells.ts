import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

const router = express.Router();

export const cellsRouter = (filename: string, dir: string) => {
  const fullPath = path.join(dir, filename);

  router.use(express.json());

  router.get("/cells", async (req, res) => {
    try {
      const fileContent = await fs.readFile(fullPath, {
        encoding: "utf-8",
      });

      res.send(JSON.parse(fileContent));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");

        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
