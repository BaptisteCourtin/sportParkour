import React, { SyntheticEvent, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetListEpreuveByTitleLazyQuery } from "@/types/graphql";
import Link from "next/link";

// style le link pour prendre toute la place
const titleBarEpreuve = () => {
  const [getListEpreuvesByTitle, { data, loading, error }] =
    useGetListEpreuveByTitleLazyQuery();

  const handleTitle = (e: SyntheticEvent<Element, Event>, value: string) => {
    getListEpreuvesByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListEpreuvesByTitle();
  }, []);

  return (
    <Autocomplete
      className="titleBar"
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label="Recherche une épreuve par titre" />
      )}
      sx={{ width: 300 }}
      // ---
      loading={loading}
      options={data?.getListEpreuveByTitle ?? []}
      getOptionLabel={(option) => option.title}
      onInputChange={handleTitle}
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
