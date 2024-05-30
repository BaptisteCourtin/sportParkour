import Link from "next/link";
import React from "react";

const planDuSite = () => {
  return (
    <main className="pagesInfos">
      <h1>PLAN DU SITE</h1>
      <h2>En vigueur au 01/08/2024</h2>
      <section>
        <Link href="/auth/inscription">Inscription</Link>
        <Link href="/auth/login">Authentification</Link>

        <Link href="/">Rechercher un parkour</Link>
        <Link href="/parkour/parkourMap">
          Rechercher un parkour avec une carte
        </Link>
        <Link href="/allEpreuves">Rechercher une épreuve</Link>

        <Link href="/user/profil">
          Votre profil (il faut avoir un compte et être connecté)
        </Link>
        <Link href="/user/favoris">
          Vos parkours favoris (il faut avoir un compte et être connecté)
        </Link>

        <Link href="/infos/cgu">CGU</Link>
        <Link href="/infos/faq">FAQ</Link>
        <Link href="/infos/mentionsLegales">Mentions légales</Link>
        <Link href="/infos/planDuSite">Plan du site (c'est cette page)</Link>
        <Link href="/infos/politiqueDeConfidentialite">
          Politique de confidentialité
        </Link>
        <Link href="/infos/quiSommesNous">Qui sommes nous</Link>

        <Link href="/404">La page 404 </Link>
      </section>
    </main>
  );
};

export default planDuSite;
