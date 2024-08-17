import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FaArrowRight } from "react-icons/fa6";

const bigTriPar = ({ tri, setTri }) => {
  return (
    <div className="champ bigTriPar">
      <FormControl className="containerInputTri" sx={{ m: 1, minWidth: 250 }}>
        <InputLabel htmlFor="tri">Trier par :</InputLabel>
        <Select
          className="mui-input"
          variant="outlined"
          id="order"
          name="order"
          label="Trier par :"
          value={tri}
          onChange={(event) => setTri(event.target.value as string)}
        >
          <MenuItem value="id_DESC">par défaut</MenuItem>
          <MenuItem value="note_DESC">
            note décroissante <FaArrowRight className="turnRightDown" />
          </MenuItem>
          <MenuItem value="note_ASC">
            note croissante <FaArrowRight className="turnRightTop" />
          </MenuItem>
          <MenuItem value="title_ASC">nom A-Z</MenuItem>
          <MenuItem value="title_DESC">nom Z-A</MenuItem>
          <MenuItem value="time_DESC">
            temps décroissant <FaArrowRight className="turnRightDown" />
          </MenuItem>
          <MenuItem value="time_ASC">
            temps croissant <FaArrowRight className="turnRightTop" />
          </MenuItem>
          <MenuItem value="length_DESC">
            longueur décroissante <FaArrowRight className="turnRightDown" />
          </MenuItem>
          <MenuItem value="length_ASC">
            longueur croissante <FaArrowRight className="turnRightTop" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default bigTriPar;
