import React from "react";
import Link from "next/link";

import { GetEpreuveByIdQuery } from "@/types/graphql";

const cardEpreuve = ({
  epreuve,
}: {
  epreuve: GetEpreuveByIdQuery["getEpreuveById"];
}) => {
  return (
    <li className="cardEpreuve">
      <Link href={`/epreuve/${epreuve.id}`}>{epreuve.title}</Link>
    </li>
  );
};

export default cardEpreuve;
