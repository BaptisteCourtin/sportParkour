import React, { useState } from "react";
import router from "next/router";

import { useDeleteEpreuveMutation } from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import toast from "react-hot-toast";

// dialog pour supprimer une epreuve
const suppEpreuveDialog = ({
  epreuveTitle,
  epreuveId,
}: {
  epreuveTitle: string;
  epreuveId: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteEpreuve, { loading: loadingDelete, error: errorDelete }] =
    useDeleteEpreuveMutation();

  function handleDeleteEpreuve(): void {
    if (epreuveId) {
      deleteEpreuve({
        variables: { deleteEpreuveId: +epreuveId },
        onCompleted(data) {
          if (data.deleteEpreuve.success) {
            toast.success(data.deleteEpreuve.message);
          } else {
            toast.error(data.deleteEpreuve.message);
          }
          router.push(`/epreuve/allEpreuves`);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

  return (
    <div className="epreuveToDelete">
      <button className="danger" onClick={handleClickOpen}>
        Delete epreuve
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
            const nomEpreuve = formJson.nomEpreuve;

            if (epreuveTitle == nomEpreuve) {
              handleDeleteEpreuve();

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
        <DialogTitle>Delete epreuve {epreuveId}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour supprimer cette épreuve entrez son nom : {epreuveTitle}
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
  );
};

export default suppEpreuveDialog;
