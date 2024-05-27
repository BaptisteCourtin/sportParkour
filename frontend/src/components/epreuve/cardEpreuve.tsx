import React from "react";
import { GetEpreuveByIdQuery } from "@/types/graphql";
import Link from "next/link";

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
