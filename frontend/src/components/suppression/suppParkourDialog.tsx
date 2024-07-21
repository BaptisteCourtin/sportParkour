import React, { useState } from "react";
import router from "next/router";

import { useDeleteParkourMutation } from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import toast from "react-hot-toast";

const suppParkourDialog = ({
  parkourTitle,
  parkourId,
}: {
  parkourTitle: string;
  parkourId: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteParkour, { loading: loadingDelete, error: errorDelete }] =
    useDeleteParkourMutation();

  function handleDeleteParkour(): void {
    if (parkourId) {
      deleteParkour({
        variables: { deleteParkourId: +parkourId },
        onCompleted(data) {
          toast.success(data.deleteParkour.message);
          router.push(`/`);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

  return (
    <div className="parkourToDelete">
      <button className="danger" onClick={handleClickOpen}>
        Delete parkour
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
            const nomParkour = formJson.nomParkour;

            if (parkourTitle == nomParkour) {
              handleDeleteParkour();

              if (errorDelete) {
                handleClickClose();
                toast.error(errorDelete?.message);
              }
            } else {
              handleClickClose();
              toast.error("Le nom du parkour ne correspond pas");
            }
          },
        }}
      >
        <DialogTitle>Delete parkour {parkourId}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour supprimer cette épreuve entrez son nom : {parkourTitle}
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
    </div>
  );
};

export default suppParkourDialog;
