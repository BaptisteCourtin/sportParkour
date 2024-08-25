import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import Faq from "@/pages/infos/faq";

// Mock des composants MUI
jest.mock(
  "@mui/material/Accordion",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion">{children}</div>
);
jest.mock(
  "@mui/material/AccordionSummary",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion-summary">{children}</div>
);
jest.mock(
  "@mui/material/AccordionDetails",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion-details">{children}</div>
);
jest.mock(
  "@mui/material/AccordionActions",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="accordion-actions">{children}</div>
);
jest.mock(
  "@mui/material/Button",
  () =>
    ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
    }) =>
      <button onClick={onClick}>{children}</button>
);

// ---------------------------------------------------------------------------

describe("Faq Page", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Faq />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the title", () => {
    render(<Faq />);
    expect(
      screen.getByText("Questions fréquemment posées")
    ).toBeInTheDocument();
  });

  it("renders three accordion items", () => {
    render(<Faq />);
    const accordions = screen.getAllByTestId("accordion");
    expect(accordions).toHaveLength(3);
  });

  it("renders correct questions", () => {
    render(<Faq />);
    expect(
      screen.getByText("Q : Comment vous contacter ?")
    ).toBeInTheDocument();
    expect(screen.getByText("Q : Vous aimez le sport ?")).toBeInTheDocument();
    expect(screen.getByText("Q : Ça va ?")).toBeInTheDocument();
  });

  it("renders correct answers", () => {
    render(<Faq />);
    expect(screen.getByText("Ne le fais pas.")).toBeInTheDocument();
    expect(screen.getByText("Non, mais l'argent oui.")).toBeInTheDocument();
    expect(screen.getByText("Moi ouais.")).toBeInTheDocument();
  });

  it("handles user interaction correctly", () => {
    render(<Faq />);
    const positiveButton = screen.getByText("Moi aussi ça va. 👍");
    const negativeButton = screen.getByText(
      "Moi non, mais tout le monde s'en fout."
    );

    fireEvent.click(positiveButton);
    expect(screen.getByText("C'est bien")).toBeInTheDocument();

    fireEvent.click(negativeButton);
    expect(screen.getByText("T'as raison")).toBeInTheDocument();
  });
});
