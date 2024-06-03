import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  EpreuveUpdateEntity,
  useDeleteEpreuveMutation,
  useGetEpreuveByIdLazyQuery,
  useModifyEpreuveMutation,
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
import { object, string } from "yup";

let modifyEpreuveSchema = object({
  title: string().required("Veuillez entrer un titre"),
  description: string(),
  easyToDo: string(),
  mediumToDo: string(),
  hardToDo: string(),
  videoLink: string(),
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
          setValue("title", data.getEpreuveById.title ?? "");
          setValue("description", data.getEpreuveById.description ?? "");
          setValue("easyToDo", data.getEpreuveById.easyToDo ?? "");
          setValue("mediumToDo", data.getEpreuveById.mediumToDo ?? "");
          setValue("hardToDo", data.getEpreuveById.hardToDo ?? "");
          setValue("videoLink", data.getEpreuveById.videoLink ?? "");
        },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- MODIFY ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(modifyEpreuveSchema),
    defaultValues: {
      title: "",
      description: "",
      easyToDo: "",
      mediumToDo: "",
      hardToDo: "",
      videoLink: "",
    },
  });

  const [
    modifyEpreuve,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyEpreuveMutation({
    fetchPolicy: "no-cache",
  });

  const handleModifyEpreuve = (dataForm: EpreuveUpdateEntity): void => {
    if (dataForm.title && id) {
      modifyEpreuve({
        variables: { infos: dataForm, modifyEpreuveId: parseInt(id as string) },
        onCompleted(data) {
          if (data.modifyEpreuve.id) {
            router.push(`/epreuve/${data.modifyEpreuve.id}`);
          }
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  };

  // --- DELETE EPREUVE ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteEpreuve, { loading: loadingDelete, error: errorDelete }] =
    useDeleteEpreuveMutation();

  function handleDeleteEpreuve(id: string): void {
    if (id) {
      deleteEpreuve({
        variables: { deleteEpreuveId: +id },
        onCompleted() {
          router.push(`/epreuve/allEpreuves`);
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
    <main className="modifyOneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <>
            <div className="epreuveToDelete">
              <Button variant="outlined" onClick={handleClickOpen}>
                Delete epreuve
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
                    const nomEpreuve = formJson.nomEpreuve;

                    if (data.getEpreuveById.title == nomEpreuve) {
                      handleDeleteEpreuve(data.getEpreuveById.id);

                      if (errorDelete) {
                        handleClickClose();
                        setSnackComment(errorDelete?.message);
                        handleClickSnack();
                      }
                    } else {
                      handleClickClose();
                      setSnackComment("Le nom de l'épreuve ne correspond pas");
                      handleClickSnack();
                    }
                  },
                }}
              >
                <DialogTitle>
                  Delete epreuve {data.getEpreuveById.id}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer cette épreuve entrez son nom :
                    {data.getEpreuveById.title}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nomEpreuve"
                    name="nomEpreuve"
                    label="nom de l'épreuve"
                    type="nomEpreuve"
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

            <form onSubmit={handleSubmit(handleModifyEpreuve)}>
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
                <label htmlFor="easyToDo">Que faire (version débutant)</label>
                <textarea
                  {...register("easyToDo")}
                  id="easyToDo"
                  name="easyToDo"
                  placeholder="Que faire (version débutant)"
                ></textarea>
                <p className="error">{errors?.easyToDo?.message}</p>
              </div>
              <div>
                <label htmlFor="mediumToDo">
                  Que faire (version intermédiaire)
                </label>
                <textarea
                  {...register("mediumToDo")}
                  id="mediumToDo"
                  name="mediumToDo"
                  placeholder="Que faire (version medium)"
                ></textarea>
                <p className="error">{errors?.mediumToDo?.message}</p>
              </div>
              <div>
                <label htmlFor="hardToDo">Que faire (version confirmé)</label>
                <textarea
                  {...register("hardToDo")}
                  id="hardToDo"
                  name="hardToDo"
                  placeholder="Que faire (version hard)"
                ></textarea>
                <p className="error">{errors?.hardToDo?.message}</p>
              </div>

              <div>
                <label htmlFor="videoLink">Le lien video</label>
                <input
                  {...register("videoLink")}
                  id="videoLink"
                  name="videoLink"
                  type="text"
                  placeholder="Le lien video"
                />
                <p className="error">{errors?.videoLink?.message}</p>
              </div>

              <button type="submit" disabled={loading}>
                Modifier l'épreuve
              </button>

              <div>
                <span>{errorModify?.message}</span>
              </div>
            </form>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneEpreuve;
