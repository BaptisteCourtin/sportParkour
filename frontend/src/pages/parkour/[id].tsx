import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  GetEpreuveByIdQuery,
  useGetParkourByIdLazyQuery,
  useGetUserFavByTokenAndParkourIdLazyQuery,
  useIsAdminQuery,
  useIsClientQuery,
  useGetUserNoteByTokenAndParkourIdLazyQuery,
  Difficulty,
} from "@/types/graphql";

import Rating from "@mui/material/Rating";
import {
  FaLocationDot,
  FaPersonRunning,
  FaStopwatch,
  FaArrowUpRightDots,
  FaArrowRight,
} from "react-icons/fa6";

import DisplayComment from "@/components/parkour/displayComment";
import CardEpreuve from "@/components/epreuve/cardEpreuve";
import LikeParkour from "@/components/user/likeParkour";
import SuppNoteParkour from "@/components/user/suppNoteParkour";
import PutNoteParkour from "@/components/user/putNoteParkour";
import GoToHome from "@/components/goBack";
import MyCarousel from "@/components/myCarousel";
import MiniCardParkour from "@/components/parkour/miniCardParkour";

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
  }, [id]);

  // --- MODIF LIKE ---
  const [isLiked, setIsLiked] = useState(false);

  // --- MODIF NOTE ---
  const [myNote, setMyNote] = useState(0);
  const [myComment, setMyComment] = useState("");

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
              <div className="topButtLinker">
                {dataIsAdmin && (
                  <Link
                    className="button"
                    href={`/admin/modifyParkour/${data.getParkourById.id}`}
                  >
                    Modifier ce parkour <FaArrowRight />
                  </Link>
                )}

                <GoToHome />
              </div>

              <div className="topButtPutter">
                {/* --- METTRE NOTE --- */}
                <PutNoteParkour
                  myNote={myNote}
                  setMyNote={setMyNote}
                  myComment={myComment}
                  setMyComment={setMyComment}
                  parkourId={id as string}
                  dataIsClient={dataIsClient?.isClient}
                />

                {/* --- SUPPRIMER NOTE --- */}
                <SuppNoteParkour
                  myNote={myNote}
                  setMyNote={setMyNote}
                  setMyComment={setMyComment}
                  parkourId={id as string}
                  dataIsClient={dataIsClient?.isClient}
                />

                {/* --- LIKE --- */}
                <LikeParkour
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  parkourId={id as string}
                  dataIsClient={dataIsClient?.isClient}
                />
              </div>
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
              <p className="button">
                <FaStopwatch />{" "}
                {(data.getParkourById.time - (data.getParkourById.time % 60)) /
                  60}
                h {data.getParkourById.time % 60}
              </p>
              <p className="button">
                <FaPersonRunning /> {data.getParkourById.length} km
              </p>
              <p className="button">
                <FaArrowUpRightDots />
                {data.getParkourById.difficulty == Difficulty.Easy
                  ? "facile"
                  : data.getParkourById.difficulty == Difficulty.Medium
                  ? "moyen"
                  : "difficile"}
              </p>
            </div>

            {data.getParkourById.images &&
              data.getParkourById.images.length > 0 && (
                <MyCarousel dataImages={data.getParkourById.images} />
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

            <div className="container-parkour-connect">
              <h3>Les parkours en relations :</h3>
              {data.getParkourById.parkourConnect?.length ? (
                <ul>
                  {data.getParkourById.parkourConnect?.map((parkourConnect) => (
                    <MiniCardParkour parkourConnect={parkourConnect} />
                  ))}
                </ul>
              ) : null}
              {data.getParkourById.parkourConnectInverse?.length ? (
                <ul>
                  {data.getParkourById.parkourConnectInverse?.map(
                    (parkourConnect) => (
                      <MiniCardParkour parkourConnect={parkourConnect} />
                    )
                  )}
                </ul>
              ) : null}

              {!data.getParkourById.parkourConnect?.length &&
              !data.getParkourById.parkourConnectInverse?.length
                ? "Y'en a pas"
                : null}
            </div>

            {/* --- NOTES ET COMMENTAIRES --- */}
            <hr />

            {data.getParkourById.notesParkours && (
              <section className="allComms">
                <div className="titreAvecLosange">
                  <i className="losange"></i>
                  <h2>AVIS SUR LE PARKOUR</h2>
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
