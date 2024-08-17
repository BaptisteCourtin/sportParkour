import { SyntheticEvent, useEffect } from "react";
import Link from "next/link";

import { useGetListTop20ParkourByTitleLazyQuery } from "@/types/graphql";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// style le link pour prendre toute la place
const titleBarParkour = () => {
  const [getListParkoursByTitle, { data, loading, error }] =
    useGetListTop20ParkourByTitleLazyQuery();

  const handleSearchTitle = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    getListParkoursByTitle({ variables: { title: value as string } });
  };

  useEffect(() => {
    getListParkoursByTitle();
  }, []);

  return (
    <Autocomplete
      className="mui-input"
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label="Recherche un parkour par titre" />
      )}
      sx={{ width: 300 }}
      // ---
      options={data?.getTop20ParkourByTitle ?? []}
      getOptionLabel={(option) => option.title}
      onInputChange={handleSearchTitle}
      // ---
      renderOption={(props, option, state) => (
        <li {...props} key={option.id}>
          <Link href={`/parkour/${option.id}`}>
            <p key={state.index}>{option.title}</p>
          </Link>
        </li>
      )}
    />
  );
};

export default titleBarParkour;
