import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  GetUserFavByEmailQuery,
  useGetUserFavByEmailLazyQuery,
} from "@/types/graphql";

import CardFavParkour from "@/components/parkour/cardFavParkour";

// map parkours[]
const favoris = () => {
  const router = useRouter();

  const [getFav, { data, loading, error }] = useGetUserFavByEmailLazyQuery();

  useEffect(() => {
    const userEmail = Cookies.get("emailUserParkour"); // on a mis l'email en cliar a partir du middleware

    getFav({
      variables: { email: userEmail as string },
      onCompleted(data) {
        console.log(data);
      },
      onError(err: any) {
        console.log("error", err);
      },
    });
  }, [router.isReady]);

  return (
    <main className="favoris">
      <ul className="cardsFavParkour">
        {data?.getUserFavByEmail.map((parkour: any) => (
          <CardFavParkour parkour={parkour.parkours} key={parkour.parkour_id} />
        ))}
      </ul>
    </main>
  );
};

export default favoris;
