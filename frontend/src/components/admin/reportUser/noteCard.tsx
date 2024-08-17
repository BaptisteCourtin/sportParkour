import Link from "next/link";

import ButtonForComment from "@/components/admin/buttonForComment";

// card d'un commentaire, version page modo d'un user
const noteCard = ({ note, malfratId }: { note: any; malfratId: string }) => {
  return (
    <li className={`${note.status} noteCard`}>
      <div className="top">
        <p className="commentInFaute">{note.commentaire}</p>

        <ButtonForComment
          malfratId={malfratId}
          parkourId={note.parkour.id}
          commentaire={note.commentaire}
          isAdmin={true} // on est sur la partie admin
          isClient={false}
        />
      </div>

      <Link href={`/parkour/${note.parkour?.id}`}>
        Parkour du commentaire : {note.parkour?.title}
      </Link>
    </li>
  );
};

export default noteCard;
