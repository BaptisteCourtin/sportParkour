import Link from "next/link";
import React from "react";

const noteCard = ({ note }: any) => {
  return (
    <li className={`${note.status} noteCard`}>
      <p>{note.commentaire}</p>
      <Link href={`/parkour/${note.parkour?.id}`}>
        <p>{note.parkour.title}</p>
      </Link>
    </li>
  );
};

export default noteCard;
