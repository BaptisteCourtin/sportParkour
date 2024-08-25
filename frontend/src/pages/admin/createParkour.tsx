import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  Difficulty,
  ImageParkourCreateEntity,
  ParkourCreateEntity,
  useCreateParkourMutation,
  useGetListTop20ParkourByTitleLazyQuery,
  useGetTop20EpreuveByTitleLazyQuery,
} from "@/types/graphql";

import { mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-hot-toast";

import SearchBarCommuneName from "@/components/user/searchBarCommuneName";
import FormCreateImages from "@/components/uploadImage/formCreateImages";
import GoBack from "@/components/goBack";
import { uploadImages } from "@/components/uploadImage/uploadImages";

let createParkourSchema = object({
  title: string()
    .max(
      parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE),
      "Pas besoin d'avoir un titre aussi long"
    )
    .required("Veuillez entrer un titre"),
  description: string().max(
    parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION),
    "Pas besoin d'avoir une description aussi longue"
  ),

  time: number()
    .min(0, "Remonter dans le temps n'ai pas une option")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_TIME),
      "Si ça dure plus longtemps, contacte les admins"
    )
    .required("Veuillez entrer le temps moyen pour finir ce parkour"),
  length: number()
    .min(0, "Marcher en arrière est dangereux pour votre santée")
    .max(
      parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH),
      "Si ça dure plus longtemps, contacte les admins"
    )
    .required("Veuillez entrer la longueur du parkour"),
  difficulty: mixed<Difficulty>().oneOf(Object.values(Difficulty)),

  start: string()
    .max(parseInt(process.env.NEXT_PUBLIC_LENGTH_START), "coupe un peu")
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

  const [choosenDifficulty, setChoosenDifficulty] = useState<Difficulty>();

  const handleCreateParkour = async (
    dataForm: ParkourCreateEntity
  ): Promise<void> => {
    let allLienImages: ImageParkourCreateEntity[] = [];
    if (filesToUpload.length !== 0) {
      allLienImages = await uploadImages(filesToUpload, isMyCouverture); // fonction à part
    }

    const dataAggregate: ParkourCreateEntity = {
      ...dataForm,
      difficulty: choosenDifficulty,
      city: selectedCommuneName,
      epreuves: selectedEpreuveIds,
      images: allLienImages,
      parkourConnect: selectedParkoursConnectIds,
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
    start: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  // --- DEAL WITH IDS EPREUVES ---
  const [
    getListEpreuvesByTitle,
    { data: dataEpreuves, loading: loadingEpreuves, error: errorEpreuves },
  ] = useGetTop20EpreuveByTitleLazyQuery();

  const handleSearchTitle = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    getListEpreuvesByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListEpreuvesByTitle();
  }, []);

  const [selectedEpreuveIds, setSelectedEpreuveIds] = useState<number[]>([]);

  const handleEpreuveSelection = (value: any) => {
    const selectedIds = value.map((option: { id: string }) =>
      parseInt(option.id)
    );
    setSelectedEpreuveIds(selectedIds);
  };

  // --- DEAL WITH IDS PARKOURS CONNECT ---
  const [
    getListParkoursConnectByTitle,
    {
      data: dataParkoursConnect,
      loading: loadingParkoursConnect,
      error: errorParkoursConnect,
    },
  ] = useGetListTop20ParkourByTitleLazyQuery();

  const handleSearchTitleParkourConnect = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    getListParkoursConnectByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListParkoursConnectByTitle();
  }, []);

  const [selectedParkoursConnectIds, setSelectedParkoursConnectIds] = useState<
    number[]
  >([]);

  const handleParkoursConnectSelection = (value: any) => {
    const selectedIds = value.map((option: { id: string }) =>
      parseInt(option.id)
    );
    setSelectedParkoursConnectIds(selectedIds);
  };

  // --- API COMMUNES ---
  const [selectedCommuneName, setSelectedCommuneName] = useState("");

  // --- UPLOAD IMAGES ---
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // à envoyer dans le modify en temps que "images"
  const [isMyCouverture, setIsMyCouverture] = useState<number>();

  return (
    <main className="createParkour">
      <GoBack />

      <h1>Créer un parkour</h1>

      {/* --- form create images --- */}
      <FormCreateImages
        setFilesToUpload={setFilesToUpload}
        filesToUpload={filesToUpload}
        setIsMyCouverture={setIsMyCouverture}
        isMyCouverture={isMyCouverture}
      />

      {/* --- form create parkour --- */}
      <form onSubmit={handleSubmit(handleCreateParkour)} className="bigForm">
        <div className="champ">
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
            inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_TITLE }}
            onChange={(e) => handleChangeAThing("title", e.target.value)}
          />
          <span>
            {values.title.length > 0
              ? `${values.title.length}/${process.env.NEXT_PUBLIC_LENGTH_TITLE}`
              : ""}
          </span>
          <p className="error">{errors?.title?.message}</p>
        </div>
        <div className="champ">
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
            inputProps={{
              maxLength: process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION,
            }}
            onChange={(e) => handleChangeAThing("description", e.target.value)}
          />
          <span>
            {values.description.length > 0
              ? `${values.description.length}/${process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION}`
              : ""}
          </span>
          <p className="error">{errors?.description?.message}</p>
        </div>

        <div className="containerMiniChamp">
          <div className="champ">
            <TextField
              className="mui-input"
              fullWidth
              variant="outlined"
              label="temps moyen pour finir le parkour"
              required
              {...register("time")}
              InputProps={{
                inputProps: { max: process.env.NEXT_PUBLIC_MAX_TIME },
              }}
              id="time"
              name="time"
              type="number"
            />
            <p className="error">{errors?.time?.message}</p>
          </div>
          <div className="champ">
            <TextField
              className="mui-input"
              fullWidth
              variant="outlined"
              label="longueur du parkour"
              required
              {...register("length")}
              InputProps={{
                inputProps: { max: process.env.NEXT_PUBLIC_MAX_LENGTH },
              }}
              id="length"
              name="length"
              type="number"
            />
            <p className="error">{errors?.length?.message}</p>
          </div>
        </div>

        <div className="containerMiniChamp">
          <div className="champ">
            <SearchBarCommuneName
              userValue={selectedCommuneName}
              setSelectedCommuneName={setSelectedCommuneName}
            />
          </div>
          <div className="champ">
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
              inputProps={{ maxLength: process.env.NEXT_PUBLIC_LENGTH_START }}
              onChange={(e) => handleChangeAThing("start", e.target.value)}
            />
            <span>
              {values.start.length > 0
                ? `${values.start.length}/${process.env.NEXT_PUBLIC_LENGTH_START}`
                : ""}
            </span>
            <p className="error">{errors?.start?.message}</p>
          </div>
        </div>

        <div className="champ difficulty">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Difficultée</InputLabel>
            <Select
              className="mui-input"
              variant="outlined"
              id="difficulty"
              name="difficulty"
              label="Difficultée"
              required
              onChange={(e) =>
                setChoosenDifficulty(e.target.value as Difficulty)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="EASY">facile</MenuItem>
              <MenuItem value="MEDIUM">moyen</MenuItem>
              <MenuItem value="HARD">difficile</MenuItem>
            </Select>
          </FormControl>
          <p className="error">{errors?.difficulty?.message}</p>
        </div>

        <div className="containerMultiComplete">
          <div className="champ">
            <Autocomplete
              id="epreuves"
              className="mui-input"
              multiple
              fullWidth
              loading={loadingEpreuves}
              disableCloseOnSelect
              // on change
              onInputChange={handleSearchTitle}
              onChange={(e, value, detail) => handleEpreuveSelection(value)}
              // pour rechercher dans le back
              options={dataEpreuves?.getTop20EpreuveByTitle ?? []}
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

          <div className="champ">
            <Autocomplete
              id="parkourConnect"
              className="mui-input"
              multiple
              fullWidth
              loading={loadingParkoursConnect}
              disableCloseOnSelect
              // on change
              onInputChange={handleSearchTitleParkourConnect}
              onChange={(e, value, detail) =>
                handleParkoursConnectSelection(value)
              }
              // pour rechercher dans le back
              options={dataParkoursConnect?.getTop20ParkourByTitle ?? []}
              // render qui veut un string
              getOptionLabel={(option) => option.title}
              // pour le style autour
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Recherche par titre un parkour à connecté"
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
        </div>

        <button type="submit" disabled={loading}>
          Créer le parkour
        </button>

        <section className="usefullLink">
          <p>Liens utiles : </p>
          <a
            className="button"
            href="https://www.google.fr/maps/preview"
            target="_blank"
          >
            Maps
          </a>
          <a
            className="button"
            href="https://www.calculitineraires.fr/"
            target="_blank"
          >
            Calcul d'itinéraires
          </a>
        </section>

        <div>
          <span>{error?.message}</span>
        </div>
      </form>
    </main>
  );
};

export default createParkour;
