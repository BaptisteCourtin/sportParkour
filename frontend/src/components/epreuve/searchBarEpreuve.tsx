import React, { SyntheticEvent, useEffect } from "react";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetTop20EpreuveByTitleLazyQuery } from "@/types/graphql";

// style le link pour prendre toute la place
const titleBarEpreuve = () => {
  const [getListEpreuvesByTitle, { data, loading, error }] =
    useGetTop20EpreuveByTitleLazyQuery();

  const handleSearchTitle = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    getListEpreuvesByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListEpreuvesByTitle();
  }, []);

  return (
    <Autocomplete
      className="mui-input"
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label="Recherche une épreuve par titre" />
      )}
      sx={{ width: 300 }}
      // ---
      options={data?.getTop20EpreuveByTitle ?? []}
      getOptionLabel={(option) => option.title}
      onInputChange={handleSearchTitle}
      // ---
      renderOption={(props, option, state) => (
        <li {...props} key={option.id}>
          <Link href={`/epreuve/${option.id}`}>
            <p key={state.index}>{option.title}</p>
          </Link>
        </li>
      )}
    />
  );
};

export default titleBarEpreuve;
