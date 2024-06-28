import React from "react";
import Link from "next/link";

import { GetParkourByIdQuery } from "@/types/graphql";

import Rating from "@mui/material/Rating";

import { FaLocationDot } from "react-icons/fa6";
import { FaPersonRunning } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

const cardFavParkour = ({
  parkour,
}: {
  parkour: GetParkourByIdQuery["getParkourById"];
}) => {
  return (
    <Link
      href={`/parkour/${parkour.id}`}
      className="cardFavParkour"
      key={parkour.id}
    >
      <h3>
        <FaLocationDot /> {parkour.title}
      </h3>

      {parkour.images && parkour.images[0] && parkour.images[0].lien ? (
        <img src={parkour.images[0].lien} alt="" />
      ) : (
        <img
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt=""
        />
      )}

      <div className="infos">
        <p>
          <FaStopwatch /> {parkour.time} min
        </p>
        <p>
          <FaPersonRunning /> {parkour.length} km
        </p>
        <p>
          <FaArrowUpRightDots /> {parkour.difficulty}
        </p>
      </div>

      <hr />

      <p>{parkour.city}</p>

      <div className="bottomCardParkour">
        <p>{parkour.epreuves?.length} épreuves</p>
        {parkour.note ? (
          <div className="rating">
            <Rating
              defaultValue={parseFloat(parkour.note.toFixed(1))}
              precision={0.1}
              readOnly
            />
            <span className="nbVote">
              {parkour.note.toFixed(1)} sur {parkour.nbVote} votes
            </span>
          </div>
        ) : (
          <p>Nouveau</p>
        )}
        <p></p>
      </div>

      <FaCircleArrowRight className="fleche" />
    </Link>
  );
};

export default cardFavParkour;