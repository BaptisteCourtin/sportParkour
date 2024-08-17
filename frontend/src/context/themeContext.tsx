import { createContext, useState, useContext } from "react";

interface DarkLightContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const DarkLightContext = createContext<DarkLightContextProps | undefined>(
  undefined
);

export const DarkLightProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <DarkLightContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </DarkLightContext.Provider>
  );
};

export const useDarkLightContext = (): DarkLightContextProps => {
  const context = useContext(DarkLightContext);
  if (!context) {
    throw new Error(
      "useDarkLightContext doit être utilisé dans un DarkLightProvider"
    );
  }
  return context;
};
