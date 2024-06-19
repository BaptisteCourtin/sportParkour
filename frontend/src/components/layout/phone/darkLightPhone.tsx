import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

import React from "react";
import { useDarkLightContext } from "@/context/themeContext";

const DarkLightPhone = () => {
  const { isDarkTheme, toggleTheme } = useDarkLightContext();

  return (
    <>
      {isDarkTheme ? (
        <FaSun
          className="darkLightPhone icon sun"
          onClick={() => toggleTheme()}
        />
      ) : (
        <FaMoon
          className="darkLightPhone icon moon"
          onClick={() => toggleTheme()}
        />
      )}
    </>
  );
};

export default DarkLightPhone;
