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
import { toast } from "react-hot-toast";

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
  const [isModifMode, setIsModifMode] = useState(false);

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
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, [isModifMode]);

  // --- MODIFY ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modifyUserSchema),
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
            toast.success("GG, vous avez été mis à jour 👌");
            router.push(`/user/profil`);
          }
        },
        onError(error) {
          toast.error(error.message);
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
        onCompleted(data) {
          toast.success(data.deleteUser.message);
          router.push(`/`);
        },
        onError(error) {
          toast.success(error.message);
        },
      });
    }
  }

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
                Supprimer votre profil
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
                    const emailUser = formJson.emailUser;

                    if (data.getUserByToken.email == emailUser) {
                      handleDeleteUser(data.getUserByToken.id);

                      if (errorDelete) {
                        handleClickClose();
                        toast.error(errorDelete?.message);
                      }
                    } else {
                      handleClickClose();
                      toast.error("L'email ne correspond pas");
                    }
                  },
                }}
              >
                <DialogTitle>Vous êtes entrain de cous supprimer</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer cette user entrez son nom :
                    {data.getUserByToken.email}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    fullWidth
                    variant="standard"
                    required
                    margin="dense"
                    id="emailUser"
                    name="emailUser"
                    label="votre email"
                    type="email"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>En fait, non</Button>
                  <Button type="submit">Hop, ça dégage!</Button>
                </DialogActions>
              </Dialog>
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
                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre email"
                      defaultValue={data.getUserByToken.email}
                      required
                      {...register("email")}
                      id="email"
                      type="text"
                      name="email"
                    />
                    <p className="error">{errors?.email?.message}</p>
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre nom"
                      defaultValue={data.getUserByToken.name}
                      required
                      {...register("name")}
                      id="name"
                      name="name"
                      type="text"
                    />
                    <p className="error">{errors?.name?.message}</p>
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre prénom"
                      defaultValue={data.getUserByToken.firstname}
                      required
                      {...register("firstname")}
                      id="firstname"
                      name="firstname"
                      type="firstname"
                    />
                    <p className="error">{errors?.firstname?.message}</p>
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre ville"
                      defaultValue={data.getUserByToken.city}
                      {...register("city")}
                      id="city"
                      name="city"
                      type="text"
                    />
                    <p className="error">{errors?.city?.message}</p>
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre code postal"
                      defaultValue={data.getUserByToken.codePostal}
                      {...register("codePostal")}
                      id="codePostal"
                      name="codePostal"
                      type="text"
                    />
                    <p className="error">{errors?.codePostal?.message}</p>
                  </div>

                  <div className="champ">
                    <TextField
                      className="mui-input"
                      fullWidth
                      variant="outlined"
                      label="Votre numéro de téléphone"
                      defaultValue={data.getUserByToken.phone}
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="text"
                    />
                    <p className="error">{errors?.phone?.message}</p>
                  </div>

                  <button type="submit" disabled={loadingModify}>
                    Enregistrer les modifications
                  </button>

                  <div>
                    <span>{errorModify?.message}</span>
                  </div>
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
