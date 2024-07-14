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
  useDeleteJoinUserParkourNoteMutation,
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
import { FaLocationDot } from "react-icons/fa6";
import { FaPersonRunning } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import DisplayComment from "@/components/parkour/displayComment";
import CardEpreuve from "@/components/epreuve/cardEpreuve";

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
        onError(err: any) {
          console.error("error", err);
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
        onError(err: any) {
          console.error("error", err);
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
          variables: { parkourId: parseInt(id as string) },
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
          variables: { parkourId: parseInt(id as string) },
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

  // --- SUPP NOTE ET COMMENT ---
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
    if (id) {
      deleteNote({
        variables: { parkourId: +id },
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
    <div>
      {error ? (
        <h2>une erreur... (déso) : {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <main className="oneParkour">
            {/* --- LIEN MODIFIER --- */}
            <section className="topButt">
              {dataIsAdmin && (
                <Link
                  className="button"
                  href={`/admin/modifyParkour/${data.getParkourById.id}`}
                >
                  Modifier ce parkour <FaArrowRight />
                </Link>
              )}

              {/* --- BUTTON METTRE NOTE --- */}

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

              {/* --- SUPPRIMER NOTE --- */}
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
                    <DialogTitle id="alert-dialog-title">
                      Supprimer ?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Voulez vous vraiment supprimer cette note et ce
                        commentaire
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

              {/* --- LIKE --- */}
              {dataIsClient && isLiked ? (
                <button
                  className="fav"
                  onClick={() => handleLike(false)}
                  disabled={loadingCreateFav || loadingDeleteFav}
                >
                  Supprimer des favoris
                </button>
              ) : dataIsClient && !isLiked ? (
                <button
                  className="fav"
                  onClick={() => handleLike(true)}
                  disabled={loadingCreateFav || loadingDeleteFav}
                >
                  Mettre en favoris
                </button>
              ) : null}
            </section>

            {/* --- DATA PARKOUR --- */}
            <div className="titreAvecLosange">
              <i className="losange"></i>
              <h1>{data.getParkourById.title}</h1>
            </div>

            {data.getParkourById.note ? (
              <div className="rating">
                <Rating
                  defaultValue={parseFloat(data.getParkourById.note.toFixed(1))}
                  precision={0.1}
                  readOnly
                />
                <span className="nbVote">
                  {data.getParkourById.note.toFixed(1)} sur{" "}
                  {data.getParkourById.nbVote} votes
                </span>
              </div>
            ) : (
              <p>Nouveau</p>
            )}

            <div className="depart">
              <h2 className="nomVille">{data.getParkourById.city}</h2>
              <a
                href={`https://www.google.fr/maps/place/${data.getParkourById.start}`}
                target="blank"
              >
                <FaLocationDot className="redDot" /> Y aller !
              </a>
            </div>

            <p>{data.getParkourById.description}</p>

            <div className="infos">
              <p>
                <FaStopwatch /> {data.getParkourById.time} min
              </p>
              <p>
                <FaPersonRunning /> {data.getParkourById.length} km
              </p>
              <p>
                <FaArrowUpRightDots /> {data.getParkourById.difficulty}
              </p>
            </div>

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
                  navButtonsAlwaysVisible={
                    data.getParkourById.images.length > 1 ? true : false
                  }
                  navButtonsAlwaysInvisible={
                    data.getParkourById.images.length > 1 ? false : true
                  }
                  fullHeightHover={false}
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

            <div className="container-epreuves">
              <h3>Les épreuves :</h3>
              {data.getParkourById.epreuves?.length ? (
                <ul>
                  {data.getParkourById.epreuves?.map(
                    (epreuve: GetEpreuveByIdQuery["getEpreuveById"]) => (
                      <CardEpreuve epreuve={epreuve} />
                    )
                  )}
                </ul>
              ) : (
                <p>Y'en a pas</p>
              )}
            </div>

            {/* --- NOTES --- */}
            <hr />

            {data.getParkourById.notesParkours && (
              <section className="allComms">
                <div className="titreAvecLosange">
                  <i className="losange"></i>
                  <h2>AVIS SUR LE PARCOURS</h2>
                </div>
                {data.getParkourById.notesParkours.map((comment, index) => (
                  <DisplayComment
                    comment={comment}
                    parkourId={data.getParkourById.id}
                    isAdmin={dataIsAdmin ? true : false}
                    isClient={dataIsClient ? true : false}
                  />
                ))}
              </section>
            )}
          </main>
        )
      )}
    </div>
  );
};

export default OneParkour;
