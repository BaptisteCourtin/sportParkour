import Footer from "./footer";
import { useEffect, useState } from "react";

import NavbarOrdi from "./navbarOrdi";
import NavbarPhone from "./navbarPhone";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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
      {windowWidth > 800 ? (
        <NavbarOrdi isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      ) : null}

      {/* nos pages = children*/}
      <div className="layoutChild">{children}</div>

      {windowWidth <= 800 ? <NavbarPhone /> : null}

      {windowWidth > 800 ? <Footer /> : null}
    </div>
  );
};
export default Layout;
