import React, { useState } from "react";

import { GetEpreuveByIdQuery, useGetListEpreuveQuery } from "@/types/graphql";

import CardEpreuve from "@/components/epreuve/cardEpreuve";
import SearchBarEpreuve from "@/components/epreuve/searchBarEpreuve";

const allEpreuves = () => {
  const [tri, setTri] = useState<string>("Titre A-Z");

  const { data, loading, error } = useGetListEpreuveQuery({
    fetchPolicy: "no-cache",
  });

  return (
    <main className="allEpreuves">
      <SearchBarEpreuve />

      <div className="trieur">
        <label htmlFor="tri">Ordre de tri : </label>
        <select id="tri" onChange={(event) => setTri(event.target.value)}>
          <option value="Titre A-Z">Titre A-Z</option>
          <option value="Titre Z-A">Titre Z-A</option>
        </select>
      </div>

      <ul className="cardsEpreuvesUl">
        {data?.getListEpreuve
          .slice() // car graphql nous renvoie un tableau en lecture seule
          .sort(function compare(a: any, b: any) {
            if (tri === "Titre A-Z") {
              if (a.title < b.title) return -1;
              else if (a.title > b.title) return 1;
              return 0;
            } else if (tri === "Titre Z-A") {
              if (a.title < b.title) return 1;
              else if (a.title > b.title) return -1;
              return 0;
            }
            return 0;
          })
          .map((epreuve: GetEpreuveByIdQuery["getEpreuveById"]) => (
            <CardEpreuve epreuve={epreuve} key={epreuve.id} />
          ))}
      </ul>
      {error && <p>{error.message}</p>}
    </main>
  );
};

export default allEpreuves;
