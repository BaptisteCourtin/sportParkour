import React from "react";
import Link from "next/link";

import { FaCaretRight } from "react-icons/fa6";

const planDuSite = () => {
  return (
    <main className="pagesInfos">
      <h1>PLAN DU SITE</h1>
      <h2>En vigueur au 01/08/2024</h2>
      <ul className="ulPlanSite">
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
        <li>
          <Link href="/auth/resetPassword/resetPassword">
            <FaCaretRight />
            Modifier votre mot de passe
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
        <li>
          <Link href="/user/notes">
            <FaCaretRight />
            Vos avis
          </Link>
        </li>

        <br />
        <br />

        <h3>les infos</h3>
        <li>
          <Link href="/infos/cgu">
            <FaCaretRight />
            CGU
          </Link>
        </li>
        <li>
          <Link href="/infos/faq">
            <FaCaretRight />
            FAQ
          </Link>
        </li>
        <li>
          <Link href="/infos/mentionsLegales">
            <FaCaretRight />
            Mentions légales
          </Link>
        </li>
        <li>
          <Link href="/infos/planDuSite">
            <FaCaretRight />
            Plan du site (c'est cette page)
          </Link>
        </li>
        <li>
          <Link href="/infos/politiqueDeConfidentialite">
            <FaCaretRight />
            Politique de confidentialité
          </Link>
        </li>
        <li>
          <Link href="/infos/quiSommesNous">
            <FaCaretRight />
            Qui sommes nous
          </Link>
        </li>

        <br />
        <br />

        <h3>La meilleure page du site</h3>
        <li>
          <Link href="/404">
            <FaCaretRight />
            La page 404
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default planDuSite;
