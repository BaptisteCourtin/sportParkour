// mise dans le google cloud des images et fichiers
import storage from "./configGoogleCloud"; // de là viens la config google cloud
const bucket = storage.bucket("parkour-images"); // le bucket avec les images dedans
import { LENGTH_LINK } from "../../variablesLength";

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadDocToGoogleCloud = (file: Express.Multer.File) =>
  new Promise((resolve, reject) => {
    let { originalname, buffer } = file;

    // nouveau nom
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10000); // rename un peu random
    const newName = (uniqueSuffix + "-" + originalname).substring(
      0,
      LENGTH_LINK
    ); // max length = 150

    // mise dans google cloud
    const blob = bucket.file(newName.replace(/ /g, "_")); // utilise le nouveau nom
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    // vérifie si c'est bon + renvoie le lien
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl); // renvoie le lien
      })
      .on("error", (error: any) => {
        console.error("Erreur d'upload:", error);
        reject(`Impossible d'upload l'image, qqch ne va pas`);
      })
      .end(buffer);
  });

export default uploadDocToGoogleCloud;
