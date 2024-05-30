import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GetEpreuveByIdQuery,
  useGetParkourByIdLazyQuery,
  useIsAdminQuery,
} from "@/types/graphql";

import Carousel from "react-material-ui-carousel";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const OneParkour = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dateIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

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

  return (
    <main className="oneParkour">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getParkourById && (
          <div>
            {dateIsAdmin ? (
              <Link href={`/admin/modifyParkour/${data.getParkourById.id}`}>
                Modifier ce parkour
              </Link>
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
