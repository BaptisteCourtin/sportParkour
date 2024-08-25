import Link from "next/link";

import {
  FaMapLocationDot,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

// footer (ordi et téléphone), en bas de chaque page
const footer = () => {
  return (
    <footer>
      <div className="wrap">
        <nav>
          <section>
            <h4>CONTACT</h4>
            <a
              href="https://www.google.fr/maps/place/20+Rue+de+la+Brasserie,+44100+Nantes/@47.2086777,-1.5763371,17"
              target="_blank"
            >
              <FaMapLocationDot /> 20 rue de la brasserie, 44100 Nantes
            </a>
            {/* <a href="mailto:kevin75du75@gmail.com" target="_blank">
              <FaEnvelope /> kevin75du75@gmail.com
            </a> */}
            <Link href="/infos/mailToAdmin">
              <FaEnvelope /> kevin75du75@gmail.com
            </Link>
            <a href="tel:+612345678" target="_blank">
              <FaPhone /> 06 14 54 50 64
            </a>
          </section>
          <section>
            <h4>NOS RÉSEAUX</h4>
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
            <Link href="/infos/quiSommesNous">Qui sommes-nous ?</Link>
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
