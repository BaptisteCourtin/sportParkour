import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetEpreuveByIdLazyQuery, useIsAdminQuery } from "@/types/graphql";

import Carousel from "react-material-ui-carousel";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const OneEpreuve = () => {
  // savoir la taille de l'écran (en temps réel)
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
    }
  }, []);

  // ---
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const [getEpreuve, { data, loading, error }] = useGetEpreuveByIdLazyQuery();

  useEffect(() => {
    if (router.isReady && id) {
      getEpreuve({
        variables: { getEpreuveByIdId: +id },
        onError(err: any) {
          console.error("error", err);
        },
      });
    }
  }, [router.isReady]);

  return (
    <div>
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <main className="oneEpreuve">
            {/* --- LIEN MODIFIER --- */}
            {dataIsAdmin ? (
              <Link
                className="button"
                href={`/admin/modifyEpreuve/${data.getEpreuveById.id}`}
              >
                Modifier cette épreuve
              </Link>
            ) : null}

            {/* --- DATA EPREUVE --- */}
            <div className="titreAvecLosange">
              <i className="losange"></i>
              <h1>{data.getEpreuveById.title}</h1>
            </div>

            <p>{data.getEpreuveById.description}</p>

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
                  navButtonsAlwaysVisible={
                    data.getEpreuveById.images.length > 1 ? true : false
                  }
                  navButtonsAlwaysInvisible={
                    data.getEpreuveById.images.length > 1 ? false : true
                  }
                  fullHeightHover={false}
                  animation="slide"
                >
                  {data.getEpreuveById.images
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

            <div className="infoDifficulty">
              <div>
                <h3>Débutant :</h3>
                <span>
                  {data.getEpreuveById.easyToDo
                    ? data.getEpreuveById.easyToDo
                    : "non renseigné"}
                </span>
              </div>
              <div>
                <h3>Intermédiaire :</h3>
                <span>
                  {data.getEpreuveById.mediumToDo
                    ? data.getEpreuveById.mediumToDo
                    : "non renseigné"}
                </span>
              </div>
              <div>
                <h3>Confirmé :</h3>
                <span>
                  {data.getEpreuveById.hardToDo
                    ? data.getEpreuveById.hardToDo
                    : "non renseigné"}
                </span>
              </div>
            </div>

            {data.getEpreuveById.videoLink && (
              <iframe
                className="videoEpreuve"
                width={windowWidth > 800 ? 720 : 360}
                height={windowWidth > 800 ? 405 : 203}
                src={`https://www.youtube.com/embed/${
                  data.getEpreuveById.videoLink.split("watch?v=")[1]
                }`}
              ></iframe>
            )}
          </main>
        )
      )}
    </div>
  );
};

export default OneEpreuve;
