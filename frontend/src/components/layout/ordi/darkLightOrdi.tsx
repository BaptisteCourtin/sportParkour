import { FaMoon, FaSun } from "react-icons/fa6";

import { useDarkLightContext } from "@/context/themeContext";

// button dark/light en version desktop
const DarkLight = () => {
  const { isDarkTheme, toggleTheme } = useDarkLightContext();

  return (
    <div
      className={`darkLightOrdi ${isDarkTheme ? "darkTheme" : "lightTheme"}`}
    >
      <input type="checkbox" id="toggle" onClick={() => toggleTheme()} />
      <label className="toggle" htmlFor="toggle">
        <FaSun className="icon sun" />
        <FaMoon className="icon moon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default DarkLight;
