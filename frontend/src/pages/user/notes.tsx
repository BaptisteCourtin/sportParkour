import { useEffect, useState } from "react";
import Link from "next/link";

import { useGetAllUserNoteByTokenLazyQuery } from "@/types/graphql";

import CardParkour from "@/components/parkour/cardParkour";
import GoBack from "@/components/goBack";
import BigTriPar from "@/components/bigTriPar";

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
      <GoBack />

      <form className="littleForm">
        <BigTriPar tri={tri} setTri={setTri} />
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
                <CardParkour parkour={parkour.parkour} color="darkBlue" />
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
