import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

import React from "react";
import { useDarkLightContext } from "@/context/themeContext";

const DarkLight = () => {
  const { isDarkTheme, toggleTheme } = useDarkLightContext();

  return (
    <div className={`toggle-mode ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
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
