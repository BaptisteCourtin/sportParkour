import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  EpreuveCreateEntity,
  ImageEpreuveCreateEntity,
  useCreateEpreuveMutation,
} from "@/types/graphql";

import TextField from "@mui/material/TextField";

import { toast } from "react-hot-toast";
import axiosInstanceImage from "@/lib/axiosInstanceImage";

let createEpreuveSchema = object({
  title: string()
    .max(50, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
  description: string().max(
    1000,
    "Pas besoin d'avoir une description aussi long"
  ),
  easyToDo: string().max(250, "Pas besoin d'avoir une description aussi long"),
  mediumToDo: string().max(
    250,
    "Pas besoin d'avoir une description aussi long"
  ),
  hardToDo: string().max(250, "Pas besoin d'avoir une description aussi long"),
  videoLink: string().max(150, "max 150 carcatères, normalement ça suffit"),
});

const createEpreuve = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEpreuveSchema),
  });

  const [createEpreuve, { data, loading, error }] = useCreateEpreuveMutation({
    fetchPolicy: "no-cache",
  });

  const uploadImages = async (): Promise<ImageEpreuveCreateEntity[]> => {
    try {
      const uploadPromises = filesToUpload.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image, image.name);

        const resultImage = await axiosInstanceImage.post(
          "/uploadPhotoProfil",
          formData
        );
        const imageLien =
          "https://storage.cloud.google.com" +
          resultImage.data.split("https://storage.googleapis.com")[1];

        return {
          lien: imageLien,
          isCouverture: false,
        };
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Erreur lors de l'upload des images :", error);
      return [];
    }
  };

  const handleCreateEpreuve = async (
    dataForm: EpreuveCreateEntity
  ): Promise<void> => {
    let allLienImages: ImageEpreuveCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages();
    }

    const updatedDataForm = {
      images: allLienImages,
      ...dataForm,
    };

    if (updatedDataForm.title) {
      createEpreuve({
        variables: { infos: updatedDataForm },
        onCompleted(data) {
          if (data.createEpreuve.id) {
            toast.success(
              `GG, vous avez créé l'épreuve ${data.createEpreuve.title}`
            );
            router.push(`/epreuve/${data.createEpreuve.id}`);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    title: "",
    description: "",
    easyToDo: "",
    mediumToDo: "",
    hardToDo: "",
    videoLink: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- UPLOAD IMAGES ---
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le modify en temps que "images"

  const addSingleFileToPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilesToUpload((prevFiles) => [...prevFiles, file]);
    }
  };

  const removeImage = (index: number) => {
    setFilesToUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <main className="createEpreuve">
      <h1>Créer une épreuve</h1>

      <div className="formForImages">
        {/* remove and preview */}
        {filesToUpload.map((file, index) => (
          <div className="imager" key={index}>
            <img src={URL.createObjectURL(file)} alt={`Preview ${file.name}`} />
            <span className="remove_img" onClick={() => removeImage(index)}>
              supprimer cette image
            </span>
          </div>
        ))}

        {/* input */}
        <div className="inputer">
          <label className="button" htmlFor="oneMoreFile">
            Ajouter une image
          </label>
          <input
            id="oneMoreFile"
            type="file"
            accept="image/*"
            onChange={(e) => {
              addSingleFileToPreview(e);
            }}
          />
        </div>
      </div>

      {/* --- */}

      <form onSubmit={handleSubmit(handleCreateEpreuve)} className="bigForm">
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Titre de l'épreuve"
            required
            {...register("title")}
            id="title"
            name="title"
            type="text"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => handleChangeAThing("title", e.target.value)}
          />
          <span>
            {values.title.length > 0 ? `${values.title.length}/50` : ""}
          </span>
          <p className="error">{errors?.title?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Description global"
            multiline
            rows={10}
            {...register("description")}
            id="description"
            name="description"
            type="text"
            inputProps={{ maxLength: 1000 }}
            onChange={(e) => handleChangeAThing("description", e.target.value)}
          />
          <span>
            {values.description.length > 0
              ? `${values.description.length}/1000`
              : ""}
          </span>
          <p className="error">{errors?.description?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version débutant)"
            multiline
            rows={5}
            {...register("easyToDo")}
            id="easyToDo"
            name="easyToDo"
            type="text"
            inputProps={{ maxLength: 250 }}
            onChange={(e) => handleChangeAThing("easyToDo", e.target.value)}
          />
          <span>
            {values.easyToDo.length > 0 ? `${values.easyToDo.length}/250` : ""}
          </span>
          <p className="error">{errors?.easyToDo?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version medium)"
            multiline
            rows={5}
            {...register("mediumToDo")}
            id="mediumToDo"
            name="mediumToDo"
            type="text"
            inputProps={{ maxLength: 250 }}
            onChange={(e) => handleChangeAThing("mediumToDo", e.target.value)}
          />
          <span>
            {values.mediumToDo.length > 0
              ? `${values.mediumToDo.length}/250`
              : ""}
          </span>
          <p className="error">{errors?.mediumToDo?.message}</p>
        </div>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Que faire (version hard)"
            multiline
            rows={5}
            {...register("hardToDo")}
            id="hardToDo"
            name="hardToDo"
            type="text"
            inputProps={{ maxLength: 250 }}
            onChange={(e) => handleChangeAThing("hardToDo", e.target.value)}
          />
          <span>
            {values.hardToDo.length > 0 ? `${values.hardToDo.length}/250` : ""}
          </span>
          <p className="error">{errors?.hardToDo?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Le lien video"
            {...register("videoLink")}
            id="videoLink"
            name="videoLink"
            type="text"
            inputProps={{ maxLength: 150 }}
            onChange={(e) => handleChangeAThing("videoLink", e.target.value)}
          />
          <span>
            {values.videoLink.length > 0
              ? `${values.videoLink.length}/150`
              : ""}
          </span>
          <p className="error">{errors?.videoLink?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Créer l'épreuve
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default createEpreuve;
