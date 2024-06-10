import React, { useEffect, useState } from "react";
import { useGetAllUserFavByTokenLazyQuery } from "@/types/graphql";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import CardFavParkour from "@/components/parkour/cardFavParkour";

const favoris = () => {
  const [getFav, { data, loading, error }] = useGetAllUserFavByTokenLazyQuery();

  useEffect(() => {
    getFav({
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, []);

  const [tri, setTri] = useState("default");

  return (
    <main className="favoris">
      <FormControl className="containerInputTri">
        <InputLabel htmlFor="tri">Trier par :</InputLabel>
        <NativeSelect onChange={(event) => setTri(event.target.value)}>
          <option value="default">Par défaut</option>
          <option value="noteDecroissant">note décroissant</option>
          <option value="noteCroissant">note croissant</option>
          <option value="nomAZ">nom A-Z</option>
          <option value="nomZA">nom Z-A</option>
          <option value="tempsDecroissant">temps décroissant</option>
          <option value="tempsCroissant">temps croissant</option>
          <option value="longueurDecroissant">longueur décroissant</option>
          <option value="longueurCroissant">longueur croissant</option>
        </NativeSelect>
      </FormControl>

      <ul className="cardsFavParkour">
        {data?.getAllUserFavByToken
          .slice() // c'est en read only donc sans slice je peux pas manip
          .sort(function compare(a, b) {
            if (tri === "default") {
              if (a.parkours.id > b.parkours.id) return -1;
              return 1;
            }
            // nom
            else if (tri === "nomAZ") {
              if (a.parkours.title < b.parkours.title) return -1;
              return 1;
            } else if (tri === "nomZA") {
              if (a.parkours.title > b.parkours.title) return -1;
              return 1;
            }
            // temps
            else if (tri === "tempsCroissant") {
              if (a.parkours.time && b.parkours.time) {
                if (a.parkours.time < b.parkours.time) return -1;
              }
              return 1;
            } else if (tri === "tempsDecroissant") {
              if (a.parkours.time && b.parkours.time) {
                if (a.parkours.time > b.parkours.time) return -1;
              }
              return 1;
            }
            // longueur
            else if (tri === "longueurCroissant") {
              if (a.parkours.length && b.parkours.length) {
                if (a.parkours.length < b.parkours.length) return -1;
              }
              return 1;
            } else if (tri === "longueurDecroissant") {
              if (a.parkours.length && b.parkours.length) {
                if (a.parkours.length > b.parkours.length) return -1;
              }
              return 1;
            }
            // note
            else if (tri === "noteCroissant") {
              if (a.parkours.note && b.parkours.note) {
                if (a.parkours.note < b.parkours.note) return -1;
              }
              return 1;
            } else if (tri === "noteDecroissant") {
              if (a.parkours.note && b.parkours.note) {
                if (a.parkours.note > b.parkours.note) return -1;
              }
              return 1;
            }
            return 0;
          })
          .map((parkour: any) => (
            <li>
              <CardFavParkour parkour={parkour.parkours} />
            </li>
          ))}
      </ul>
    </main>
  );
};

export default favoris;
