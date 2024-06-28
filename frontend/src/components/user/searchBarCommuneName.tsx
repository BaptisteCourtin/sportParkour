import React, { SyntheticEvent, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface TypeCommuneByName {
  codesPostaux: Array<string>;
  nom: string;
  code: string;
  score: number;
}

interface TypeCommune {
  codePostal: string;
  nom: string;
  code: string;
}

// userValue = commune sélectionné (seulement le nom)
const SearchBarCommuneName = ({
  userValue,
  setSelectedCommuneName,
  setSelectedCommuneCodePostal,
}: {
  userValue: string;
  setSelectedCommuneName: any;
  setSelectedCommuneCodePostal?: any;
}) => {
  const [selectedCommune, setSelectedCommune] = useState(null); // commune selectionné (entité complète)
  const [communesPossibles, setCommunesPossibles] = useState<
    Array<TypeCommune>
  >([]); // les possibilitées dans le menu déroulant

  // appel l'api
  const fetchCommuneByName = async (
    e?: SyntheticEvent<Element, Event> | null,
    nomCommuneVoulu?: string,
    isStart?: boolean
  ) => {
    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${nomCommuneVoulu}&fields=codesPostaux&limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // un objet par code postal
      const options: TypeCommune[] = data.flatMap(
        (commune: TypeCommuneByName) => {
          return commune.codesPostaux.map((codePostal) => ({
            codePostal: codePostal,
            nom: commune.nom,
            code: commune.code,
          }));
        }
      );

      setCommunesPossibles(options);

      if (nomCommuneVoulu && isStart) {
        // trouver celle avec le même vrai nom
        const communeTrouvee = data.find(
          (objet: TypeCommuneByName) =>
            objet.nom.toLowerCase() === nomCommuneVoulu.toLowerCase()
        );
        setSelectedCommune(communeTrouvee || null); // que dans ce composant (ne va pas changer le code postal)
      }
    } catch (error) {
      console.error(error);
    }
  };

  // pour afficher de base
  useEffect(() => {
    if (userValue) {
      fetchCommuneByName(null, userValue, true);
    } else {
      setSelectedCommune(null);
    }
  }, [userValue]);

  // quand on clique sur une commune
  function handlerChangeCommune(value: TypeCommune | null): void {
    if (value != null) {
      setSelectedCommuneName(value?.nom);
      if (setSelectedCommuneCodePostal) {
        setSelectedCommuneCodePostal(value?.codePostal);
      }
    } else {
      setSelectedCommuneName("");
      if (setSelectedCommuneCodePostal) {
        setSelectedCommuneCodePostal("");
      }
      setSelectedCommune(null);
    }
  }

  return (
    <Autocomplete
      className="mui-input"
      disablePortal
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Votre commune" />}
      //
      options={communesPossibles}
      getOptionLabel={(option) => option.nom}
      onInputChange={(event, value) => fetchCommuneByName(null, value)}
      //
      clearOnBlur
      value={selectedCommune}
      onChange={(event, newValue) => handlerChangeCommune(newValue)}
      renderOption={(props, option) => (
        <li {...props} key={option.code + option.codePostal}>
          {option.nom}, {option.codePostal}
        </li>
      )}
    />
  );
};

export default SearchBarCommuneName;
