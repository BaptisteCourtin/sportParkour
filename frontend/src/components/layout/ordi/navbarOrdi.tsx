import { useRouter } from "next/router";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import {
  FaUser,
  FaHouse,
  FaMapLocationDot,
  FaFlagCheckered,
} from "react-icons/fa6";

import { useDarkLightContext } from "@/context/themeContext";
import DarkLight from "@/components/layout/ordi/darkLightOrdi";

// navbar ordi (en haut) avec logo + dark/light + liens pages
const navbarOrdi = () => {
  const router = useRouter();
  const { isDarkTheme, toggleTheme } = useDarkLightContext();

  return (
    <header className="navbarOrdi elementsNavigation">
      <a className="skipNavbarLink" href="#main">
        Aller au contenu principal
      </a>

      <nav className="navbar">
        <Link href="/">
          {isDarkTheme ? (
            <img src="/Full-White.svg" alt="logo" className="logo" />
          ) : (
            <img src="/Full-Black.svg" alt="logo" className="logo" />
          )}
        </Link>

        <div className="links">
          <DarkLight />

          <Tooltip title="Épreuves" arrow>
            <Link
              href="/epreuve/allEpreuves"
              className={router.pathname.startsWith("/epreuve") ? "active" : ""}
            >
              <span className="icon">
                <FaFlagCheckered />
              </span>
            </Link>
          </Tooltip>

          <Tooltip title="Parkour" arrow>
            <Link
              href="/"
              className={
                (router.pathname == "/" ||
                  router.pathname.startsWith("/parkour")) &&
                !router.pathname.startsWith("/parkour/parkourMap")
                  ? "active"
                  : ""
              }
            >
              <span className="icon">
                <FaHouse />
              </span>
            </Link>
          </Tooltip>

          <Tooltip title="Maps" arrow>
            <Link
              href="/parkour/parkourMap"
              className={
                router.pathname.startsWith("/parkour/parkourMap")
                  ? "active"
                  : ""
              }
            >
              <span className="icon">
                <FaMapLocationDot />
              </span>
            </Link>
          </Tooltip>

          <Tooltip title="Profil" arrow>
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
            </Link>
          </Tooltip>
        </div>
      </nav>
    </header>
  );
};

export default navbarOrdi;
