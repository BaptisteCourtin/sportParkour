import axiosInstanceImage from "@/lib/axiosInstanceImage";

import {
  ImageEpreuveCreateEntity,
  ImageParkourCreateEntity,
} from "@/types/graphql";

export const uploadImages = async (
  filesToUpload: File[],
  isMyCouverture: number
): Promise<ImageEpreuveCreateEntity[] | ImageParkourCreateEntity[]> => {
  try {
    const uploadPromises = filesToUpload.map(async (image, index) => {
      const formData = new FormData();
      formData.append("file", image, image.name);

      const resultImage = await axiosInstanceImage.post(
        "/uploadPhoto",
        formData
      );

      const imageLien =
        "https://storage.cloud.google.com" +
        resultImage.data.split("https://storage.googleapis.com")[1];

      let isCouv = false;
      if (isMyCouverture === index) {
        isCouv = true;
      }

      return {
        lien: imageLien,
        isCouverture: isCouv,
      };
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erreur lors de l'upload des images :", error);
    return [];
  }
};
