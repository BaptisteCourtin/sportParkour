import Link from "next/link";
import React from "react";
import Image from "next/image";

import icon from "/public/favicon.ico";
import DarkLight from "./DarkLight";

const navbar = ({ isDarkTheme, setIsDarkTheme }: any) => {
  return (
    <header>
      <nav className="navbar">
        <Link href="/">
          {/* <Image src={icon} alt="icon" className="logo-icon" priority={true} /> */}
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
