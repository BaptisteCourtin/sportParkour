import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
import uploadDocToGoogleCloud from "./service";

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // => 5Mo
  },
});

// put profile picture in cloud
app.post(
  "/uploadPhotoProfil",
  multerMid.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file;
      const result = await uploadDocToGoogleCloud(file as Express.Multer.File);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Une erreur est survenue lors de l'upload" });
    }
  }
);

app.listen(3002, () => {
  console.log("Service d'images lancé sur http://localhost:3002");
});
