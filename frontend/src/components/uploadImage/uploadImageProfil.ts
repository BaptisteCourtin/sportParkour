import axiosInstanceImage from "@/lib/axiosInstanceImage";

export const uploadImageProfil = async (imageProfil: any): Promise<string> => {
  try {
    let imageProfilLien: string | null = null;

    const formData = new FormData();
    formData.append("file", imageProfil[0], imageProfil[0].name);

    const resultImage = await axiosInstanceImage.post("/uploadPhoto", formData);
    imageProfilLien = resultImage.data;

    return imageProfilLien;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
