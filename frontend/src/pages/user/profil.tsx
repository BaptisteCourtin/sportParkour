import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDeleteUserMutation, useGetUserLazyQuery } from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";

// get le user en fonction du token et du mail et pas du router
const profil = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getUser, { data, loading, error }] = useGetUserLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getUser({
        variables: { getUserId: id as string },
        onCompleted(data) {
          console.log(data);
        },
        onError(err: any) {
          console.log("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- DELETE EPREUVE ---
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
        data?.getUser && (
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Delete profil user {data.getUser.id}
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

                  if (data.getUser.name == nomUser) {
                    console.log("OUI");
                    handleDeleteUser(data.getUser.id);

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
              <DialogTitle>Delete user {data.getUser.id}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Pour supprimer cette user entrez son nom :{data.getUser.name}
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
            <p>nom : {data.getUser.name}</p>
            <br />
            <br />
            <p>prénom : {data.getUser.firstname}</p>
            <br />
            <br />
            <p>email : {data.getUser.email}</p>
            <br />
            <br />
            <p>ville : {data.getUser.city}</p>
            <br />
            <br />
            <p>codePostal : {data.getUser.codePostal}</p>
            <br />
            <br />
            <p>phone : {data.getUser.phone}</p>
          </div>
        )
      )}
    </main>
  );
};

export default profil;
