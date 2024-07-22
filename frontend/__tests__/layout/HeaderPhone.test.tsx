import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeaderPhone from "@/components/layout/phone/headerPhone"; // Ajustez le chemin d'importation si nécessaire

// Mock pour next/router
jest.mock("next/router", () => ({
  back: jest.fn(),
}));

// Mock du dark/light
jest.mock("@/context/themeContext", () => ({
  useDarkLightContext: () => ({
    isDarkTheme: true,
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("@/components/layout/phone/darkLightPhone", () => () => (
  <div>DarkLight</div>
));

describe("HeaderPhone", () => {
  test("il y a un dark/light", () => {
    render(<HeaderPhone />);

    expect(screen.getByTestId("fa-arrow-left")).toBeInTheDocument();
    expect(screen.getByText("DarkLight")).toBeInTheDocument();
  });

  test("le retour marche", () => {
    render(<HeaderPhone />);

    const arrowButton = screen.getByTestId("fa-arrow-left");
    fireEvent.click(arrowButton);

    expect(require("next/router").back).toHaveBeenCalledTimes(1);
  });
});
