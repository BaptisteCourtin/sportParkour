import { useDeleteJoinUserParkourNoteMutation } from "@/types/graphql";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";

// dialog pour supprimer une note et le commentaire
const suppNoteParkour = ({
  myNote,
  setMyNote,
  setMyComment,
  parkourId,
  dataIsClient,
}: {
  myNote: number;
  setMyNote: any;
  setMyComment: any;
  parkourId: string;
  dataIsClient: boolean | undefined;
}) => {
  const [openDeleteNote, setOpenDeleteNote] = useState(false);

  const handleClickOpenDeleteNote = () => {
    setOpenDeleteNote(true);
  };

  const handleClickCloseDeleteNote = () => {
    setOpenDeleteNote(false);
  };

  const [deleteNote, { loading: loadingDeleteNote, error: errorDeleteNote }] =
    useDeleteJoinUserParkourNoteMutation();

  function handleDeleteNote(): void {
    if (parkourId) {
      deleteNote({
        variables: { parkourId: +parkourId },
        onCompleted(data) {
          toast.success(data?.deleteJoinUserParkourNote.message);
          setMyNote(0);
          setMyComment("");
          setOpenDeleteNote(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

  return (
    <>
      {dataIsClient && myNote ? (
        <div className="deleteMyNote">
          <button onClick={handleClickOpenDeleteNote}>
            Supprimer mon avis
          </button>
          <Dialog
            open={openDeleteNote}
            onClose={handleClickCloseDeleteNote}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Supprimer ?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Voulez vous vraiment supprimer cette note et ce commentaire
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickCloseDeleteNote}>Non</Button>
              <Button onClick={handleDeleteNote} autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </>
  );
};

export default suppNoteParkour;
