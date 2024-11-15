import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  EpreuveCreateEntity,
  ImageEpreuveCreateEntity,
  useCreateEpreuveMutation,
} from "@/types/graphql";

import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";

import FormCreateImages from "@/components/uploadImage/formCreateImages";
import GoBack from "@/components/goBack";
import { uploadImages } from "@/components/uploadImage/uploadImages";

let createEpreuveSchema = object({
  title: string()
    .max(
      parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE),
      "Pas besoin d'avoir un titre aussi long"
    )
    .required("Veuillez entrer un titre"),
  description: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION),
    "Pas besoin d'avoir une description aussi longue"
  ),
  easyToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi longue"
  ),
  mediumToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi longue"
  ),
  hardToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi longue"
  ),
  videoLink: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK),
    `max ${process.env.NEXT_PUBLIC_LENGTH_LINK} carcatères, normalement ça suffit`
  ),
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

  const [createEpreuve, { data, loading, error }] = useCreateEpreuveMutation();

  const handleCreateEpreuve = async (
    dataForm: EpreuveCreateEntity
  ): Promise<void> => {
    let allLienImages: ImageEpreuveCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages(filesToUpload, isMyCouverture); // fonction à part
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
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le create en temps que "images"
  const [isMyCouverture, setIsMyCouverture] = useState<number>();

  return (
    <main className="createEpreuve">
      <GoBack />

      <h1>Créer une épreuve</h1>

      {/* --- form create images --- */}
      <FormCreateImages
        setFilesToUpload={setFilesToUpload}
        filesToUpload={filesToUpload}
        setIsMyCouverture={setIsMyCouverture}
        isMyCouverture={isMyCouverture}
      />

      {/* --- form create epreuve --- */}
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
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_TITLE }}
            onChange={(e) => handleChangeAThing("title", e.target.value)}
          />
          <span>
            {values.title.length > 0
              ? `${values.title.length}/${process.env.NEXT_PUBLIC_LENGTH_TITLE}`
              : ""}
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
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION,
            }}
            onChange={(e) => handleChangeAThing("description", e.target.value)}
          />
          <span>
            {values.description.length > 0
              ? `${values.description.length}/${process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION}`
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
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
            }}
            onChange={(e) => handleChangeAThing("easyToDo", e.target.value)}
          />
          <span>
            {values.easyToDo.length > 0
              ? `${values.easyToDo.length}/${process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION}`
              : ""}
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
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
            }}
            onChange={(e) => handleChangeAThing("mediumToDo", e.target.value)}
          />
          <span>
            {values.mediumToDo.length > 0
              ? `${values.mediumToDo.length}/${process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION}`
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
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
            }}
            onChange={(e) => handleChangeAThing("hardToDo", e.target.value)}
          />
          <span>
            {values.hardToDo.length > 0
              ? `${values.hardToDo.length}/${process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION}`
              : ""}
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
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_LINK }}
            onChange={(e) => handleChangeAThing("videoLink", e.target.value)}
          />
          <span>
            {values.videoLink.length > 0
              ? `${values.videoLink.length}/${process.env.NEXT_PUBLIC_LENGTH_LINK}`
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
