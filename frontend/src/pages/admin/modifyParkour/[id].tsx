import {
  GetEpreuveByIdQuery,
  useDeleteParkourMutation,
  useGetParkourByIdLazyQuery,
} from "@/types/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const modifyOneParkour = () => {
  const router = useRouter();
  const { id } = router.query;

  const [getParkour, { data, loading, error }] = useGetParkourByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getParkour({
        variables: { getParkourByIdId: +id },
        // onCompleted(data) {
        //   console.log(data);
        // },
        onError(err: any) {
          console.log("error", err);
        },
      });
    }
  }, [router.isReady]);

  // --- DELETE PARKOUR ---
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [deleteParkour, { loading: loadingDelete, error: errorDelete }] =
    useDeleteParkourMutation();

  function handleDeleteParkour(id: string): void {
    if (id) {
      deleteParkour({
        variables: { deleteParkourId: +id },
        onCompleted() {
          router.push(`/`);
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
    <main className="modifyOneParkour">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <>
            <div className="parkourToDelete">
              <Button variant="outlined" onClick={handleClickOpen}>
                Delete parkour {data.getParkourById.id}
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
                    const nomParkour = formJson.nomParkour;

                    if (data.getParkourById.title == nomParkour) {
                      console.log("OUI");
                      handleDeleteParkour(data.getParkourById.id);

                      if (errorDelete) {
                        handleClickClose();
                        setSnackComment(errorDelete?.message);
                        handleClickSnack();
                      }
                    } else {
                      handleClickClose();
                      setSnackComment("Le nom du parkour ne correspond pas");
                      handleClickSnack();
                    }
                  },
                }}
              >
                <DialogTitle>
                  Delete parkour {data.getParkourById.id}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Pour supprimer ce parkour entrez son nom :
                    {data.getParkourById.title}
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
            </div>

            <form>
              <p>titre : {data.getParkourById.title}</p>
              <br />
              <br />
              <p>description : {data.getParkourById.description}</p>
              <p>city : {data.getParkourById.city}</p>
              <br />
              <br />
              <p>difficulty : {data.getParkourById.difficulty}</p>
              <br />
              <br />
              <p>length : {data.getParkourById.length}</p>
              <br />
              <br />
              <a
                href={`https://www.google.fr/maps/place/${data.getParkourById.start}`}
                target="blank"
              >
                {data.getParkourById.start}
              </a>
              <br />
              <br />
              <p>time : {data.getParkourById.time}</p>
              <br />
              <br />
              <p>note : {data.getParkourById.note}</p>
              <br />
              <br />
              <p>nbVote : {data.getParkourById.nbVote}</p>
              <br />
              <br />

              {data.getParkourById.images &&
                data.getParkourById.images.length > 0 && (
                  <Carousel
                    className="carrouselParkour"
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
                    {data.getParkourById.images?.map((image) => (
                      <div className="imageContainer">
                        <img src={image.lien as string} alt="" />
                      </div>
                    ))}
                  </Carousel>
                )}

              <br />
              <br />
              <div className="container-epreuves">
                {data.getParkourById.epreuves?.map(
                  (epreuve: GetEpreuveByIdQuery["getEpreuveById"]) => (
                    <Link href={`/admin/modifyEpreuve/${epreuve.id}`}>
                      {epreuve.title}
                    </Link>
                  )
                )}
              </div>
            </form>
          </>
        )
      )}
    </main>
  );
};

export default modifyOneParkour;
