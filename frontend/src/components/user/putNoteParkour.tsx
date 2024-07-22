import React, { useState } from "react";

import { useCreateJoinUserParkourNoteMutation } from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";

import toast from "react-hot-toast";

const putNoteParkour = ({
  myNote,
  setMyNote,
  myComment,
  setMyComment,
  parkourId,
  dataIsClient,
}: {
  myNote: number;
  setMyNote: any;
  myComment: string;
  setMyComment: any;
  parkourId: string;
  dataIsClient: boolean | undefined;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [
    createNote,
    { data: dataNote, loading: loadingNote, error: errorNote },
  ] = useCreateJoinUserParkourNoteMutation();

  function handleNote(
    noteThisParkour: number,
    commentThisParkour: string
  ): void {
    if (parkourId) {
      createNote({
        variables: {
          infos: {
            parkour_id: +parkourId,
            note: +noteThisParkour,
            commentaire: commentThisParkour,
          },
        },
        onCompleted(data) {
          toast.success(data.createJoinUserParkourNote.message);
          setMyNote(+noteThisParkour);
          setMyComment(commentThisParkour);
          handleClickClose();
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  }

  // --- DEAL WITH LENGTH DURING COMMENT ---
  const [comment, setComment] = useState("");

  return (
    <div>
      {dataIsClient ? (
        <div className="supp">
          <button onClick={handleClickOpen}>
            {myNote
              ? "Modifier mon avis pour ce parkour"
              : "Mettre un avis à ce parkour"}
          </button>
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
                const noteThisParkour = formJson.noteThisParkour;
                const commentThisParkour = formJson.commentThisParkour;

                // if une note => handlePutNote
                if (noteThisParkour) {
                  handleNote(noteThisParkour, commentThisParkour);

                  if (errorNote) {
                    handleClickClose();
                    toast.error(errorNote.message);
                  }
                } else {
                  toast.error("Il faut mettre une note");
                }
              },
            }}
          >
            <DialogTitle>Note</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Mettez une note à ce parkour
              </DialogContentText>
              <Rating
                id="noteThisParkour"
                name="noteThisParkour"
                precision={0.5}
                defaultValue={myNote}
              />
              <TextField
                fullWidth
                variant="standard"
                margin="dense"
                label="Votre commentaire"
                defaultValue={myComment}
                multiline
                rows={10}
                id="commentThisParkour"
                name="commentThisParkour"
                type="text"
                inputProps={{ maxLength: 500 }}
                onChange={(e) => setComment(e.target.value)}
              />
              <span>{comment.length > 0 ? `${comment.length}/500` : ""}</span>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>En fait, non</Button>
              <Button type="submit">Hop, c'est mis!</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
};

export default putNoteParkour;
