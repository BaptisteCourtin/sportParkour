import Link from "next/link";
import React from "react";

import { FaMapMarkedAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const footer = () => {
  return (
    <footer>
      <div className="wrap">
        <nav>
          <section>
            <h4>CONTACT</h4>
            <a
              href="https://www.google.com/maps/place/Wild+Code+School+-+Formation+d%C3%A9veloppeur+web,+data+analyst,+analyste+cybers%C3%A9curit%C3%A9/@48.8688545,2.4034931,17z/data=!3m2!4b1!5s0x47e66d9bebbd073f:0xe59d9cab917bdad8!4m6!3m5!1s0x47e671e4f9ed9097:0x21f0557e9b283397!8m2!3d48.8688545!4d2.406068!16s%2Fg%2F11fy11pqtq?entry=ttu"
              target="_blank"
            >
              <FaMapMarkedAlt /> 44 Rue Alphonse Penaud, 75020 Paris
            </a>
            <a href="mailto:kevin75du75@gmail.com" target="_blank">
              <IoIosMail /> kevin75du75@gmail.com
            </a>
            <a href="tel:+612345678" target="_blank">
              <FaPhoneAlt /> 06 14 54 50 64
            </a>
          </section>
          <section>
            <h4>NOS RÉSAUX</h4>
            <div className="reseaux">
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/" target="_blank">
                <FaXTwitter />
              </a>
              <a href="https://www.linkedin.com/" target="_blank">
                <FaLinkedin />
              </a>
            </div>
          </section>
          <section>
            <h4>RESSOURCES</h4>
            <Link href="/infos/quiSommesNous">Qui sommes nous ?</Link>
            <Link href="/infos/faq">FAQ</Link>
            <Link href="/infos/planDuSite">Plan du site</Link>
            <Link href="/infos/cgu">Conditions générales d'utilisation</Link>
            <Link href="/infos/politiqueDeConfidentialite">
              Politique de confidentialité
            </Link>
            <Link href="/infos/mentionsLegales">Mentions légales</Link>
          </section>
        </nav>
        <hr />
        <p>Site réalisé par Baptiste Courtin | © 2024 - tous droits réservés</p>
      </div>
    </footer>
  );
};

export default footer;
