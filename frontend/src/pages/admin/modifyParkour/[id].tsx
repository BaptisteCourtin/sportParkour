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

let modifyParkourSchema = object({
  title: string()
    .max(50, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
  description: string().max(
    1000,
    "Pas besoin d'avoir une description aussi long"
  ),

  time: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(600, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer le temps moyen pour finir ce parkour"),
  length: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(60, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer la longueur du parkour"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),

  city: string().max(50, "Une ville, pas un lieu-dit paumé"),
  start: string()
    .max(20, "20 caractères ça suffit")
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
          const selectedIds = data.getParkourById.epreuves?.map(
            (option: { id: string }) => parseInt(option.id)
          );
          selectedIds
            ? setSelectedEpreuveIds(selectedIds)
            : setSelectedEpreuveIds([]);

          setChooseEpreuves(data.getParkourById.epreuves as EpreuveEntity[]);
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

  const handleModifyParkour = (dataForm: ParkourUpdateEntity): void => {
    const dataAggregate: ParkourUpdateEntity = {
      ...dataForm,
      difficulty: choosenDificulty,
      epreuves: selectedEpreuveIds,
    };

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
    city: "",
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
            <form onSubmit={handleSubmit(handleModifyParkour)}>
              <div>
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
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => handleChangeAThing("title", e.target.value)}
                />
                <span>
                  {values.title.length > 0 ? `${values.title.length}/50` : ""}
                </span>
                <p className="error">{errors?.title?.message}</p>
              </div>
              <div>
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
                  inputProps={{ maxLength: 1000 }}
                  onChange={(e) =>
                    handleChangeAThing("description", e.target.value)
                  }
                />
                <span>
                  {values.description.length > 0
                    ? `${values.description.length}/1000`
                    : ""}
                </span>
                <p className="error">{errors?.description?.message}</p>
              </div>

              <div>
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="temps moyen pour finir le parkour"
                  defaultValue={data.getParkourById.time}
                  required
                  {...register("time")}
                  InputProps={{ inputProps: { max: 600 } }}
                  id="time"
                  name="time"
                  type="number"
                />
                <p className="error">{errors?.time?.message}</p>
              </div>
              <div>
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="longueur du parkour"
                  defaultValue={data.getParkourById.length}
                  required
                  {...register("length")}
                  InputProps={{ inputProps: { max: 60 } }}
                  id="length"
                  name="length"
                  type="number"
                />
                <p className="error">{errors?.length?.message}</p>
              </div>

              <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Difficultée
                  </InputLabel>
                  <Select
                    className="mui-input"
                    fullWidth
                    variant="outlined"
                    id="difficulty"
                    name="difficulty"
                    label="Difficultée"
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

              <div>
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="Ville de départ"
                  defaultValue={data.getParkourById.city}
                  {...register("city")}
                  id="city"
                  name="city"
                  type="text"
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => handleChangeAThing("city", e.target.value)}
                />
                <span>
                  {values.city.length > 0 ? `${values.city.length}/50` : ""}
                </span>
                <p className="error">{errors?.city?.message}</p>
              </div>
              <div>
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
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => handleChangeAThing("start", e.target.value)}
                />
                <span>
                  {values.start.length > 0 ? `${values.start.length}/20` : ""}
                </span>
                <p className="error">{errors?.start?.message}</p>
              </div>

              <div>
                <Autocomplete
                  sx={{ width: 300 }}
                  id="epreuves"
                  multiple
                  loading={loadingEpreuves}
                  disableCloseOnSelect
                  // valeur de base (repris de la bdd) (sous forme d'épreuve)
                  value={chooseEpreuves}
                  // on change
                  onInputChange={handleSearchTitle}
                  onChange={(e, value, detail) => handleEpreuveSelection(value)}
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

              <button type="submit" disabled={loadingModify}>
                Modifier le parkour
              </button>

              <div>
                <span>{errorModify?.message}</span>
              </div>
            </form>

            {/* --- */}

            <div className="parkourToDelete">
              <Button variant="outlined" onClick={handleClickOpen}>
                Delete parkour {data.getParkourById.id}
              </Button>
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
