import Link from "next/link";
import React from "react";

import DarkLight from "./DarkLight";

const navbar = ({ isDarkTheme, setIsDarkTheme }: any) => {
  // link page user + logo user
  // link page all epreuves

  return (
    <header>
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

export default navbar;
