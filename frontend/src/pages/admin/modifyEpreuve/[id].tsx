import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  EpreuveUpdateEntity,
  ImageEpreuveCreateEntity,
  ImageEpreuveEntity,
  useGetEpreuveByIdLazyQuery,
  useModifyEpreuveMutation,
  useModifyImageCouvertureEpreuveMutation,
} from "@/types/graphql";

import TextField from "@mui/material/TextField";

import { toast } from "react-hot-toast";
import axiosInstanceImage from "@/lib/axiosInstanceImage";

import {
  LENGTH_TITLE,
  LENGTH_DESCRIPTION,
  LENGTH_LITTLE_DESCRIPTION,
  LENGTH_LINK,
} from "../../../../../variablesLength";
import SuppEpreuveDialog from "@/components/suppression/suppEpreuveDialog";

let modifyEpreuveSchema = object({
  title: string()
    .max(LENGTH_TITLE, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
  description: string().max(
    LENGTH_DESCRIPTION,
    "Pas besoin d'avoir une description aussi long"
  ),
  easyToDo: string().max(
    LENGTH_LITTLE_DESCRIPTION,
    "Pas besoin d'avoir une description aussi long"
  ),
  mediumToDo: string().max(
    LENGTH_LITTLE_DESCRIPTION,
    "Pas besoin d'avoir une description aussi long"
  ),
  hardToDo: string().max(
    LENGTH_LITTLE_DESCRIPTION,
    "Pas besoin d'avoir une description aussi long"
  ),
  videoLink: string().max(
    LENGTH_LINK,
    `max ${LENGTH_LINK}, carcatères normalement ça suffit`
  ),
});

const modifyOneEpreuve = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getEpreuve, { data, loading, error }] = useGetEpreuveByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getEpreuve({
        variables: { getEpreuveByIdId: +id },
        onCompleted(data) {
          setListImagesAlreadyIn(
            data.getEpreuveById.images as [ImageEpreuveEntity]
          );

          if (data.getEpreuveById.images) {
            for (let i = 0; i < data.getEpreuveById.images.length; i++) {
              if (data.getEpreuveById.images[i].isCouverture) {
                setIsMyCouverture(+data.getEpreuveById.images[i].id);
                setMyLastCouverture(+data.getEpreuveById.images[i].id);
                break;
              }
            }
          }
        },
        onError(err) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- MODIFY EPREUVE ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modifyEpreuveSchema),
  });

  const [
    modifyEpreuve,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyEpreuveMutation({
    fetchPolicy: "no-cache",
  });

  const [
    modifyImageEpreuve,
    {
      data: dataImageModify,
      loading: loadingImageModify,
      error: errorImageModify,
    },
  ] = useModifyImageCouvertureEpreuveMutation({
    fetchPolicy: "no-cache",
  });

  const uploadImages = async (): Promise<ImageEpreuveCreateEntity[]> => {
    try {
      const uploadPromises = filesToUpload.map(async (image, index) => {
        const formData = new FormData();
        formData.append("file", image, image.name);

        const resultImage = await axiosInstanceImage.post(
          "/uploadPhotoProfil",
          formData
        );
        const imageLien =
          "https://storage.cloud.google.com" +
          resultImage.data.split("https://storage.googleapis.com")[1];

        let isCouv = false;
        if (isMyCouverture == index) {
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

  const handleModifyEpreuve = async (
    dataForm: EpreuveUpdateEntity
  ): Promise<void> => {
    let allLienImages: ImageEpreuveCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages();
    }

    const updatedDataForm = {
      images: allLienImages,
      deletedImageIds: idsImagesToSupp,
      ...dataForm,
    };

    // une requete ici pour enlevé le isCouverture
    if (myLastCouverture && isMyCouverture != myLastCouverture) {
      modifyImageEpreuve({
        variables: { idImage: myLastCouverture },
      });
    }
    // une requete ici pour ajouter le isCouverture
    if (data?.getEpreuveById.images && isMyCouverture != myLastCouverture) {
      for (let i = 0; i < data.getEpreuveById.images.length; i++) {
        // si isCouv est sur une ancienne image => va changer
        // si isCouv est sur une nouvelle image => va rien faire
        if (+data.getEpreuveById.images[i].id == isMyCouverture) {
          modifyImageEpreuve({
            variables: { idImage: isMyCouverture },
          });
          break;
        }
      }
    }

    if (updatedDataForm.title && id) {
      modifyEpreuve({
        variables: { infos: updatedDataForm, modifyEpreuveId: +id },
        onCompleted(data) {
          if (data.modifyEpreuve.id) {
            toast.success("GG, vous avez mis l'épreuve à jour 👌");
            router.push(`/epreuve/${data.modifyEpreuve.id}`);
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

  // --- DELETE IMAGES ---
  const [listImagesAlreadyIn, setListImagesAlreadyIn] =
    useState<[ImageEpreuveEntity]>();
  const [idsImagesToSupp, setIdsImagesToSupp] = useState<number[]>([]); // à envoyer dans le modify en temps que "deletedImageIds"

  function handleSuppOneImage(event: any, thisId: number) {
    event.preventDefault();

    if (idsImagesToSupp.includes(thisId)) {
      setIdsImagesToSupp((prevIdsImagesToSupp) => {
        return prevIdsImagesToSupp.filter((id) => id !== thisId);
      });
    } else {
      setIdsImagesToSupp((prevIdsImagesToSupp) => [
        ...prevIdsImagesToSupp,
        thisId,
      ]);
    }
  }

  // --- UPLOAD IMAGES ---
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le modify en temps que "images"
  const [isMyCouverture, setIsMyCouverture] = useState<number>(); // celui à mettre en isCouverture
  const [myLastCouverture, setMyLastCouverture] = useState<number>(); // pour vérifier

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
    <main className="modifyOneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <>
            <h1>MODIFIER L'ÉPREUVE</h1>

            {/* --- */}

            <ul className="imageAlredyInBase">
              {listImagesAlreadyIn &&
                listImagesAlreadyIn.map((img) => (
                  <li
                    key={img.id}
                    className={`${
                      idsImagesToSupp.includes(parseInt(img.id))
                        ? "toDelete"
                        : ""
                    }
                        ${isMyCouverture == +img.id ? "isCouv" : ""}`}
                  >
                    <img src={img.lien} alt="image de présentation" />
                    <button
                      className="toCouv"
                      onClick={() => setIsMyCouverture(+img.id)}
                    >
                      image de couverture
                    </button>
                    <button
                      onClick={(e) => handleSuppOneImage(e, Number(img.id))}
                    >
                      {idsImagesToSupp.includes(parseInt(img.id))
                        ? "Pas supp"
                        : "Supp"}
                    </button>
                  </li>
                ))}
            </ul>

            {/* --- */}

            <div className="formForImages">
              {/* remove and preview */}
              {filesToUpload.map((file, index) => (
                <div
                  className={`${
                    isMyCouverture == index ? "isCouv" : ""
                  } imager`}
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${file.name}`}
                  />
                  <button onClick={() => setIsMyCouverture(index)}>
                    image de couverture
                  </button>
                  <span
                    className="remove_img"
                    onClick={() => removeImage(index)}
                  >
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

            <form
              onSubmit={handleSubmit(handleModifyEpreuve)}
              className="bigForm"
            >
              <div className="champ">
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  //
                  label="Titre de l'épreuve"
                  defaultValue={data.getEpreuveById.title}
                  required
                  {...register("title")}
                  //
                  id="title"
                  name="title"
                  type="text"
                  //
                  inputProps={{ maxLength: LENGTH_TITLE }}
                  onChange={(e) => handleChangeAThing("title", e.target.value)}
                />
                <span>
                  {values.title.length > 0
                    ? `${values.title.length}/${LENGTH_TITLE}`
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
                  defaultValue={data.getEpreuveById.description}
                  multiline
                  rows={10}
                  {...register("description")}
                  id="description"
                  name="description"
                  type="text"
                  inputProps={{ maxLength: LENGTH_DESCRIPTION }}
                  onChange={(e) =>
                    handleChangeAThing("description", e.target.value)
                  }
                />
                <span>
                  {values.description.length > 0
                    ? `${values.description.length}/${LENGTH_DESCRIPTION}`
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
                  defaultValue={data.getEpreuveById.easyToDo}
                  multiline
                  rows={5}
                  {...register("easyToDo")}
                  id="easyToDo"
                  name="easyToDo"
                  type="text"
                  inputProps={{ maxLength: LENGTH_LITTLE_DESCRIPTION }}
                  onChange={(e) =>
                    handleChangeAThing("easyToDo", e.target.value)
                  }
                />
                <span>
                  {values.easyToDo.length > 0
                    ? `${values.easyToDo.length}/${LENGTH_LITTLE_DESCRIPTION}`
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
                  defaultValue={data.getEpreuveById.mediumToDo}
                  multiline
                  rows={5}
                  {...register("mediumToDo")}
                  id="mediumToDo"
                  name="mediumToDo"
                  type="text"
                  inputProps={{ maxLength: LENGTH_LITTLE_DESCRIPTION }}
                  onChange={(e) =>
                    handleChangeAThing("mediumToDo", e.target.value)
                  }
                />
                <span>
                  {values.mediumToDo.length > 0
                    ? `${values.mediumToDo.length}/${LENGTH_LITTLE_DESCRIPTION}`
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
                  defaultValue={data.getEpreuveById.hardToDo}
                  multiline
                  rows={5}
                  {...register("hardToDo")}
                  id="hardToDo"
                  name="hardToDo"
                  type="text"
                  inputProps={{ maxLength: LENGTH_LITTLE_DESCRIPTION }}
                  onChange={(e) =>
                    handleChangeAThing("hardToDo", e.target.value)
                  }
                />
                <span>
                  {values.hardToDo.length > 0
                    ? `${values.hardToDo.length}/${LENGTH_LITTLE_DESCRIPTION}`
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
                  defaultValue={data.getEpreuveById.videoLink}
                  {...register("videoLink")}
                  id="videoLink"
                  name="videoLink"
                  type="text"
                  inputProps={{ maxLength: LENGTH_LINK }}
                  onChange={(e) =>
                    handleChangeAThing("videoLink", e.target.value)
                  }
                />
                <span>
                  {values.videoLink.length > 0
                    ? `${values.videoLink.length}/${LENGTH_LINK}`
                    : ""}
                </span>
                <p className="error">{errors?.videoLink?.message}</p>
              </div>

              <button type="submit" disabled={loadingModify}>
                Enregistrer les modifications
              </button>

              <div>
                <span>{errorModify?.message}</span>
              </div>
            </form>

            {/* --- delete --- */}
            <SuppEpreuveDialog
              epreuveTitle={data.getEpreuveById.title}
              epreuveId={data.getEpreuveById.id}
            />
          </>
        )
      )}
    </main>
  );
};

export default modifyOneEpreuve;
