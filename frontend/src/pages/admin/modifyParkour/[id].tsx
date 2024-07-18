import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Difficulty,
  EpreuveEntity,
  ParkourUpdateEntity,
  useDeleteParkourMutation,
  useGetTop20EpreuveByTitleLazyQuery,
  useGetParkourByIdLazyQuery,
  useModifyParkourMutation,
  ImageEpreuveEntity,
  ImageEpreuveCreateEntity,
  useModifyImageCouvertureParkourMutation,
  ImageParkourCreateEntity,
} from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import axiosInstanceImage from "@/lib/axiosInstanceImage";
import {
  LENGTH_DESCRIPTION,
  LENGTH_START,
  LENGTH_TITLE,
  MAX_LENGTH,
  MAX_TIME,
} from "../../../../../variablesLength";

let modifyParkourSchema = object({
  title: string()
    .max(LENGTH_TITLE, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
  description: string().max(
    LENGTH_DESCRIPTION,
    "Pas besoin d'avoir une description aussi long"
  ),

  time: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(MAX_TIME, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer le temps moyen pour finir ce parkour"),
  length: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(MAX_LENGTH, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer la longueur du parkour"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),

  start: string()
    .max(LENGTH_START, "réduit un peu")
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
            data.getParkourById.images as [ImageEpreuveEntity]
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

  const [choosenDificulty, setChoosenDifficulty] = useState<Difficulty>();

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

  const uploadImages = async (): Promise<ImageParkourCreateEntity[]> => {
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

  const handleModifyParkour = async (
    dataForm: ParkourUpdateEntity
  ): Promise<void> => {
    let allLienImages: ImageEpreuveCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages();
    }

    const dataAggregate: ParkourUpdateEntity = {
      difficulty: choosenDificulty,
      city: selectedCommuneName,
      epreuves: selectedEpreuveIds,
      images: allLienImages,
      deletedImageIds: idsImagesToSupp,
      ...dataForm,
    };

    // une requete ici pour enlevé le isCouverture
    if (myLastCouverture && isMyCouverture != myLastCouverture) {
      modifyImageParkour({
        variables: { idImage: myLastCouverture },
      });
    }
    // une requete ici pour ajouter le isCouverture
    if (data?.getParkourById.images && isMyCouverture != myLastCouverture) {
      for (let i = 0; i < data?.getParkourById.images.length; i++) {
        // si isCouv est sur une ancienne image => va changer
        // si isCouv est sur une nouvelle image => va rien faire
        if (+data?.getParkourById.images[i].id == isMyCouverture) {
          modifyImageParkour({
            variables: { idImage: isMyCouverture },
          });
          break;
        }
      }
    }

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

  // --- DELETE PARKOUR ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteParkour, { loading: loadingDelete, error: errorDelete }] =
    useDeleteParkourMutation();

  function handleDeleteParkour(id: string): void {
    if (id) {
      deleteParkour({
        variables: { deleteParkourId: +id },
        onCompleted(data) {
          toast.success(data?.deleteParkour.message);
          router.push(`/`);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

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
    <main className="modifyOneParkour">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <>
            <h1>MODIFIER LE PARKOUR</h1>

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
                  label="Description"
                  defaultValue={data.getParkourById.description}
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
                  label="temps moyen pour finir le parkour"
                  defaultValue={data.getParkourById.time}
                  required
                  {...register("time")}
                  InputProps={{ inputProps: { max: MAX_TIME } }}
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
                  InputProps={{ inputProps: { max: MAX_LENGTH } }}
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
                    inputProps={{ maxLength: LENGTH_START }}
                    onChange={(e) =>
                      handleChangeAThing("start", e.target.value)
                    }
                  />
                  <span>
                    {values.start.length > 0
                      ? `${values.start.length}/${LENGTH_START}`
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
                      <MenuItem value="facile">{Difficulty.Facile}</MenuItem>
                      <MenuItem value="moyen">{Difficulty.Moyen}</MenuItem>
                      <MenuItem value="difficile">
                        {Difficulty.Difficile}
                      </MenuItem>
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
            <div className="parkourToDelete">
              <button onClick={handleClickOpen}>
                Delete parkour {data.getParkourById.id}
              </button>
              <Dialog
                open={open}
                onClose={handleClickClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                      (formData as any).entries()
                    );
                    const nomParkour = formJson.nomParkour;

                    if (data.getParkourById.title == nomParkour) {
                      handleDeleteParkour(data.getParkourById.id);

                      if (errorDelete) {
                        handleClickClose();
                        toast.error(errorDelete?.message);
                      }
                    } else {
                      handleClickClose();
                      toast.error("Le nom du parkour ne correspond pas");
                    }
                  },
                }}
              >
                <DialogTitle>
                  Delete parkour {data.getParkourById.id}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer ce parkour entrez son nom :
                    {data.getParkourById.title}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nomParkour"
                    name="nomParkour"
                    label="nom du parkour"
                    type="nomParkour"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>En fait, non</Button>
                  <Button type="submit">Hop, ça dégage!</Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneParkour;
