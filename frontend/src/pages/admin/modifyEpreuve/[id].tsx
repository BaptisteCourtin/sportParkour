import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

import { toast } from "react-hot-toast";

let modifyEpreuveSchema = object({
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
  videoLink: string().max(300, "max 300, carcatères normalement ça suffit"),
});

const modifyOneEpreuve = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getEpreuve, { data, loading, error }] = useGetEpreuveByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getEpreuve({
        variables: { getEpreuveByIdId: +id },
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

  const handleModifyEpreuve = (dataForm: EpreuveUpdateEntity): void => {
    if (dataForm.title && id) {
      modifyEpreuve({
        variables: { infos: dataForm, modifyEpreuveId: parseInt(id as string) },
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
        onCompleted(data) {
          toast.success(data.deleteEpreuve.message);
          router.push(`/epreuve/allEpreuves`);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

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
            <form onSubmit={handleSubmit(handleModifyEpreuve)}>
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
                  defaultValue={data.getEpreuveById.description}
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

              <div className="champ">
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="Que faire (version débutant)"
                  defaultValue={data.getEpreuveById.easyToDo}
                  multiline
                  rows={6}
                  {...register("easyToDo")}
                  id="easyToDo"
                  name="easyToDo"
                  type="text"
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) =>
                    handleChangeAThing("easyToDo", e.target.value)
                  }
                />
                <span>
                  {values.easyToDo.length > 0
                    ? `${values.easyToDo.length}/250`
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
                  rows={6}
                  {...register("mediumToDo")}
                  id="mediumToDo"
                  name="mediumToDo"
                  type="text"
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) =>
                    handleChangeAThing("mediumToDo", e.target.value)
                  }
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
                  defaultValue={data.getEpreuveById.hardToDo}
                  multiline
                  rows={6}
                  {...register("hardToDo")}
                  id="hardToDo"
                  name="hardToDo"
                  type="text"
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) =>
                    handleChangeAThing("hardToDo", e.target.value)
                  }
                />
                <span>
                  {values.hardToDo.length > 0
                    ? `${values.hardToDo.length}/250`
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
                  inputProps={{ maxLength: 300 }}
                  onChange={(e) =>
                    handleChangeAThing("videoLink", e.target.value)
                  }
                />
                <span>
                  {values.videoLink.length > 0
                    ? `${values.videoLink.length}/300`
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
                        toast.error(errorDelete?.message);
                      }
                    } else {
                      handleClickClose();
                      toast.error("Le nom de l'épreuve ne correspond pas");
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
            </div>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneEpreuve;
