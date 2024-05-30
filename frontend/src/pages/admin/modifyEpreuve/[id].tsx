import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  useDeleteEpreuveMutation,
  useGetEpreuveByIdLazyQuery,
} from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";

import Carousel from "react-material-ui-carousel";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const modifyOneEpreuve = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getEpreuve, { data, loading, error }] = useGetEpreuveByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getEpreuve({
        variables: { getEpreuveByIdId: +id },
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
    <main className="modifyOneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <>
            <div className="epreuveToDelete">
              <Button variant="outlined" onClick={handleClickOpen}>
                Delete epreuve
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

                    if (data.getEpreuveById.title == nomEpreuve) {
                      console.log("OUI");
                      handleDeleteEpreuve(data.getEpreuveById.id);

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
                <DialogTitle>
                  Delete epreuve {data.getEpreuveById.id}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer cette épreuve entrez son nom :
                    {data.getEpreuveById.title}
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
            </div>

            <form action="">
              <p>{data.getEpreuveById.title}</p>
              <br />
              <br />
              <p>{data.getEpreuveById.description}</p>
              <br />
              <br />
              {data.getEpreuveById.images &&
                data.getEpreuveById.images.length > 0 && (
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
                    {data.getEpreuveById.images.map((image) => (
                      <div className="imageContainer">
                        <img src={image.lien as string} alt="" />
                      </div>
                    ))}
                  </Carousel>
                )}
              <p>Débutant : {data.getEpreuveById.easyToDo}</p>
              <br />
              <br />
              <p>Intermédiaire : {data.getEpreuveById.mediumToDo}</p>
              <br />
              <br />
              <p>Confirmé : {data.getEpreuveById.hardToDo}</p>
              <br />
              <br />
              {data.getEpreuveById.videoLink && (
                <iframe
                  width="1236"
                  height="695"
                  src={`https://www.youtube.com/embed/${
                    data.getEpreuveById.videoLink.split("watch?v=")[1]
                  }`}
                ></iframe>
              )}
            </form>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneEpreuve;
