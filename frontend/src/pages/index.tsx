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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, number, object, string } from "yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import SearchBarCommuneName from "@/components/user/searchBarCommuneName";

import { FaArrowRight } from "react-icons/fa6";

let createSearchByAllSchema = object({
  city: string().max(50, "Une ville, pas un lieu-dit paumé"),
  timeMin: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(600, "Tu va déjà avoir mal à ce niveau"),
  timeMax: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(600, "Tu va déjà avoir mal à ce niveau"),
  lengthMin: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(60, "Tu va déjà avoir mal à ce niveau"),
  lengthMax: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(60, "Tu va déjà avoir mal à ce niveau"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),
  noteMin: number()
    .min(
      0,
      "Nous enlevons de notre site les parkours avec moins de 0 étoiles (c fo)"
    )
    .max(5, "5/5 c'est déjà bien. Non?"),
});

export default function Home() {
  const router = useRouter();

  const {
    data: dataIsAdmin,
    loading: loadingIsAdmin,
    error: errorIsAdmin,
  } = useIsAdminQuery();

  // --- PAGINATION ---
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // --- SEARCH BY ALL ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSearchByAllSchema),
  });

  const [get20Parkour, { data, loading, error }] =
    useGetTop20ParkourBySearchLazyQuery();

  const [
    getTheParkourTotal,
    { data: dataTotal, loading: loadingTotal, error: errorTotal },
  ] = useGetTheParkourTotalForSearchLazyQuery();

  // --- VALUES SEARCH BY ALL ---
  const minDistance = 10;
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [choosenDificulty, setChoosenDifficulty] = useState<Difficulty | "">(
    ""
  );
  const [valueLength, setValueLength] = useState<number[]>([0, 60]);
  const [valueTime, setValueTime] = useState<number[]>([0, 600]);
  const [choosenNoteMin, setChoosenNoteMin] = useState(0);
  const [tri, setTri] = useState("id_DESC");

  const handleChangeLength = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 60 - minDistance);
        setValueLength([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValueLength([clamped - minDistance, clamped]);
      }
    } else {
      setValueLength(newValue as number[]);
    }
  };

  const handleChangeTime = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 600 - minDistance);
        setValueTime([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValueTime([clamped - minDistance, clamped]);
      }
    } else {
      setValueTime(newValue as number[]);
    }
  };

  // --- REQUEST SEARCH BY ALL ---
  const makeTheRequest = () => {
    get20Parkour({
      variables: {
        triParField: tri.split("_")[0],
        triParSort: tri.split("_")[1],
        startPage: (page - 1) * 20,
        city: selectedCommuneName.toLowerCase(),
        timeMin: valueTime[0],
        timeMax: valueTime[1],
        lengthMin: valueLength[0],
        lengthMax: valueLength[1],
        difficulty: choosenDificulty,
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
        difficulty: choosenDificulty,
        noteMin: choosenNoteMin,
      },
      onError(err) {
        console.error("error", err);
      },
    });
  };

  const handleSearchByAll = () => {
    setPage(1);
    makeTheRequest();
  };

  useEffect(() => {
    makeTheRequest();
  }, [page]);

  const resetChoosen = () => {
    setSelectedCommuneName("");
    setChoosenDifficulty("");
    setValueLength([0, 60]);
    setValueTime([0, 600]);
    setChoosenNoteMin(0);
    setTri("id_DESC");
  };

  // --- SEARCH BY ID ---
  const handleSearchById = (e: React.MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    router.push(`/parkour/${data.parkourId}`);
  };

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

            <form className="littleForm">
              <div className="champ">
                <SearchBarParkour />
              </div>
            </form>

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
              <button type="submit">Chercher par numéro</button>
            </form>

            {/* --- */}

            <section className="formSearchParkour littleForm">
              <div className="champ">
                <SearchBarCommuneName
                  userValue={selectedCommuneName}
                  setSelectedCommuneName={setSelectedCommuneName}
                />
              </div>

              <div className="champ difficulty">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Difficultée
                  </InputLabel>
                  <Select
                    className="mui-input"
                    variant="outlined"
                    id="difficulty"
                    name="difficulty"
                    label="Difficultée"
                    value={choosenDificulty}
                    onChange={(e) =>
                      setChoosenDifficulty(e.target.value as Difficulty)
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="EASY">{Difficulty.Facile}</MenuItem>
                    <MenuItem value="MEDIUM">{Difficulty.Moyen}</MenuItem>
                    <MenuItem value="HARD">{Difficulty.Difficile}</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="champ">
                <label>distance :</label>
                <Slider
                  sx={{ width: 300 }}
                  value={valueLength}
                  onChange={handleChangeLength}
                  valueLabelDisplay="auto"
                  disableSwap
                  step={5}
                  min={0}
                  max={60}
                />
              </div>
              <div className="champ">
                <label>temps :</label>
                <Slider
                  sx={{ width: 300 }}
                  value={valueTime}
                  onChange={handleChangeTime}
                  valueLabelDisplay="auto"
                  disableSwap
                  step={10}
                  min={0}
                  max={600}
                />
              </div>

              <div className="searchNote">
                <Rating
                  id="searchNoteMin"
                  name="searchNoteMin"
                  precision={0.5}
                  defaultValue={0}
                  value={choosenNoteMin}
                  onChange={(event, newValue) => {
                    setChoosenNoteMin(newValue as number);
                  }}
                />
                <button className="button" onClick={() => setChoosenNoteMin(0)}>
                  reset note voulue
                </button>
              </div>

              <div className="champ">
                <FormControl
                  className="containerInputTri"
                  sx={{ m: 1, minWidth: 250 }}
                >
                  <InputLabel htmlFor="tri">Trier par :</InputLabel>
                  <Select
                    className="mui-input"
                    variant="outlined"
                    id="orderParkour"
                    name="orderParkour"
                    label="Difficultée"
                    value={tri}
                    onChange={(event) => setTri(event.target.value as string)}
                  >
                    <MenuItem value="id_DESC">Par défaut</MenuItem>
                    <MenuItem value="note_DESC">note décroissant</MenuItem>
                    <MenuItem value="note_ASC">note croissant</MenuItem>
                    <MenuItem value="title_ASC">nom A-Z</MenuItem>
                    <MenuItem value="title_DESC">nom Z-A</MenuItem>
                    <MenuItem value="time_DESC">temps décroissant</MenuItem>
                    <MenuItem value="time_ASC">temps croissant</MenuItem>
                    <MenuItem value="length_DESC">
                      longueur décroissant
                    </MenuItem>
                    <MenuItem value="length_ASC">longueur croissant</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit(handleSearchByAll)}
              >
                Chercher
              </button>
              <button onClick={() => resetChoosen()}>reset la recherche</button>
            </section>

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
