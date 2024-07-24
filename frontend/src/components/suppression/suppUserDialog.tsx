import React, { useState } from "react";

import { useDeleteUserMutation } from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import toast from "react-hot-toast";
import router from "next/router";

// dialog pour supprimer son compte
const suppUserDialog = ({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteUser, { loading: loadingDelete, error: errorDelete }] =
    useDeleteUserMutation();

  function handleDeleteUser(): void {
    if (userId) {
      deleteUser({
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
    <div className="supp">
      <button className="danger" onClick={handleClickOpen}>
        Supprimer mon compte
      </button>

      <Dialog
        open={open}
        onClose={handleClickClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const emailUser = formJson.emailUser;

            if (userEmail == emailUser) {
              handleDeleteUser();

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
        <DialogTitle>Vous êtes entrain de vous supprimer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour vous supprimer, entrez votre mail : {userEmail}
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
  );
};

export default suppUserDialog;
