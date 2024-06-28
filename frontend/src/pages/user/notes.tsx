import CardNoteParkour from "@/components/parkour/cardNoteParkour";
import { useGetAllUserNoteByTokenLazyQuery } from "@/types/graphql";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const notes = () => {
  const [getNotes, { data, loading, error }] =
    useGetAllUserNoteByTokenLazyQuery();

  useEffect(() => {
    getNotes({
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, []);

  const [tri, setTri] = useState("default");

  return (
    <main className="favorisOrNotes">
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

      {data?.getAllUserNoteByToken.length ? (
        <ul className="cardsFavParkour">
          {data?.getAllUserNoteByToken
            .slice() // c'est en read only donc sans slice je peux pas manip
            .sort(function compare(a, b) {
              if (tri === "default") {
                if (a.parkour.id > b.parkour.id) return -1;
                return 1;
              }
              // nom
              else if (tri === "nomAZ") {
                if (a.parkour.title < b.parkour.title) return -1;
                return 1;
              } else if (tri === "nomZA") {
                if (a.parkour.title > b.parkour.title) return -1;
                return 1;
              }
              // temps
              else if (tri === "tempsCroissant") {
                if (a.parkour.time && b.parkour.time) {
                  if (a.parkour.time < b.parkour.time) return -1;
                }
                return 1;
              } else if (tri === "tempsDecroissant") {
                if (a.parkour.time && b.parkour.time) {
                  if (a.parkour.time > b.parkour.time) return -1;
                }
                return 1;
              }
              // longueur
              else if (tri === "longueurCroissant") {
                if (a.parkour.length && b.parkour.length) {
                  if (a.parkour.length < b.parkour.length) return -1;
                }
                return 1;
              } else if (tri === "longueurDecroissant") {
                if (a.parkour.length && b.parkour.length) {
                  if (a.parkour.length > b.parkour.length) return -1;
                }
                return 1;
              }
              // note
              else if (tri === "noteCroissant") {
                if (a.parkour.note && b.parkour.note) {
                  if (a.parkour.note < b.parkour.note) return -1;
                }
                return 1;
              } else if (tri === "noteDecroissant") {
                if (a.parkour.note && b.parkour.note) {
                  if (a.parkour.note > b.parkour.note) return -1;
                }
                return 1;
              }
              return 0;
            })
            .map((parkour: any) => (
              <li>
                <CardNoteParkour parkour={parkour.parkour} />
              </li>
            ))}
        </ul>
      ) : (
        <>
          <p>Vous n'avez pas encore noté nos parkours</p>
          <Link className="button" href="/">
            Commencez à en trouver
          </Link>
        </>
      )}
    </main>
  );
};

export default notes;