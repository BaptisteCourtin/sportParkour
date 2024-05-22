import React from "react";
import Link from "next/link";

import DarkLight from "./DarkLight";

const navbarOrdi = ({ isDarkTheme, setIsDarkTheme }: any) => {
  // link page user + logo user
  // link page all epreuves

  return (
    <header className="navbarOrdi">
      <nav className="navbar">
        <Link href="/">
          <img src="/logoAvecNom.png" alt="logo" className="logo" />
        </Link>

        <div className="links">
          <DarkLight
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
          <Link href="/">a</Link>
          <Link href="/">b</Link>
        </div>
      </nav>
    </header>
  );
};

export default navbarOrdi;
