import React from "react";
import Link from "next/link";

import { FaCaretRight } from "react-icons/fa6";

const planDuSite = () => {
  return (
    <main className="pagesInfos">
      <h1>PLAN DU SITE</h1>
      <h2>En vigueur au 01/08/2024</h2>
      <ul>
        <h3>Pour vous connecter</h3>
        <li>
          <Link href="/auth/inscription">
            <FaCaretRight />
            Inscription
          </Link>
        </li>
        <li>
          <Link href="/auth/login">
            <FaCaretRight />
            Authentification
          </Link>
        </li>

        <br />
        <br />

        <h3>Pour rechercher :</h3>
        <li>
          <Link href="/">
            <FaCaretRight />
            Rechercher un parkour
          </Link>
        </li>
        <li>
          <Link href="/parkour/parkourMap">
            <FaCaretRight />
            Rechercher un parkour avec une carte
          </Link>
        </li>
        <li>
          <Link href="/allEpreuves">
            <FaCaretRight />
            Rechercher une épreuve
          </Link>
        </li>

        <br />
        <br />

        <h3>Votre profil (il faut avoir un compte et être connecté)</h3>
        <li>
          <Link href="/user/profil">
            <FaCaretRight />
            Votre profil
          </Link>
        </li>
        <li>
          <Link href="/user/favoris">
            <FaCaretRight />
            Vos parkours favoris
          </Link>
        </li>

        <br />
        <br />

        <h3>Les options du site</h3>
        <li>
          <Link href="/options/options">
            <FaCaretRight />
            Les options du site
          </Link>
        </li>

        <br />
        <br />

        <h3>les infos</h3>
        <li>
          <FaCaretRight />
          <Link href="/infos/cgu">CGU</Link>
        </li>
        <li>
          <FaCaretRight />
          <Link href="/infos/faq">FAQ</Link>
        </li>
        <li>
          <FaCaretRight />
          <Link href="/infos/mentionsLegales">Mentions légales</Link>
        </li>
        <li>
          <FaCaretRight />{" "}
          <Link href="/infos/planDuSite">Plan du site (c'est cette page)</Link>
        </li>
        <li>
          <FaCaretRight />
          <Link href="/infos/politiqueDeConfidentialite">
            Politique de confidentialité
          </Link>
        </li>
        <li>
          <FaCaretRight />
          <Link href="/infos/quiSommesNous">Qui sommes nous</Link>
        </li>

        <br />
        <br />

        <h3>La meilleure page du site</h3>
        <li>
          <FaCaretRight />
          <Link href="/404">La page 404</Link>
        </li>
      </ul>
    </main>
  );
};

export default planDuSite;
