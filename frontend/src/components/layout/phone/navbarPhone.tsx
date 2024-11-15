import Link from "next/link";
import { useRouter } from "next/router";

import {
  FaUser,
  FaHouse,
  FaMapLocationDot,
  FaFlagCheckered,
} from "react-icons/fa6";

// navbar phone (an bas) avec liens pages
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
        <p>Épreuves</p>
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
        <p>Maps</p>
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
