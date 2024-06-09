import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

import React from "react";

const DarkLight = ({ isDarkTheme, setIsDarkTheme }: any) => {
  return (
    <div className={`toggle-mode ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
      <input
        type="checkbox"
        id="toggle"
        onClick={() => setIsDarkTheme(!isDarkTheme)}
      />
      <label className="toggle" htmlFor="toggle">
        <FaSun className="icon sun" />
        <FaMoon className="icon moon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default DarkLight;
