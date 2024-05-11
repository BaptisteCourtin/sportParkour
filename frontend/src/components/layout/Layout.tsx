import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from "react";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <>
      <div className={`layoutFlex ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
        <Navbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <div className="layoutChild">{children}</div>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
