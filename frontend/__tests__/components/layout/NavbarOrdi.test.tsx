import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavbarOrdi from "@/components/layout/ordi/navbarOrdi";

// Mock du router
jest.mock("next/router", () => require("next-router-mock"));

// Mock du dark/light
jest.mock("@/context/themeContext", () => ({
  useDarkLightContext: () => ({
    isDarkTheme: true,
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("@/components/layout/ordi/darkLightOrdi", () => () => (
  <div>DarkLight</div>
));

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

// Mock pour le composant Tooltip de MUI (quand tu reste dessus ça fait du texte)
jest.mock("@mui/material/Tooltip", () => {
  return ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => <div title={title}>{children}</div>;
});

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

describe("Navbar", () => {
  test("le skipper existe", () => {
    render(<NavbarOrdi />);

    const skipper = screen.getByText("Aller au contenu principal");
    expect(skipper).toBeInTheDocument();
    expect(skipper).toHaveAttribute("href", "#main");
    expect(skipper).toHaveClass("skipNavbarLink");
  });

  test("les liens existent", () => {
    render(<NavbarOrdi />);

    expect(screen.getByText("DarkLight")).toBeInTheDocument();
    expect(screen.getByTitle("Épreuves")).toBeInTheDocument();
    expect(screen.getByTitle("Parkour")).toBeInTheDocument();
    expect(screen.getByTitle("Maps")).toBeInTheDocument();
    expect(screen.getByTitle("Profil")).toBeInTheDocument();
  });
});
