import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  EpreuveUpdateEntity,
  ImageEpreuveCreateEntity,
  ImageEpreuveEntity,
  useGetEpreuveByIdLazyQuery,
  useModifyEpreuveMutation,
  useModifyImageCouvertureEpreuveMutation,
} from "@/types/graphql";

import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";

import SuppEpreuveDialog from "@/components/suppression/suppEpreuveDialog";
import FormCreateImages from "@/components/uploadImage/formCreateImages";
import DisplayImagesInBase from "@/components/uploadImage/displayImagesInBase";
import GoBack from "@/components/goBack";
import { uploadImages } from "@/components/uploadImage/uploadImages";
import { modifyIsCouverture } from "@/components/uploadImage/modifyImagesCouverture";

let modifyEpreuveSchema = object({
  title: string()
    .max(
      parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE),
      "Pas besoin d'avoir un titre aussi long"
    )
    .required("Veuillez entrer un titre"),
  description: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION),
    "Pas besoin d'avoir une description aussi long"
  ),
  easyToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi long"
  ),
  mediumToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi long"
  ),
  hardToDo: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION),
    "Pas besoin d'avoir une description aussi long"
  ),
  videoLink: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_LINK),
    `max ${process.env.NEXT_PUBLIC_LENGTH_LINK}, carcatères normalement ça suffit`
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
  }, [id]);

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
  ] = useModifyEpreuveMutation();

  const [
    modifyImageEpreuve,
    {
      data: dataImageModify,
      loading: loadingImageModify,
      error: errorImageModify,
    },
  ] = useModifyImageCouvertureEpreuveMutation();

  const handleModifyEpreuve = async (
    dataForm: EpreuveUpdateEntity
  ): Promise<void> => {
    let allLienImages: ImageEpreuveCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages(filesToUpload, isMyCouverture); // fonction à part
    }

    const updatedDataForm = {
      images: allLienImages,
      deletedImageIds: idsImagesToSupp,
      ...dataForm,
    };

    await modifyIsCouverture(
      modifyImageEpreuve,
      myLastCouverture,
      isMyCouverture,
      data.getEpreuveById
    ); // fonction à part

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

  // --- UPLOAD IMAGES ---
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le modify en temps que "images"
  const [isMyCouverture, setIsMyCouverture] = useState<number>(); // celui à mettre en isCouverture
  const [myLastCouverture, setMyLastCouverture] = useState<number>(); // pour vérifier pour le back

  // --- DELETE IMAGES ---
  const [listImagesAlreadyIn, setListImagesAlreadyIn] =
    useState<[ImageEpreuveEntity]>();
  const [idsImagesToSupp, setIdsImagesToSupp] = useState<number[]>([]); // à envoyer dans le modify en temps que "deletedImageIds"

  return (
    <main className="modifyOneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <>
            <GoBack />

            <h1>MODIFIER L'ÉPREUVE</h1>

            {/* --- display images in base --- */}
            <DisplayImagesInBase
              listImagesAlreadyIn={listImagesAlreadyIn}
              setIsMyCouverture={setIsMyCouverture}
              isMyCouverture={isMyCouverture}
              setIdsImagesToSupp={setIdsImagesToSupp}
              idsImagesToSupp={idsImagesToSupp}
            />

            {/* --- form create images --- */}
            <FormCreateImages
              setFilesToUpload={setFilesToUpload}
              filesToUpload={filesToUpload}
              setIsMyCouverture={setIsMyCouverture}
              isMyCouverture={isMyCouverture}
            />

            {/* --- form modify epreuve --- */}
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
                  inputProps={{
                    maxLength: process.env.NEXT_PUBLIC_LENGTH_TITLE,
                  }}
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
                  defaultValue={data.getEpreuveById.description}
                  multiline
                  rows={10}
                  {...register("description")}
                  id="description"
                  name="description"
                  type="text"
                  inputProps={{
                    maxLength: process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION,
                  }}
                  onChange={(e) =>
                    handleChangeAThing("description", e.target.value)
                  }
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
                  defaultValue={data.getEpreuveById.easyToDo}
                  multiline
                  rows={5}
                  {...register("easyToDo")}
                  id="easyToDo"
                  name="easyToDo"
                  type="text"
                  inputProps={{
                    maxLength:
                      process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
                  }}
                  onChange={(e) =>
                    handleChangeAThing("easyToDo", e.target.value)
                  }
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
                  defaultValue={data.getEpreuveById.mediumToDo}
                  multiline
                  rows={5}
                  {...register("mediumToDo")}
                  id="mediumToDo"
                  name="mediumToDo"
                  type="text"
                  inputProps={{
                    maxLength:
                      process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
                  }}
                  onChange={(e) =>
                    handleChangeAThing("mediumToDo", e.target.value)
                  }
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
                  defaultValue={data.getEpreuveById.hardToDo}
                  multiline
                  rows={5}
                  {...register("hardToDo")}
                  id="hardToDo"
                  name="hardToDo"
                  type="text"
                  inputProps={{
                    maxLength:
                      process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION,
                  }}
                  onChange={(e) =>
                    handleChangeAThing("hardToDo", e.target.value)
                  }
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
                  defaultValue={data.getEpreuveById.videoLink}
                  {...register("videoLink")}
                  id="videoLink"
                  name="videoLink"
                  type="text"
                  inputProps={{
                    maxLength: process.env.NEXT_PUBLIC_LENGTH_LINK,
                  }}
                  onChange={(e) =>
                    handleChangeAThing("videoLink", e.target.value)
                  }
                />
                <span>
                  {values.videoLink.length > 0
                    ? `${values.videoLink.length}/${process.env.NEXT_PUBLIC_LENGTH_LINK}`
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
