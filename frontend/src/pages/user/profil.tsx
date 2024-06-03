import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  useDeleteUserMutation,
  useGetUserByTokenLazyQuery,
  useIsAdminQuery,
  useModifyUserMutation,
  UserUpdateEntity,
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

let modifyUserSchema = object({
  email: string().required("Veuillez entrer un email"),
  name: string().required("Veuillez entrer un nom"),
  firstname: string().required("Veuillez entrer un prénom"),
  city: string(),
  codePostal: string(),
  phone: string(),
});

// mettre les infos dans un form
const profil = () => {
  const router = useRouter();

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const [getUser, { data, loading, error }] = useGetUserByTokenLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getUser({
      onCompleted(data) {
        console.log(data);
        setValue("email", data.getUserByToken.email ?? "");
        setValue("name", data.getUserByToken.name ?? "");
        setValue("firstname", data.getUserByToken.firstname ?? "");
        setValue("city", data.getUserByToken.city ?? "");
        setValue("codePostal", data.getUserByToken.codePostal ?? "");
        setValue("phone", data.getUserByToken.phone ?? "");
      },
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, []);

  // --- MODIFY ---
  const [isModifMode, setIsModifMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(modifyUserSchema),
    defaultValues: {
      email: "",
      name: "",
      firstname: "",
      city: "",
      codePostal: "",
      phone: "",
    },
  });

  const [
    modifyUser,
    { data: dataModify, loading: loadingModify, error: errorModify },
  ] = useModifyUserMutation({
    fetchPolicy: "no-cache",
  });

  const handleModifyUser = (dataForm: UserUpdateEntity): void => {
    if (dataForm.email && dataForm.name && dataForm.firstname) {
      modifyUser({
        variables: { infos: dataForm },
        onCompleted(data) {
          if (data.modifyUser.id) {
            setIsModifMode(false);
            router.push(`/user/profil`);
          }
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  };

  // --- DELETE USER ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteUser, { loading: loadingDelete, error: errorDelete }] =
    useDeleteUserMutation();

  function handleDeleteUser(id: string): void {
    if (id) {
      deleteUser({
        variables: { deleteUserId: id },
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
    <main className="profil">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getUserByToken && (
          <>
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Delete profil user {data.getUserByToken.id}
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
                    const nomUser = formJson.nomUser;

                    if (data.getUserByToken.name == nomUser) {
                      handleDeleteUser(data.getUserByToken.id);

                      if (errorDelete) {
                        handleClickClose();
                        setSnackComment(errorDelete?.message);
                        handleClickSnack();
                      }
                    } else {
                      handleClickClose();
                      setSnackComment("Le nom de l'user ne correspond pas");
                      handleClickSnack();
                    }
                  },
                }}
              >
                <DialogTitle>Delete user {data.getUserByToken.id}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer cette user entrez son nom :
                    {data.getUserByToken.name}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nomUser"
                    name="nomUser"
                    label="nom de l'user"
                    type="nomUser"
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

            {/* --- */}
            <div>
              <button onClick={() => setIsModifMode(!isModifMode)}>
                {isModifMode
                  ? "Arreter de modifier mon profil"
                  : "Modifier mon profil"}
              </button>

              {isModifMode ? (
                <form onSubmit={handleSubmit(handleModifyUser)}>
                  <div>
                    <label htmlFor="email">Votre email</label>
                    <input
                      {...register("email")}
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Indiquez votre email"
                    />
                    <p className="error">{errors?.email?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="name">Votre nom</label>
                    <input
                      {...register("name")}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Indiquez votre nom"
                    />
                    <p className="error">{errors?.name?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="firstname">Votre prénom</label>
                    <input
                      {...register("firstname")}
                      id="firstname"
                      name="firstname"
                      type="firstname"
                      placeholder="Indiquez votre prénom"
                    />
                    <p className="error">{errors?.firstname?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="city">Votre ville</label>
                    <input
                      {...register("city")}
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Indiquez votre ville"
                    />
                    <p className="error">{errors?.city?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="codePostal">Votre code postal</label>
                    <input
                      {...register("codePostal")}
                      id="codePostal"
                      name="codePostal"
                      type="text"
                      placeholder="Indiquez votre code postal"
                    />
                    <p className="error">{errors?.codePostal?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="phone">Votre numéro de téléphone</label>
                    <input
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Indiquez votre numéro de téléphone"
                    />
                    <p className="error">{errors?.phone?.message}</p>
                  </div>

                  <button type="submit" disabled={loading}>
                    Enregistrer les modifications
                  </button>

                  {/* <div>
                  <span>{error?.message}</span>
                </div> */}
                </form>
              ) : (
                <section>
                  <br />
                  <br />
                  <p>nom : {data.getUserByToken.name}</p>
                  <br />
                  <br />
                  <p>prénom : {data.getUserByToken.firstname}</p>
                  <br />
                  <br />
                  <p>email : {data.getUserByToken.email}</p>
                  <br />
                  <br />
                  <p>ville : {data.getUserByToken.city}</p>
                  <br />
                  <br />
                  <p>codePostal : {data.getUserByToken.codePostal}</p>
                  <br />
                  <br />
                  <p>phone : {data.getUserByToken.phone}</p>
                </section>
              )}
            </div>
          </>
        )
      )}

      {!dataIsAdmin ? <Link href="/user/favoris">mes favoris</Link> : null}

      <Link href="/user/logout">se déconnecter</Link>
    </main>
  );
};

export default profil;
