import React from "react";
import { GetEpreuveQuery } from "@/types/graphql";
import Link from "next/link";

const cardEpreuve = ({
  epreuve,
}: {
  epreuve: GetEpreuveQuery["getEpreuve"];
}) => {
  return (
    <li className="cardEpreuve">
      <Link href={`/epreuve/${epreuve.id}`}>{epreuve.title}</Link>
    </li>
  );
};

export default cardEpreuve;
