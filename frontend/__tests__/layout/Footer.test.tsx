import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/layout/ordi/footer"; // Ajustez le chemin d'importation si nécessaire

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
  FaXTwitter: () => <span data-testid="fa-x-twitter">TwitterIcon</span>,
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
    expect(screen.getByText("NOS RÉSAUX")).toBeInTheDocument();
    expect(screen.getByTestId("fa-facebook")).toBeInTheDocument();
    expect(screen.getByTestId("fa-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("fa-x-twitter")).toBeInTheDocument();
    expect(screen.getByTestId("fa-linkedin")).toBeInTheDocument();
  });

  test("renders resources section", () => {
    expect(screen.getByText("RESSOURCES")).toBeInTheDocument();
    expect(screen.getByText("Qui sommes nous ?")).toBeInTheDocument();
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
      screen.getByText(/Site réalisé par Baptiste Courtin/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/© 2024 - tous droits réservés/)
    ).toBeInTheDocument();
  });

  test("renders correct links", () => {
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
    expect(screen.getByTestId("fa-facebook").closest("a")).toHaveAttribute(
      "href",
      "https://www.facebook.com/"
    );
    expect(screen.getByText("Qui sommes nous ?").closest("a")).toHaveAttribute(
      "href",
      "/infos/quiSommesNous"
    );
  });
});
