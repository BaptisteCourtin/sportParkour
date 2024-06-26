import Link from "next/link";
import React from "react";
import ButtonForComment from "./buttonForComment";

const noteCard = ({ note, malfratId }: { note: any; malfratId: string }) => {
  return (
    <li className={`${note.status} noteCard`}>
      <ButtonForComment
        malfratId={malfratId}
        parkourId={note.parkour.id}
        commentaire={note.commentaire}
        isAdmin={true} // on est sur la partie admin
        isClient={false}
      />

      <p>{note.commentaire}</p>
      <Link href={`/parkour/${note.parkour?.id}`}>
        <p>{note.parkour.title}</p>
      </Link>
    </li>
  );
};

export default noteCard;
