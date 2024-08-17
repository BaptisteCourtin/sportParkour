import { FaMoon, FaSun } from "react-icons/fa6";

import { useDarkLightContext } from "@/context/themeContext";

// button dark/light en version téléphone
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
