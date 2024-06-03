import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Difficulty,
  ParkourUpdateEntity,
  useDeleteParkourMutation,
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

import { Snackbar } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, mixed, number, object, string } from "yup";

let modifyParkourSchema = object({
  title: string().required("Veuillez entrer un titre"),
  description: string(),
  time: number(),
  length: number(),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),
  city: string(),
  start: string(),
  epreuves: array().of(string()),
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
          setValue("title", data.getParkourById.title ?? "");
          setValue("description", data.getParkourById.description ?? "");

          setValue("time", data.getParkourById.time ?? 0);
          setValue("length", data.getParkourById.length ?? 0);
          setValue("difficulty", data.getParkourById.difficulty ?? undefined);

          setValue("city", data.getParkourById.city ?? "");
          setValue("start", data.getParkourById.start ?? "");

          // setValue("epreuves", data.getParkourById.epreuves ?? []);
          setValue(
            "epreuves",
            data.getParkourById.epreuves
              ? data.getParkourById.epreuves.map((epreuve) => epreuve.id)
              : []
          );
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
    setValue,
  } = useForm({
    resolver: yupResolver(modifyParkourSchema),
    defaultValues: {
      title: "",
      description: "",
      time: 0,
      length: 0,
      difficulty: undefined,
      city: "",
      start: "",
      epreuves: [],
    },
  });

  const [
    modifyParkour,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyParkourMutation({
    fetchPolicy: "no-cache",
  });

  const handleModifyParkour = (dataForm: ParkourUpdateEntity): void => {
    if (dataForm.title && id) {
      modifyParkour({
        variables: { infos: dataForm, modifyParkourId: parseInt(id as string) },
        onCompleted(data) {
          if (data.modifyParkour.id) {
            router.push(`/epreuve/${data.modifyParkour.id}`);
          }
        },
        onError(error) {
          console.error(error);
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
        onCompleted() {
          router.push(`/`);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  }

  // --- SNACKBAR ---
  const [openSnack, setOpenSnack] = useState(false);
  const [snackComment, setSnackComment] = useState("");

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
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
                        setSnackComment(errorDelete?.message);
                        handleClickSnack();
                      }
                    } else {
                      handleClickClose();
                      setSnackComment("Le nom du parkour ne correspond pas");
                      handleClickSnack();
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

              {/* --- */}

              <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                message={snackComment}
              />
            </div>

            <form onSubmit={handleSubmit(handleModifyParkour)}>
              <div>
                <label htmlFor="title">Le titre de l'épreuve</label>
                <input
                  {...register("title")}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Indiquez votre titre"
                />
                <p className="error">{errors?.title?.message}</p>
              </div>
              <div>
                <label htmlFor="description">La description de l'épreuve</label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  placeholder="La description de l'épreuve"
                ></textarea>
                <p className="error">{errors?.description?.message}</p>
              </div>

              <div>
                <label htmlFor="time">le temps moyen</label>
                <textarea
                  {...register("time")}
                  id="time"
                  name="time"
                  placeholder="le temps moyen"
                ></textarea>
                <p className="error">{errors?.time?.message}</p>
              </div>
              <div>
                <label htmlFor="length">Longueur du parkour</label>
                <textarea
                  {...register("length")}
                  id="length"
                  name="length"
                  placeholder="Longueur du parkour"
                ></textarea>
                <p className="error">{errors?.length?.message}</p>
              </div>

              <div>
                <label htmlFor="difficulty">Difficultée</label>
                <select id="difficulty" name="difficulty">
                  <option value={Difficulty.Easy}>{Difficulty.Easy}</option>
                  <option value={Difficulty.Medium}>{Difficulty.Medium}</option>
                  <option value={Difficulty.Hard}>{Difficulty.Hard}</option>
                </select>
                <p className="error">{errors?.difficulty?.message}</p>
              </div>

              <div>
                <label htmlFor="city">Ville de départ</label>
                <input
                  {...register("city")}
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ville de départ"
                />
                <p className="error">{errors?.city?.message}</p>
              </div>
              <div>
                <label htmlFor="start">point gps de départ</label>
                <input
                  {...register("start")}
                  id="start"
                  name="start"
                  type="text"
                  placeholder="point gps de départ"
                />
                <p className="error">{errors?.start?.message}</p>
              </div>

              {/* modifier pour choose many avec recherche par title*/}
              <div>
                <label htmlFor="epreuves">Liste d'épreuves</label>
                <input
                  {...register("epreuves")}
                  id="epreuves"
                  name="epreuves"
                  type="text"
                  placeholder="Liste d'épreuves"
                />
                <p className="error">{errors?.epreuves?.message}</p>
              </div>

              <button type="submit" disabled={loading}>
                Créer le parkour
              </button>

              {/* <div>
                <span>{error?.message}</span>
              </div> */}
            </form>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneParkour;
