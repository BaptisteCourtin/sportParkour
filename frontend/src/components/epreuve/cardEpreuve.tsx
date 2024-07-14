import React from "react";
import Link from "next/link";

import { GetEpreuveByIdQuery } from "@/types/graphql";

const cardEpreuve = ({
  epreuve,
}: {
  epreuve: GetEpreuveByIdQuery["getEpreuveById"];
}) => {
  return (
    <li>
      <Link href={`/epreuve/${epreuve.id}`} className="cardEpreuve">
        {epreuve.images && epreuve.images[0] && epreuve.images[0].lien ? (
          <img src={epreuve.images[0].lien} alt="" />
        ) : (
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            alt=""
          />
        )}
        <p>{epreuve.title}</p>
      </Link>
    </li>
  );
};

export default cardEpreuve;
