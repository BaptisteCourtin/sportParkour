// config pour le cloud => fichiers pdf et images
const Cloud = require("@google-cloud/storage");
import path from "path";
require("dotenv").config();

const serviceKey = path.join(__dirname, "../google.cloud-key.json"); // fichier de l'objet

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCS_ID,
});

export default storage;
