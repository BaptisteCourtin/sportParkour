import { useRouter } from "next/router";
import {
  Difficulty,
  useGetTheParkourTotalForSearchLazyQuery,
  useGetTop20ParkourBySearchLazyQuery,
  useIsAdminQuery,
} from "@/types/graphql";

import CardParkour from "@/components/parkour/cardParkour";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import SearchBarParkour from "@/components/parkour/searchBarParkour";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa6";
import BigSearch from "@/components/parkour/bigSearch";

export default function Home() {
  const router = useRouter();
  const [searchByNumber, setSearchByNumber] = useState<number>(1);

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  // --- SEARCH BY ID ---
  const handleSearchById = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    router.push(`/parkour/${data.parkourId}`);
  };

  // --- PAGINATION ---
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // --- VALUES SEARCH BY ALL ---
  const minDistance = 10;
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [choosenDifficulty, setChoosenDifficulty] = useState<Difficulty | "">(
    ""
  );
  const [valueLength, setValueLength] = useState<number[]>([0, 60]);
  const [valueTime, setValueTime] = useState<number[]>([0, 600]);
  const [choosenNoteMin, setChoosenNoteMin] = useState(0);
  const [tri, setTri] = useState("id_DESC");

  // --- SEARCH BY ALL ---
  const [get20Parkour, { data, loading, error }] =
    useGetTop20ParkourBySearchLazyQuery();

  const [
    getTheParkourTotal,
    { data: dataTotal, loading: loadingTotal, error: errorTotal },
  ] = useGetTheParkourTotalForSearchLazyQuery();

  const makeTheRequest = () => {
    get20Parkour({
      variables: {
        triParField: tri.split("_")[0],
        triParSort: tri.split("_")[1],
        startPage: (page - 1) * 20,
        city: selectedCommuneName.toLowerCase(),
        lengthMin: valueLength[0],
        lengthMax: valueLength[1],
        timeMin: valueTime[0],
        timeMax: valueTime[1],
        difficulty: choosenDifficulty,
        noteMin: choosenNoteMin,
      },
      onError(err) {
        console.error("error", err);
      },
    });

    getTheParkourTotal({
      variables: {
        city: selectedCommuneName.toLowerCase(),
        timeMin: valueTime[0],
        timeMax: valueTime[1],
        lengthMin: valueLength[0],
        lengthMax: valueLength[1],
        difficulty: choosenDifficulty,
        noteMin: choosenNoteMin,
      },
      onError(err) {
        console.error("error", err);
      },
    });
  };

  useEffect(() => {
    makeTheRequest();
  }, [page]);

  return (
    <main className="pageIndex">
      {error ? (
        <h2>une erreur... (déso)</h2>
      ) : loading ? (
        <h2>Chargement en cours</h2>
      ) : (
        data?.getTop20ParkourBySearch && (
          <>
            <h1>Bonjour</h1>

            {dataIsAdmin ? (
              <Link className="button forAdmin" href="/admin/createParkour">
                créer un parkour <FaArrowRight />
              </Link>
            ) : null}

            <div className="buttonToSearch">
              <button
                onClick={() => setSearchByNumber(searchByNumber == 1 ? 2 : 1)}
              >
                Rechercher par {searchByNumber == 1 ? "titre" : "numéro"}
              </button>

              <button onClick={() => setSearchByNumber(3)}>
                Recherche avancée
              </button>
            </div>

            {searchByNumber == 1 ? (
              <form onSubmit={handleSearchById} className="littleForm">
                <div className="champ">
                  <TextField
                    className="mui-input"
                    fullWidth
                    variant="outlined"
                    label="numéro du parkour"
                    required
                    id="parkourId"
                    name="parkourId"
                    type="number"
                  />
                </div>
                <button type="submit">Rechercher</button>
              </form>
            ) : searchByNumber == 2 ? (
              <form className="littleForm">
                <div className="champ">
                  <SearchBarParkour />
                </div>
              </form>
            ) : (
              // --- BIG SEACRH ---
              <BigSearch
                loading={loading}
                makeTheRequest={makeTheRequest}
                setPage={setPage}
                setValueLength={setValueLength}
                valueLength={valueLength}
                setValueTime={setValueTime}
                valueTime={valueTime}
                setSelectedCommuneName={setSelectedCommuneName}
                selectedCommuneName={selectedCommuneName}
                setChoosenDifficulty={setChoosenDifficulty}
                choosenDifficulty={choosenDifficulty}
                setChoosenNoteMin={setChoosenNoteMin}
                choosenNoteMin={choosenNoteMin}
                setTri={setTri}
                tri={tri}
              />
            )}

            {/* --- pagination au dessus des cards --- */}

            {dataTotal?.getTheParkourTotalForSearch ? (
              <Stack spacing={2}>
                <Pagination
                  className="pagination"
                  count={Math.ceil(dataTotal?.getTheParkourTotalForSearch / 20)}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            ) : (
              ""
            )}

            {/* --- cards des parkour --- */}

            <ul className="cardsParkoursUl">
              {data?.getTop20ParkourBySearch.map((parkour: any) => (
                <CardParkour parkour={parkour} key={parkour.id} color="blue" />
              ))}
            </ul>

            {/* --- pagination en dessous des cards --- */}

            {dataTotal?.getTheParkourTotalForSearch ? (
              <Stack spacing={2}>
                <Pagination
                  className="pagination"
                  count={Math.ceil(dataTotal?.getTheParkourTotalForSearch / 20)}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            ) : (
              ""
            )}
          </>
        )
      )}
    </main>
  );
}
