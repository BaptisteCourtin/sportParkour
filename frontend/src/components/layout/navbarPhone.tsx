import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaUser } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa6";

const navbarPhone = () => {
  const router = useRouter();
  return (
    <nav className="navbarPhone">
      <Link
        href="/user/profil"
        className={router.pathname == "/user/profil" ? "active" : ""}
      >
        <FaUser className="icon" />
        <p>Profil</p>
      </Link>
      <Link href="/" className={router.pathname == "/" ? "active" : ""}>
        <span className="icon">
          <FaHouseChimney />
        </span>
        <p>Accueil</p>
      </Link>
      <Link
        href="/parkour/parkourMap"
        className={router.pathname == "/parkour/parkourMap" ? "active" : ""}
      >
        <span className="icon">
          <FaMapLocationDot />
        </span>
        <p>Map</p>
      </Link>
      <Link
        href="/epreuve/allEpreuves"
        className={router.pathname == "/epreuve/allEpreuves" ? "active" : ""}
      >
        <span className="icon">
          <FaMedal />
        </span>
        <p>Epreuves</p>
      </Link>

      <div className="indicator"></div>
    </nav>
  );
};

export default navbarPhone;
