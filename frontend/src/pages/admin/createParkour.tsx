import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Difficulty,
  ParkourCreateEntity,
  useCreateParkourMutation,
  useGetListEpreuveByTitleQuery,
} from "@/types/graphql";

import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, number, object, string } from "yup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { FaCheck } from "react-icons/fa6";

let createParkourSchema = object({
  title: string()
    .max(50, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
  description: string().max(
    1000,
    "Pas besoin d'avoir une description aussi long"
  ),

  time: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(600, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer le temps moyen pour finir ce parkour"),
  length: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(60, "Si ça dure plus longtemps, contacte les admins")
    .required("Veuillez entrer la longueur du parkour"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),

  city: string().max(50, "Une ville, pas un lieu-dit paumé"),
  start: string()
    .max(20, "20 caractères ça suffit")
    .required("Veuillez entrer un point de départ"),
});

const createParkour = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createParkourSchema),
  });

  const [createParkour, { data, loading, error }] = useCreateParkourMutation({
    fetchPolicy: "no-cache",
  });

  const [choosenDificulty, setChoosenDifficulty] = useState<Difficulty>();

  const handleCreateParkour = (dataForm: ParkourCreateEntity): void => {
    const dataAggregate: ParkourCreateEntity = {
      ...dataForm,
      difficulty: choosenDificulty,
      epreuves: selectedEpreuveIds,
    };

    if (dataAggregate.title) {
      createParkour({
        variables: { infos: dataAggregate },
        onCompleted(data) {
          if (data.createParkour.id) {
            toast.success(
              `GG, vous avez créé le parkour ${data.createParkour.title}`
            );
            router.push(`/parkour/${data.createParkour.id}`);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    }
  };

  // --- DEAL WITH LENGTH DURING MODIF ---
  const [values, setValues] = useState({
    title: "",
    description: "",
    city: "",
    start: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- DEAL WITH IDS EPREUVES ---
  const {
    data: dataEpreuves,
    loading: loadingEpreuves,
    error: errorEpreuves,
  } = useGetListEpreuveByTitleQuery({
    fetchPolicy: "no-cache",
  });

  const [selectedEpreuveIds, setSelectedEpreuveIds] = useState<number[]>([]);

  const handleEpreuveSelection = (value: any) => {
    const selectedIds = value.map((option: { id: string }) =>
      parseInt(option.id)
    );
    setSelectedEpreuveIds(selectedIds);
  };

  return (
    <main className="createParkour">
      <h1>create parkour</h1>

      <form onSubmit={handleSubmit(handleCreateParkour)}>
        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Titre du parkour"
            required
            {...register("title")}
            id="title"
            name="title"
            type="text"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => handleChangeAThing("title", e.target.value)}
          />
          <span>
            {values.title.length > 0 ? `${values.title.length}/50` : ""}
          </span>
          <p className="error">{errors?.title?.message}</p>
        </div>
        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Description"
            multiline
            rows={10}
            {...register("description")}
            id="description"
            name="description"
            type="text"
            inputProps={{ maxLength: 1000 }}
            onChange={(e) => handleChangeAThing("description", e.target.value)}
          />
          <span>
            {values.description.length > 0
              ? `${values.description.length}/1000`
              : ""}
          </span>
          <p className="error">{errors?.description?.message}</p>
        </div>

        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="temps moyen pour finir le parkour"
            required
            {...register("time")}
            InputProps={{ inputProps: { max: 600 } }}
            id="time"
            name="time"
            type="number"
          />
          <p className="error">{errors?.time?.message}</p>
        </div>
        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="longueur du parkour"
            required
            {...register("length")}
            InputProps={{ inputProps: { max: 60 } }}
            id="length"
            name="length"
            type="number"
          />
          <p className="error">{errors?.length?.message}</p>
        </div>

        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Difficultée
            </InputLabel>
            <Select
              className="mui-input"
              fullWidth
              variant="outlined"
              id="difficulty"
              name="difficulty"
              label="Difficultée"
              onChange={(e) =>
                setChoosenDifficulty(e.target.value as Difficulty)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="facile">{Difficulty.Facile}</MenuItem>
              <MenuItem value="moyen">{Difficulty.Moyen}</MenuItem>
              <MenuItem value="difficile">{Difficulty.Difficile}</MenuItem>
            </Select>
          </FormControl>
          <p className="error">{errors?.difficulty?.message}</p>
        </div>

        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Ville de départ"
            {...register("city")}
            id="city"
            name="city"
            type="text"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => handleChangeAThing("city", e.target.value)}
          />
          <span>
            {values.city.length > 0 ? `${values.city.length}/50` : ""}
          </span>
          <p className="error">{errors?.city?.message}</p>
        </div>
        <div>
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Point gps de départ"
            required
            {...register("start")}
            id="start"
            name="start"
            type="text"
            inputProps={{ maxLength: 20 }}
            onChange={(e) => handleChangeAThing("start", e.target.value)}
          />
          <span>
            {values.start.length > 0 ? `${values.start.length}/20` : ""}
          </span>
          <p className="error">{errors?.start?.message}</p>
        </div>

        <div>
          <Autocomplete
            sx={{ width: 300 }}
            id="epreuves"
            className="titleBar"
            multiple
            loading={loadingEpreuves}
            disableCloseOnSelect
            // on change
            onChange={(e, value, detail) => handleEpreuveSelection(value)}
            // pour rechercher dans le back
            options={dataEpreuves?.getListEpreuveByTitle ?? []}
            // render qui veut un string
            getOptionLabel={(option) => option.title}
            // pour le style autour
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Recherche une épreuve par titre"
              />
            )}
            // pour la liste déroulante
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id} value={option.id}>
                {option.title}
                {selected ? <FaCheck /> : null}
              </li>
            )}
          />
        </div>

        <button type="submit" disabled={loading}>
          Créer le parkour
        </button>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default createParkour;
