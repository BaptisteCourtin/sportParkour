import Link from "next/link";
import React from "react";

const cardFavParkour = ({ parkour }: any) => {
  console.log(parkour);
  return (
    <Link href={`/parkour/${parkour.id}`} className="cardFavParkour">
      {parkour.title}
    </Link>
  );
};

export default cardFavParkour;
