import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GetEpreuveByIdQuery,
  useGetListEpreuveQuery,
  useIsAdminLazyQuery,
  useIsAdminQuery,
} from "@/types/graphql";

import CardEpreuve from "@/components/epreuve/cardEpreuve";
import SearchBarEpreuve from "@/components/epreuve/searchBarEpreuve";
import TextField from "@mui/material/TextField";
import Link from "next/link";

const allEpreuves = () => {
  const router = useRouter();
  const [tri, setTri] = useState<string>("Titre A-Z");

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const { data, loading, error } = useGetListEpreuveQuery({
    fetchPolicy: "no-cache",
  });

  const handleSearchById = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    router.push(`/epreuve/${data.idEpreuve}`);
  };

  return (
    <main className="allEpreuves">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getListEpreuve && (
          <>
            {dataIsAdmin ? (
              <Link href="/admin/createEpreuve">créer une épreuve</Link>
            ) : null}

            <form>
              <div className="champ">
                <SearchBarEpreuve />
              </div>
            </form>

            <form onSubmit={handleSearchById}>
              <div className="champ">
                <TextField
                  className="mui-input"
                  fullWidth
                  variant="outlined"
                  label="numéro de l'épreuve"
                  required
                  id="idEpreuve"
                  name="idEpreuve"
                  type="number"
                />
              </div>
              <button type="submit">Chercher par numéro</button>
            </form>

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
                    return 1;
                  } else if (tri === "Titre Z-A") {
                    if (a.title > b.title) return -1;
                    return 1;
                  }
                  return 0;
                })
                .map((epreuve: GetEpreuveByIdQuery["getEpreuveById"]) => (
                  <CardEpreuve epreuve={epreuve} key={epreuve.id} />
                ))}
            </ul>
          </>
        )
      )}
    </main>
  );
};

export default allEpreuves;
