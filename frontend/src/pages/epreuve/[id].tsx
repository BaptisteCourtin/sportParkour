import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetEpreuveByIdLazyQuery, useIsAdminQuery } from "@/types/graphql";

import Carousel from "react-material-ui-carousel";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const OneEpreuve = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dateIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

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

  return (
    <main className="oneEpreuve">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getEpreuveById && (
          <div>
            {dateIsAdmin ? (
              <Link href={`/admin/modifyEpreuve/${data.getEpreuveById.id}`}>
                Modifier cette épreuve
              </Link>
            ) : null}
            <br />
            <br />
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
          </div>
        )
      )}
    </main>
  );
};

export default OneEpreuve;
