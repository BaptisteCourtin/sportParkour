import React from "react";
import Link from "next/link";

import DarkLight from "@/pages/user/options/DarkLight";

import { FaUser } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa6";
import { useRouter } from "next/router";

const navbarOrdi = ({ isDarkTheme, setIsDarkTheme }: any) => {
  const router = useRouter();

  return (
    <header className="navbarOrdi elementsNavigation">
      <nav className="navbar">
        <Link href="/">
          {isDarkTheme ? (
            <img src="/Full-White.svg" alt="logo" className="logo" />
          ) : (
            <img src="/Full-Black.svg" alt="logo" className="logo" />
          )}
        </Link>

        <div className="links">
          <DarkLight
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />

          <Link href="/" className={router.pathname == "/" ? "active" : ""}>
            <span className="icon">
              <FaHouse />
            </span>
          </Link>

          <Link
            href="/parkour/parkourMap"
            className={router.pathname == "/parkour/parkourMap" ? "active" : ""}
          >
            <span className="icon">
              <FaMapLocationDot />
            </span>
          </Link>

          <Link
            href="/epreuve/allEpreuves"
            className={
              router.pathname == "/epreuve/allEpreuves" ? "active" : ""
            }
          >
            <span className="icon">
              <FaFlagCheckered />
            </span>
          </Link>

          <Link
            href="/user/profil"
            className={router.pathname == "/user/profil" ? "active" : ""}
          >
            <FaUser className="icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default navbarOrdi;
