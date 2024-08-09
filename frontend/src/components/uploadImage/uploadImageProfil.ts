import axiosInstanceImage from "@/lib/axiosInstanceImage";

export const uploadImageProfil = async (imageProfil: any): Promise<string> => {
  try {
    let imageProfilLien: string | null = null;

    const formData = new FormData();
    formData.append("file", imageProfil[0], imageProfil[0].name);

    const resultImage = await axiosInstanceImage.post("/uploadPhoto", formData);
    imageProfilLien =
      "https://storage.cloud.google.com" +
      resultImage.data.split("https://storage.googleapis.com")[1];

    return imageProfilLien;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
