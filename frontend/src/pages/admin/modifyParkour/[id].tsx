import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Difficulty,
  EpreuveEntity,
  ParkourUpdateEntity,
  useGetTop20EpreuveByTitleLazyQuery,
  useGetParkourByIdLazyQuery,
  useModifyParkourMutation,
  useModifyImageCouvertureParkourMutation,
  ImageParkourCreateEntity,
  ImageParkourEntity,
} from "@/types/graphql";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import { uploadImages } from "@/components/uploadImage/uploadImages";

import SuppParkourDialog from "@/components/suppression/suppParkourDialog";
import FormCreateImages from "@/components/uploadImage/formCreateImages";
import DisplayImagesInBase from "@/components/uploadImage/displayImagesInBase";
import { modifyIsCouverture } from "@/components/uploadImage/modifyImagesCouverture";

let modifyParkourSchema = object({
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

  time: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_TIME),
      "Si ça dure plus longtemps, contacte les admins"
    )
    .required("Veuillez entrer le temps moyen pour finir ce parkour"),
  length: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH),
      "Si ça dure plus longtemps, contacte les admins"
    )
    .required("Veuillez entrer la longueur du parkour"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),

  start: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_START), "réduit un peu")
    .required("Veuillez entrer un point de départ"),
});

const modifyOneParkour = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getParkour, { data, loading, error }] = useGetParkourByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getParkour({
        variables: { getParkourByIdId: +id },
        onCompleted(data) {
          setSelectedCommuneName(
            data.getParkourById.city ? data.getParkourById.city : ""
          );
          const selectedIds = data.getParkourById.epreuves?.map(
            (option: { id: string }) => parseInt(option.id)
          );
          selectedIds
            ? setSelectedEpreuveIds(selectedIds)
            : setSelectedEpreuveIds([]);

          setChooseEpreuves(data.getParkourById.epreuves as EpreuveEntity[]);

          setListImagesAlreadyIn(
            data.getParkourById.images as [ImageParkourEntity]
          );

          if (data.getParkourById.images) {
            for (let i = 0; i < data.getParkourById.images.length; i++) {
              if (data.getParkourById.images[i].isCouverture) {
                setIsMyCouverture(+data.getParkourById.images[i].id);
                setMyLastCouverture(+data.getParkourById.images[i].id);
                break;
              }
            }
          }
        },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- MODIFY PARKOUR ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modifyParkourSchema),
  });

  const [
    modifyParkour,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyParkourMutation({
    fetchPolicy: "no-cache",
  });

  const [choosenDifficulty, setChoosenDifficulty] = useState<Difficulty>();

  const [
    modifyImageParkour,
    {
      data: dataImageModify,
      loading: loadingImageModify,
      error: errorImageModify,
    },
  ] = useModifyImageCouvertureParkourMutation({
    fetchPolicy: "no-cache",
  });

  const handleModifyParkour = async (
    dataForm: ParkourUpdateEntity
  ): Promise<void> => {
    let allLienImages: ImageParkourCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages(filesToUpload, isMyCouverture); // fonction à part
    }

    const dataAggregate: ParkourUpdateEntity = {
      difficulty: choosenDifficulty,
      city: selectedCommuneName,
      epreuves: selectedEpreuveIds,
      images: allLienImages,
      deletedImageIds: idsImagesToSupp,
      ...dataForm,
    };

    await modifyIsCouverture(
      modifyImageParkour,
      myLastCouverture,
      isMyCouverture,
      data.getParkourById
    ); // fonction à part

    if (dataAggregate.title && id) {
      modifyParkour({
        variables: {
          infos: dataAggregate,
          modifyParkourId: parseInt(id as string),
        },
        onCompleted(data) {
          if (data.modifyParkour.id) {
            toast.success("GG, vous avez mis le parkour à jour 👌");
            router.push(`/parkour/${data.modifyParkour.id}`);
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
    start: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- DEAL WITH IDS EPREUVES ---
  const [
    getListEpreuvesByTitle,
    { data: dataEpreuves, loading: loadingEpreuves, error: errorEpreuves },
  ] = useGetTop20EpreuveByTitleLazyQuery();

  const handleSearchTitle = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    getListEpreuvesByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListEpreuvesByTitle();
  }, []);

  const [selectedEpreuveIds, setSelectedEpreuveIds] = useState<number[]>([]);
  const [chooseEpreuves, setChooseEpreuves] = useState<EpreuveEntity[]>([]);

  const handleEpreuveSelection = (values: any) => {
    // je sais pas mais ok
    const idCounts: { [key: string]: number } = {};
    const tableauFiltre: EpreuveEntity[] = values.filter((objet: any) => {
      idCounts[objet.id] = (idCounts[objet.id] || 0) + 1;
      return idCounts[objet.id] === 1;
    });

    const tableauSansDoublons: EpreuveEntity[] = tableauFiltre.filter(
      (objet) => idCounts[objet.id] === 1
    );
    // voilà voilà

    setChooseEpreuves(tableauSansDoublons);

    const selectedIds = tableauSansDoublons.map((option: { id: string }) =>
      parseInt(option.id)
    );
    setSelectedEpreuveIds(selectedIds);
  };

  // --- API COMMUNES ---
  const [selectedCommuneName, setSelectedCommuneName] = useState("");

  // --- UPLOAD IMAGES ---
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le modify en temps que "images"
  const [isMyCouverture, setIsMyCouverture] = useState<number>(); // celui à mettre en isCouverture
  const [myLastCouverture, setMyLastCouverture] = useState<number>(); // pour vérifier

  // --- DELETE IMAGES ---
  const [listImagesAlreadyIn, setListImagesAlreadyIn] =
    useState<[ImageParkourEntity]>();
  const [idsImagesToSupp, setIdsImagesToSupp] = useState<number[]>([]); // à envoyer dans le modify en temps que "deletedImageIds"

  return (
    <main className="modifyOneParkour">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <>
            <h1>MODIFIER LE PARKOUR</h1>

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

            {/* --- form modify parkour --- */}
            <form
              onSubmit={handleSubmit(handleModifyParkour)}
              className="bigForm"
            >
              <div className="champ">
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="Titre du parkour"
                  defaultValue={data.getParkourById.title}
                  required
                  {...register("title")}
                  id="title"
                  name="title"
                  type="text"
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
                  label="Description"
                  defaultValue={data.getParkourById.description}
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
                  label="temps moyen pour finir le parkour"
                  defaultValue={data.getParkourById.time}
                  required
                  {...register("time")}
                  InputProps={{
                    inputProps: { max: process.env.NEXT_PUBLIC_MAX_TIME },
                  }}
                  id="time"
                  name="time"
                  type="number"
                />
                <p className="error">{errors?.time?.message}</p>
              </div>
              <div className="champ">
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="longueur du parkour"
                  defaultValue={data.getParkourById.length}
                  required
                  {...register("length")}
                  InputProps={{
                    inputProps: { max: process.env.NEXT_PUBLIC_MAX_LENGTH },
                  }}
                  id="length"
                  name="length"
                  type="number"
                />
                <p className="error">{errors?.length?.message}</p>
              </div>

              <div className="containerMiniChamp">
                <div className="champ">
                  <SearchBarCommuneName
                    userValue={selectedCommuneName}
                    setSelectedCommuneName={setSelectedCommuneName}
                  />
                </div>
                <div className="champ">
                  <TextField
                    className="mui-input"
                    fullWidth
                    variant="outlined"
                    label="Point gps de départ"
                    defaultValue={data.getParkourById.start}
                    required
                    {...register("start")}
                    id="start"
                    name="start"
                    type="text"
                    inputProps={{
                      maxLength: process.env.NEXT_PUBLIC_LENGTH_START,
                    }}
                    onChange={(e) =>
                      handleChangeAThing("start", e.target.value)
                    }
                  />
                  <span>
                    {values.start.length > 0
                      ? `${values.start.length}/${process.env.NEXT_PUBLIC_LENGTH_START}`
                      : ""}
                  </span>
                  <p className="error">{errors?.start?.message}</p>
                </div>
              </div>

              <div className="containerFlexChamp">
                <div className="champ">
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel>Difficultée</InputLabel>
                    <Select
                      className="mui-input"
                      variant="outlined"
                      id="difficulty"
                      name="difficulty"
                      label="Difficultée"
                      required
                      defaultValue={data.getParkourById.difficulty}
                      onChange={(e) =>
                        setChoosenDifficulty(e.target.value as Difficulty)
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="EASY">facile</MenuItem>
                      <MenuItem value="MEDIUM">moyen</MenuItem>
                      <MenuItem value="HARD">difficile</MenuItem>
                    </Select>
                  </FormControl>
                  <p className="error">{errors?.difficulty?.message}</p>
                </div>

                <div className="champ">
                  <Autocomplete
                    sx={{ width: 300 }}
                    id="epreuves"
                    className="mui-input"
                    multiple
                    loading={loadingEpreuves}
                    disableCloseOnSelect
                    // valeur de base (repris de la bdd) (sous forme d'épreuve)
                    value={chooseEpreuves}
                    // on change
                    onInputChange={handleSearchTitle}
                    onChange={(e, value, detail) =>
                      handleEpreuveSelection(value)
                    }
                    // pour rechercher dans le back
                    options={dataEpreuves?.getTop20EpreuveByTitle ?? []}
                    // render qui veut un string
                    getOptionLabel={(option) => option.title}
                    // pour le style autour
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Recherche une épreuve par titre"
                      />
                    )}
                    // pour la liste déroulante
                    renderOption={(props, option, { selected }) => (
                      <li {...props} key={option.id} value={option.id}>
                        {option.title}
                        {selected ? <FaCheck /> : null}
                      </li>
                    )}
                  />
                </div>
              </div>

              <button type="submit" disabled={loadingModify}>
                Modifier le parkour
              </button>

              <div>
                <span>{errorModify?.message}</span>
              </div>
            </form>

            {/* --- DELETE PARKOUR --- */}
            <SuppParkourDialog
              parkourTitle={data.getParkourById.title}
              parkourId={data.getParkourById.id}
            />
          </>
        )
      )}
    </main>
  );
};

export default modifyOneParkour;
