import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  GetEpreuveByIdQuery,
  useCreateJoinUserParkourFavorisMutation,
  useGetParkourByIdLazyQuery,
  useGetUserFavByTokenAndParkourIdLazyQuery,
  useIsAdminQuery,
  useIsClientQuery,
  useCreateJoinUserParkourNoteMutation,
  useGetUserNoteByTokenAndParkourIdLazyQuery,
  useDeleteJoinUserParkourFavorisMutation,
} from "@/types/graphql";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";

import Carousel from "react-material-ui-carousel";
import { toast } from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const OneParkour = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const {
    data: dataIsClient,
    loading: loadingIsClient,
    error: errorIsClient,
  } = useIsClientQuery();

  // --- GET INFOS PARKOUR && INFOS JOIN-USER-PARKOUR ---
  const [getParkour, { data, loading, error }] = useGetParkourByIdLazyQuery();
  const [
    getIsParkourFav,
    {
      data: dataIsParkourFav,
      loading: loadingIsParkourFav,
      error: errorIsParkourFav,
    },
  ] = useGetUserFavByTokenAndParkourIdLazyQuery();

  const [
    getParkourNote,
    {
      data: dataIsParkourNote,
      loading: loadingIsParkourNote,
      error: errorIsParkourNote,
    },
  ] = useGetUserNoteByTokenAndParkourIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getParkour({
        variables: { getParkourByIdId: +id },
        onError(err: any) {
          console.error("error", err);
        },
      });

      getIsParkourFav({
        variables: { parkourId: +id },
        onCompleted(data) {
          setIsLiked(data.getUserFavByTokenAndParkourId);
        },
      });

      getParkourNote({
        variables: { parkourId: +id },
        onCompleted(data) {
          setMyNote(data.getUserNoteByTokenAndParkourId.note as number);
          setMyComment(
            data.getUserNoteByTokenAndParkourId.commentaire as string
          );
        },
      });
    }
  }, [router.isReady]);

  // --- MODIF LIKE ---
  const [isLiked, setIsLiked] = useState(false);

  const [
    createFav,
    { data: dataCreateFav, loading: loadingCreateFav, error: errorCreateFav },
  ] = useCreateJoinUserParkourFavorisMutation();

  const [
    deleteFav,
    { data: dataDeleteFav, loading: loadingDeleteFav, error: errorDeleteFav },
  ] = useDeleteJoinUserParkourFavorisMutation();

  const handleLike = (isFav: boolean): void => {
    if (id) {
      if (isFav) {
        createFav({
          variables: { idParkour: parseInt(id as string) },
          onCompleted(data) {
            toast.success(data.createJoinUserParkourFavoris.message);
            setIsLiked(!isLiked);
          },
          onError(error) {
            console.error(error);
          },
        });
      } else {
        deleteFav({
          variables: { idParkour: parseInt(id as string) },
          onCompleted(data) {
            toast.success(data.deleteJoinUserParkourFavoris.message);
            setIsLiked(!isLiked);
          },
          onError(error) {
            console.error(error);
          },
        });
      }
    }
  };

  // --- MODIF NOTE ---
  const [myNote, setMyNote] = useState(0);
  const [myComment, setMyComment] = useState("");
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
    if (id) {
      createNote({
        variables: {
          infos: {
            parkour_id: +id,
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
    <main className="oneParkour">
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <div>
            {dataIsAdmin ? (
              <Link href={`/admin/modifyParkour/${data.getParkourById.id}`}>
                Modifier ce parkour
              </Link>
            ) : null}

            {dataIsClient ? (
              <div className="supp">
                <Button variant="outlined" onClick={handleClickOpen}>
                  Mettre une note à ce parkour
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
                    <span>
                      {comment.length > 0 ? `${comment.length}/500` : ""}
                    </span>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickClose}>En fait, non</Button>
                    <Button type="submit">Hop, c'est mis!</Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}

            <br />
            <br />
            {dataIsClient && isLiked ? (
              <button onClick={() => handleLike(false)}>
                Supprimer des favoris
              </button>
            ) : dataIsClient && !isLiked ? (
              <button onClick={() => handleLike(true)}>
                Mettre en favoris
              </button>
            ) : null}
            <br />
            <br />
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
                  {data.getParkourById.images
                    ?.slice()
                    .sort(function compare(a: any, b: any) {
                      if (a.isCouverture > b.isCouverture) return -1;
                      return 1;
                    })
                    .map((image) => (
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
                  <Link href={`/epreuve/${epreuve.id}`}>{epreuve.title}</Link>
                )
              )}
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default OneParkour;
