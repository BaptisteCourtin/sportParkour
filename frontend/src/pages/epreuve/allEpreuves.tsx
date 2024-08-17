import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useGetAllEpreuveQuery, useIsAdminQuery } from "@/types/graphql";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaArrowRight } from "react-icons/fa6";

import SearchBarEpreuve from "@/components/epreuve/searchBarEpreuve";
import CardEpreuve from "@/components/epreuve/cardEpreuve";

const allEpreuves = () => {
  const router = useRouter();
  const [searchByNumber, setSearchByNumber] = useState(true);
  const [tri, setTri] = useState<string>("Titre A-Z");

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  const { data, loading, error } = useGetAllEpreuveQuery({
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
        <h2>une erreur... (déso) {error.message}</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getAllEpreuve && (
          <>
            {dataIsAdmin ? (
              <Link className="button forAdmin" href="/admin/createEpreuve">
                Créer une épreuve <FaArrowRight />
              </Link>
            ) : null}

            <button onClick={() => setSearchByNumber(!searchByNumber)}>
              Rechercher par {searchByNumber ? "titre" : "numéro"}
            </button>

            {searchByNumber ? (
              <form onSubmit={handleSearchById} className="littleForm">
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
                <button type="submit">Rechercher</button>
              </form>
            ) : (
              <form className="littleForm">
                <div className="champ">
                  <SearchBarEpreuve />
                </div>
              </form>
            )}

            <form className="littleForm">
              <div className="champ ">
                <FormControl
                  className="containerInputTri"
                  sx={{ m: 1, minWidth: 250 }}
                >
                  <InputLabel htmlFor="tri">Trier par :</InputLabel>
                  <Select
                    className="mui-input"
                    variant="outlined"
                    id="orderFavorite"
                    name="orderFavorite"
                    label="Trier par :"
                    value={tri}
                    onChange={(event) => setTri(event.target.value as string)}
                  >
                    <MenuItem value="Titre A-Z">nom A-Z</MenuItem>
                    <MenuItem value="Titre Z-A">nom Z-A</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </form>

            <ul className="cardsEpreuvesUl">
              {data?.getAllEpreuve
                .slice() // car graphql nous renvoie un tableau en lecture seule
                .sort(function compare(a: any, b: any) {
                  if (tri === "Titre A-Z") {
                    return a.title.localeCompare(b.title, "fr", {
                      sensitivity: "base",
                    });
                  } else if (tri === "Titre Z-A") {
                    return b.title.localeCompare(a.title, "fr", {
                      sensitivity: "base",
                    });
                  }
                  return 0;
                })
                .map((epreuve: any) => (
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
