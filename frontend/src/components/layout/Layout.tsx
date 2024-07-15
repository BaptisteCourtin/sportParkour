import { useEffect, useState } from "react";

import NavbarOrdi from "./ordi/navbarOrdi";
import Footer from "./ordi/footer";

import NavbarPhone from "./phone/navbarPhone";
import HeaderPhone from "./phone/headerPhone";
import { useDarkLightContext } from "@/context/themeContext";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { isDarkTheme, toggleTheme } = useDarkLightContext();

  // savoir la taille de l'écran (en temps réel)
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className={`layoutFlex ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
      {windowWidth > 800 ? <NavbarOrdi /> : null}
      {windowWidth <= 800 ? <HeaderPhone /> : null}

      {/* nos pages = children*/}
      <div className="layoutChild" id="main">
        {children}
      </div>

      {windowWidth <= 800 ? <NavbarPhone /> : null}
      <Footer />
    </div>
  );
};
export default Layout;
