import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import NavbarPhone from "@/components/layout/phone/navbarPhone";

// Mock du router
jest.mock("next/router", () => require("next-router-mock"));

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

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

describe("NavbarPhone", () => {
  test("les liens existent", () => {
    render(<NavbarPhone />);

    expect(screen.getByText("Épreuves")).toBeInTheDocument();
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Maps")).toBeInTheDocument();
    expect(screen.getByText("Profil")).toBeInTheDocument();
  });

  test("la class 'active' est bonne par rapport à la route", () => {
    const { rerender } = render(<NavbarPhone />);

    // Test pour la page d'accueil
    expect(screen.getByText("Accueil").closest("a")).toHaveClass("active");

    // Changer la route simulée et re-rendre le composant
    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      pathname: "/epreuve/someEpreuve",
    }));
    rerender(<NavbarPhone />);

    // Test pour la page des épreuves
    expect(screen.getByText("Épreuves").closest("a")).toHaveClass("active");
  });
});
