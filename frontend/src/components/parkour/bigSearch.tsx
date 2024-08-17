import { useForm } from "react-hook-form";

import { Difficulty } from "@/types/graphql";

import { mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";

import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import BigTriPar from "@/components/bigTriPar";

let createSearchByAllSchema = object({
  city: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_CITY),
    "Une ville, pas un lieu-dit paumé"
  ),
  timeMin: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_TIME),
      "Tu va déjà avoir mal à ce niveau"
    ),
  timeMax: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_TIME),
      "Tu va déjà avoir mal à ce niveau"
    ),
  lengthMin: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH),
      "Tu va déjà avoir mal à ce niveau"
    ),
  lengthMax: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH),
      "Tu va déjà avoir mal à ce niveau"
    ),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),
  noteMin: number()
    .min(
      0,
      "Nous enlevons de notre site les parkours avec moins de 0 étoiles (c fo)"
    )
    .max(5, "5/5 c'est déjà bien. Non?"),
});

const marks = [
  {
    value: 60,
    label: "1h",
  },
  {
    value: 120,
    label: "2h",
  },
  {
    value: 180,
    label: "3h",
  },
  {
    value: 240,
    label: "4h",
  },
  {
    value: 300,
    label: "5h",
  },
];

const bigSearch = ({
  loading,
  makeTheRequest,
  setPage,
  setValueLength,
  valueLength,
  setValueTime,
  valueTime,
  setSelectedCommuneName,
  selectedCommuneName,
  setChoosenDifficulty,
  choosenDifficulty,
  setChoosenNoteMin,
  choosenNoteMin,
  setTri,
  tri,
}) => {
  const minDistance = 10;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSearchByAllSchema),
  });

  // --- SLIDERS ---
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
        const clamped = Math.min(
          newValue[0],
          parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH) - minDistance
        );
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
        const clamped = Math.min(
          newValue[0],
          parseInt(process.env.NEXT_PUBLIC_MAX_TIME) - minDistance
        );
        setValueTime([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValueTime([clamped - minDistance, clamped]);
      }
    } else {
      setValueTime(newValue as number[]);
    }
  };

  // --- FONCTIONS ---
  const handleSearchByAll = () => {
    setPage(1);
    makeTheRequest();
  };

  const resetChoosen = () => {
    setSelectedCommuneName("");
    setChoosenDifficulty("");
    setValueLength([0, parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH)]);
    setValueTime([0, parseInt(process.env.NEXT_PUBLIC_MAX_TIME)]);
    setChoosenNoteMin(0);
    setTri("id_DESC");
  };

  return (
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
            Difficulté
          </InputLabel>
          <Select
            className="mui-input"
            variant="outlined"
            id="difficulty"
            name="difficulty"
            label="Difficulté"
            value={choosenDifficulty}
            onChange={(e) => setChoosenDifficulty(e.target.value as Difficulty)}
          >
            <MenuItem value="">
              <em>toutes</em>
            </MenuItem>
            <MenuItem value="EASY">facile</MenuItem>
            <MenuItem value="MEDIUM">moyen</MenuItem>
            <MenuItem value="HARD">difficile</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="champ">
        <label>distance (km) :</label>
        <Slider
          sx={{ width: 300 }}
          value={valueLength}
          onChange={handleChangeLength}
          valueLabelDisplay="auto"
          disableSwap
          step={5}
          min={0}
          max={parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH)}
        />
      </div>
      <div className="champ">
        <label>temps (min) :</label>
        <Slider
          sx={{ width: 300 }}
          value={valueTime}
          onChange={handleChangeTime}
          valueLabelDisplay="auto"
          disableSwap
          step={10}
          min={0}
          max={parseInt(process.env.NEXT_PUBLIC_MAX_TIME)}
          marks={marks}
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
          Remettre la note à 0
        </button>
      </div>

      <BigTriPar tri={tri} setTri={setTri} />

      <button disabled={loading} onClick={handleSubmit(handleSearchByAll)}>
        Chercher
      </button>
      <button onClick={() => resetChoosen()}>reset la recherche</button>
    </section>
  );
};

export default bigSearch;
