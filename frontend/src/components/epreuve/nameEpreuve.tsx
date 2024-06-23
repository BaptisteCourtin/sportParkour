import React from "react";
import Link from "next/link";

import { GetEpreuveByIdQuery } from "@/types/graphql";

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
