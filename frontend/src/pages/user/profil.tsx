import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useDeleteUserMutation,
  useGetUserByTokenLazyQuery,
  useIsAdminQuery,
} from "@/types/graphql";
import Cookies from "js-cookie";
import Link from "next/link";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";

// mettre les infos dans un form
const profil = () => {
  const router = useRouter();

  const {
    data: dateIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const [getUser, { data, loading, error }] = useGetUserByTokenLazyQuery();

  useEffect(() => {
    getUser({
      onCompleted(data) {
        console.log(data);
      },
      onError(err: any) {
        console.log("error", err);
      },
    });
  }, []);

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
          router.push(`/user/allUsers`);
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
                    console.log("OUI");
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

            {/* --- */}

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
          </div>
        )
      )}

      {!dateIsAdmin ? <Link href="/user/favoris">mes favoris</Link> : null}

      <Link href="/user/logout">se déconnecter</Link>
    </main>
  );
};

export default profil;
