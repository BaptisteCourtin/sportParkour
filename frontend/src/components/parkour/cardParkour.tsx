import { GetParkourByIdQuery } from "@/types/graphql";
import Link from "next/link";
import React from "react";

const cardParkour = ({
  parkour,
}: {
  parkour: GetParkourByIdQuery["getParkourById"];
}) => {
  // on reçoit les infos
  // mettre un icon pour dire de cliquer sur la ville

  return (
    <Link href={`/parkour/${parkour.id}`} className="cardParkour">
      <h3>{parkour.title}</h3>

      {parkour.images && parkour.images[0] && parkour.images[0].lien ? (
        <img src={parkour.images[0].lien} alt="" />
      ) : (
        <img
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt=""
        />
      )}

      <div className="infos">
        <div className="difficulty">
          <p>{parkour.time} min</p>
          <p>{parkour.length} km</p>
          <p>{parkour.difficulty}</p>
        </div>

        <p>{parkour.city}</p>

        <p>{parkour.epreuves?.length} épreuves</p>
      </div>
    </Link>
  );
};

export default cardParkour;
