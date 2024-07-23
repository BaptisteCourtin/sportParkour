import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuiSommesNous from "@/pages/infos/quiSommesNous";

// Mock des composants MUI avec types explicites
jest.mock(
  "@mui/material/Accordion",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion">{children}</div>
);
jest.mock(
  "@mui/material/AccordionSummary",
  () =>
    ({
      children,
      expandIcon,
    }: {
      children: React.ReactNode;
      expandIcon: React.ReactNode;
    }) =>
      (
        <div data-testid="accordion-summary">
          {children}
          {expandIcon && <div data-testid="expand-icon" />}
        </div>
      )
);
jest.mock(
  "@mui/material/AccordionDetails",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion-details">{children}</div>
);

// Mock du composant FaAngleDown
jest.mock("react-icons/fa6", () => ({
  FaAngleDown: () => <div data-testid="fa-angle-down" />,
}));

describe("Qui Sommes Nous Page", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<QuiSommesNous />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the main title and subtitle", () => {
    render(<QuiSommesNous />);
    expect(screen.getByText("QUI SOMMES NOUS")).toBeInTheDocument();
    expect(screen.getByText("et infos sur le site")).toBeInTheDocument();
  });

  it("renders the creator information", () => {
    render(<QuiSommesNous />);
    const creatorLink = screen.getByText("Créateur du site : Baptiste Courtin");
    expect(creatorLink).toBeInTheDocument();
    expect(creatorLink).toHaveAttribute(
      "href",
      "https://portfolio-baptiste-courtin.netlify.app/"
    );
    expect(creatorLink).toHaveAttribute("target", "_blank");
  });

  it("renders four accordion items", () => {
    render(<QuiSommesNous />);
    const accordions = screen.getAllByTestId("accordion");
    expect(accordions).toHaveLength(4);
  });

  it("renders correct questions", () => {
    render(<QuiSommesNous />);
    expect(
      screen.getByText("Q : Il sert à quoi ce site ?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Q : Pourquoi avoir créer ce site ?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Q : Va-t-il y avoir des mise à jour ?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Q : Où peut on suivre le créateur du site? (il est sympa le gars)"
      )
    ).toBeInTheDocument();
  });

  it("renders correct answers", () => {
    render(<QuiSommesNous />);
    expect(
      screen.getByText(/Tu peux trouver des parcours sportifs/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pour passer ma certification de concepteur développeur web/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bah là c'est pas prévu mais j'ai des idées/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Alors! Très bonne question!/)).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<QuiSommesNous />);
    const githubLink = screen.getByText(
      "Github : https://github.com/BaptisteCourtin"
    );
    const linkedInLink = screen.getByText(
      "LinkedIn : https://www.linkedin.com/in/baptistecourtin/"
    );

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/BaptisteCourtin"
    );

    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/baptistecourtin/"
    );
  });

  it("renders the hiring please", () => {
    render(<QuiSommesNous />);
    expect(
      screen.getByText(/(Embauchez moi s'il vous plait)/)
    ).toBeInTheDocument();
  });
});
