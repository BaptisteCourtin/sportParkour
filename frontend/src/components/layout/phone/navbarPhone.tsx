import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaUser } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa6";

const navbarPhone = () => {
  const router = useRouter();
  return (
    <nav className="navbarPhone elementsNavigation">
      <Link
        href="/epreuve/allEpreuves"
        className={router.pathname.startsWith("/epreuve") ? "active" : ""}
      >
        <span className="icon">
          <FaFlagCheckered />
        </span>
        <p>Epreuves</p>
      </Link>

      <Link
        href="/"
        className={
          (router.pathname == "/" || router.pathname.startsWith("/parkour")) &&
          !router.pathname.startsWith("/parkour/parkourMap")
            ? "active"
            : ""
        }
      >
        <span className="icon">
          <FaHouse />
        </span>
        <p>Accueil</p>
      </Link>

      <Link
        href="/parkour/parkourMap"
        className={
          router.pathname.startsWith("/parkour/parkourMap") ? "active" : ""
        }
      >
        <span className="icon">
          <FaMapLocationDot />
        </span>
        <p>Map</p>
      </Link>

      <Link
        href="/user/profil"
        className={
          router.pathname.startsWith("/user") ||
          router.pathname.startsWith("/auth")
            ? "active"
            : ""
        }
      >
        <FaUser className="icon" />
        <p>Profil</p>
      </Link>
      <div className="indicator"></div>
    </nav>
  );
};

export default navbarPhone;
