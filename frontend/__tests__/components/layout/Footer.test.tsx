import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "@/components/layout/ordi/footer";

// Mock de next link
jest.mock("next/link", () => {
  return React.forwardRef<
    HTMLAnchorElement,
    { children: React.ReactNode; [key: string]: any }
  >(({ children, ...rest }, ref) => (
    <a ref={ref} {...rest}>
      {children}
    </a>
  ));
});

// Mock pour les icônes
jest.mock("react-icons/fa6", () => ({
  FaMapLocationDot: () => (
    <span data-testid="fa-map-location-dot">MapIcon</span>
  ),
  FaEnvelope: () => <span data-testid="fa-envelope">EnvelopeIcon</span>,
  FaPhone: () => <span data-testid="fa-phone">PhoneIcon</span>,
  FaFacebook: () => <span data-testid="fa-facebook">FacebookIcon</span>,
  FaInstagram: () => <span data-testid="fa-instagram">InstagramIcon</span>,
  FaXTwitter: () => <span data-testid="fa-twitter">TwitterIcon</span>,
  FaLinkedin: () => <span data-testid="fa-linkedin">LinkedinIcon</span>,
}));

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("renders contact section", () => {
    expect(screen.getByText("CONTACT")).toBeInTheDocument();
    expect(
      screen.getByText("20 rue de la brasserie, 44100 Nantes")
    ).toBeInTheDocument();
    expect(screen.getByText("kevin75du75@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("06 14 54 50 64")).toBeInTheDocument();
  });

  test("renders social media section", () => {
    expect(screen.getByText("NOS RÉSEAUX")).toBeInTheDocument();
    expect(screen.getByTestId("fa-facebook")).toBeInTheDocument();
    expect(screen.getByTestId("fa-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("fa-twitter")).toBeInTheDocument();
    expect(screen.getByTestId("fa-linkedin")).toBeInTheDocument();
  });

  test("renders resources section", () => {
    expect(screen.getByText("RESSOURCES")).toBeInTheDocument();
    expect(screen.getByText("Qui sommes-nous ?")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Plan du site")).toBeInTheDocument();
    expect(
      screen.getByText("Conditions générales d'utilisation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Politique de confidentialité")
    ).toBeInTheDocument();
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
  });

  test("renders copyright notice", () => {
    expect(
      screen.getByText(
        "Site réalisé par Baptiste Courtin | © 2024 - tous droits réservés"
      )
    ).toBeInTheDocument();
  });

  // ---

  test("renders correct links 1", () => {
    expect(
      screen.getByText("20 rue de la brasserie, 44100 Nantes").closest("a")
    ).toHaveAttribute(
      "href",
      "https://www.google.fr/maps/place/20+Rue+de+la+Brasserie,+44100+Nantes/@47.2086777,-1.5763371,17"
    );
    expect(
      screen.getByText("kevin75du75@gmail.com").closest("a")
    ).toHaveAttribute("href", "mailto:kevin75du75@gmail.com");
    expect(screen.getByText("06 14 54 50 64").closest("a")).toHaveAttribute(
      "href",
      "tel:+612345678"
    );
  });

  test("renders correct links 2", () => {
    expect(screen.getByTestId("fa-facebook").closest("a")).toHaveAttribute(
      "href",
      "https://www.facebook.com/"
    );
    expect(screen.getByTestId("fa-instagram").closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/"
    );
    expect(screen.getByTestId("fa-twitter").closest("a")).toHaveAttribute(
      "href",
      "https://twitter.com/"
    );
    expect(screen.getByTestId("fa-linkedin").closest("a")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/"
    );
  });

  test("renders correct links 3", () => {
    expect(screen.getByText("Qui sommes-nous ?").closest("a")).toHaveAttribute(
      "href",
      "/infos/quiSommesNous"
    );
    expect(screen.getByText("FAQ").closest("a")).toHaveAttribute(
      "href",
      "/infos/faq"
    );
    expect(screen.getByText("Plan du site").closest("a")).toHaveAttribute(
      "href",
      "/infos/planDuSite"
    );
    expect(
      screen.getByText("Conditions générales d'utilisation").closest("a")
    ).toHaveAttribute("href", "/infos/cgu");
    expect(
      screen.getByText("Politique de confidentialité").closest("a")
    ).toHaveAttribute("href", "/infos/politiqueDeConfidentialite");
    expect(screen.getByText("Mentions légales").closest("a")).toHaveAttribute(
      "href",
      "/infos/mentionsLegales"
    );
  });
});
