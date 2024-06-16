import React, { useEffect, useState } from "react";
import { useGetAllUserFavByTokenLazyQuery } from "@/types/graphql";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import CardFavParkour from "@/components/parkour/cardFavParkour";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Link from "next/link";

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
      <form>
        <div className="champ">
          <FormControl
            className="containerInputTri"
            sx={{ m: 1, minWidth: 250 }}
          >
            <InputLabel htmlFor="tri">Trier par :</InputLabel>
            <Select
              className="mui-input"
              variant="outlined"
              id="orderFavorite"
              name="orderFavorite"
              label="Trier par :"
              value={tri}
              onChange={(event) => setTri(event.target.value as string)}
            >
              <MenuItem value="default">Par défaut</MenuItem>
              <MenuItem value="noteDecroissant">note décroissant</MenuItem>
              <MenuItem value="noteCroissant">note croissant</MenuItem>
              <MenuItem value="nomAZ">nom A-Z</MenuItem>
              <MenuItem value="nomZA">nom Z-A</MenuItem>
              <MenuItem value="tempsDecroissant">temps décroissant</MenuItem>
              <MenuItem value="tempsCroissant">temps croissant</MenuItem>
              <MenuItem value="longueurDecroissant">
                longueur décroissant
              </MenuItem>
              <MenuItem value="longueurCroissant">longueur croissant</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>

      {data?.getAllUserFavByToken.length ? (
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
      ) : (
        <>
          <p>Vous n'avez pas de parkours favoris</p>
          <Link className="button" href="/">
            Commencez à en trouver
          </Link>
        </>
      )}
    </main>
  );
};

export default favoris;
