import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetAllUserFavByTokenLazyQuery } from "@/types/graphql";

import CardFavParkour from "@/components/parkour/cardFavParkour";

// map parkours[]
const favoris = () => {
  const router = useRouter();

  const [getFav, { data, loading, error }] = useGetAllUserFavByTokenLazyQuery();

  useEffect(() => {
    getFav({
      // onCompleted(data) {
      //   console.log(data);
      // },
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, []);

  return (
    <main className="favoris">
      <ul className="cardsFavParkour">
        {data?.getAllUserFavByToken.map((parkour: any) => (
          <CardFavParkour parkour={parkour.parkours} key={parkour.parkour_id} />
        ))}
      </ul>
    </main>
  );
};

export default favoris;
