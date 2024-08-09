import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import { Difficulty } from "@/types/graphql";
import { mixed, number, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

  // --- FONCTIONS ---
  const handleSearchByAll = () => {
    setPage(1);
    makeTheRequest();
  };

  const resetChoosen = () => {
    setSelectedCommuneName("");
    setChoosenDifficulty("");
    setValueLength([0, 60]);
    setValueTime([0, 600]);
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
            Difficultée
          </InputLabel>
          <Select
            className="mui-input"
            variant="outlined"
            id="difficulty"
            name="difficulty"
            label="Difficultée"
            value={choosenDifficulty}
            onChange={(e) => setChoosenDifficulty(e.target.value as Difficulty)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="EASY">facile</MenuItem>
            <MenuItem value="MEDIUM">moyen</MenuItem>
            <MenuItem value="HARD">difficile</MenuItem>
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
        <FormControl className="containerInputTri" sx={{ m: 1, minWidth: 250 }}>
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
            <MenuItem value="length_DESC">longueur décroissant</MenuItem>
            <MenuItem value="length_ASC">longueur croissant</MenuItem>
          </Select>
        </FormControl>
      </div>

      <button disabled={loading} onClick={handleSubmit(handleSearchByAll)}>
        Chercher
      </button>
      <button onClick={() => resetChoosen()}>reset la recherche</button>
    </section>
  );
};

export default bigSearch;
