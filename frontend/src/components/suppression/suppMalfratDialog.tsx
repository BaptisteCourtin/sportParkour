import React, { useState } from "react";
import toast from "react-hot-toast";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useDeleteUserByAdminMutation } from "@/types/graphql";
import { useRouter } from "next-router-mock";

const suppMalfratDialog = ({ dataMalfrat }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [
    deleteUserByAdmin,
    {
      data: dataDeleteUser,
      loading: loadingDeleteUser,
      error: errorDeleteUser,
    },
  ] = useDeleteUserByAdminMutation({
    fetchPolicy: "no-cache",
  });

  function handleDeleteUser(idUserToSupp: string): void {
    if (idUserToSupp) {
      deleteUserByAdmin({
        variables: { malfratId: idUserToSupp as string },
        onCompleted(data) {
          toast.success(data.deleteUserByAdmin.message);
          router.push(`/admin/reports/recherche`);
        },
        onError(error) {
          toast.success(error.message);
        },
      });
    }
  }

  return (
    <div className="supp">
      <button onClick={handleClickOpen}>Supprimer cet utilisateur</button>
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

            if (dataMalfrat.email == emailUser) {
              handleDeleteUser(dataMalfrat.id);

              if (errorDeleteUser) {
                handleClickClose();
                toast.error(errorDeleteUser?.message);
              }
            } else {
              handleClickClose();
              toast.error("L'email ne correspond pas");
            }
          },
        }}
      >
        <DialogTitle>Vous êtes entrain de supprimer un utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour supprimer cet utilisateur, entrez son email :{" "}
            {dataMalfrat.email}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            required
            margin="dense"
            id="emailUser"
            name="emailUser"
            label="l'email de l'utilisateur"
            type="text"
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

export default suppMalfratDialog;
