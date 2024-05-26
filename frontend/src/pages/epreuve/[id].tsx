import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useDeleteEpreuveMutation,
  useGetEpreuveLazyQuery,
} from "@/types/graphql";
import Carousel from "react-material-ui-carousel";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";

// intégrer yt
const OneEpreuve = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getEpreuve, { data, loading, error }] = useGetEpreuveLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      getEpreuve({
        variables: { getEpreuveId: parseInt(id as string) },
        // onCompleted(data) {
        //   console.log(data);
        // },
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

  const [deleteEpreuve, { loading: loadingDelete, error: errorDelete }] =
    useDeleteEpreuveMutation();

  function handleDeleteEpreuve(id: string): void {
    if (id) {
      deleteEpreuve({
        variables: { deleteEpreuveId: +id },
        onCompleted() {
          router.push(`/epreuve/allEpreuves`);
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
    <main className="oneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuve && (
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Delete epreuve {data.getEpreuve.id}
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
                  const nomEpreuve = formJson.nomEpreuve;

                  if (data.getEpreuve.title == nomEpreuve) {
                    console.log("OUI");
                    handleDeleteEpreuve(data.getEpreuve.id);

                    if (errorDelete) {
                      handleClickClose();
                      setSnackComment(errorDelete?.message);
                      handleClickSnack();
                    }
                  } else {
                    handleClickClose();
                    setSnackComment("Le nom de l'épreuve ne correspond pas");
                    handleClickSnack();
                  }
                },
              }}
            >
              <DialogTitle>Delete epreuve {data.getEpreuve.id}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Pour supprimer cette épreuve entrez son nom :
                  {data.getEpreuve.title}
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
            <p>{data.getEpreuve.title}</p>
            <br />
            <br />
            <p>{data.getEpreuve.description}</p>
            <br />
            <br />
            {data.getEpreuve.images && data.getEpreuve.images.length > 0 && (
              <Carousel
                className="carrouselEpreuve"
                NextIcon={<FaAngleRight />}
                PrevIcon={<FaAngleLeft />}
                autoPlay={false}
                indicators={true}
                swipe={true}
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                fullHeightHover={true}
                animation="slide"
              >
                {data.getEpreuve.images.map((image) => (
                  <div className="imageContainer">
                    <img src={image.lien as string} alt="" />
                  </div>
                ))}
              </Carousel>
            )}
            <p>Débutant : {data.getEpreuve.easyToDo}</p>
            <br />
            <br />
            <p>Intermédiaire : {data.getEpreuve.mediumToDo}</p>
            <br />
            <br />
            <p>Confirmé : {data.getEpreuve.hardToDo}</p>
            <br />
            <br />
            {data.getEpreuve.videoLink && (
              <a target="blank" href={data.getEpreuve.videoLink}>
                {data.getEpreuve.videoLink}
              </a>
            )}
          </div>
        )
      )}
    </main>
  );
};

export default OneEpreuve;
