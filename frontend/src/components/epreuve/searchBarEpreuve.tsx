import React, { SyntheticEvent, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetListEpreuvesBySearchLazyQuery } from "@/types/graphql";
import Link from "next/link";

// style le link pour prendre toute la place
const searchBarEpreuve = () => {
  const [getListEpreuvesBySearch, { data, loading, error }] =
    useGetListEpreuvesBySearchLazyQuery();

  const handleSearch = (e: SyntheticEvent<Element, Event>, value: string) => {
    getListEpreuvesBySearch({ variables: { search: value as string } });
  };

  useEffect(() => {
    getListEpreuvesBySearch();
  }, []);

  return (
    <Autocomplete
      className="searchBar"
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label="Recherche épreuve" />
      )}
      sx={{ width: 300 }}
      // ---
      loading={loading}
      options={data?.getListBySearch ?? []}
      getOptionLabel={(option) => option.title}
      onInputChange={handleSearch}
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

export default searchBarEpreuve;
