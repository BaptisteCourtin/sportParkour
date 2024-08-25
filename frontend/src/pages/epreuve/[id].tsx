import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useGetEpreuveByIdLazyQuery, useIsAdminQuery } from "@/types/graphql";

import { FaArrowRight } from "react-icons/fa6";

import GoBack from "@/components/goBack";
import MyCarousel from "@/components/myCarousel";

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
  }, [id]);

  return (
    <div>
      {error ? (
        <h2>une erreur... (déso) {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <main className="oneEpreuve">
            {/* --- LIEN MODIFIER --- */}
            <div className="topButtLinker">
              {dataIsAdmin ? (
                <Link
                  className="button"
                  href={`/admin/modifyEpreuve/${data.getEpreuveById.id}`}
                >
                  Modifier cette épreuve <FaArrowRight />
                </Link>
              ) : null}

              <GoBack />
            </div>

            {/* --- DATA EPREUVE --- */}
            <div className="titreAvecLosange">
              <i className="losange"></i>
              <h1>{data.getEpreuveById.title}</h1>
            </div>

            <p>{data.getEpreuveById.description}</p>

            {data.getEpreuveById.images &&
              data.getEpreuveById.images.length > 0 && (
                <MyCarousel dataImages={data.getEpreuveById.images} />
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
