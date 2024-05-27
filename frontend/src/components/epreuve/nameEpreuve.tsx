import React from "react";
import { GetEpreuveByIdQuery } from "@/types/graphql";
import Link from "next/link";

const nameEpreuve = ({
  epreuve,
}: {
  epreuve: GetEpreuveByIdQuery["getEpreuveById"];
}) => {
  return (
    <li className="nameEpreuve">
      <Link href={`/epreuve/${epreuve.id}`}>{epreuve.title}</Link>
    </li>
  );
};

export default nameEpreuve;
