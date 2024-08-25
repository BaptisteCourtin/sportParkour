import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ReportStatus } from "@/types/graphql";

import NoteCard from "@/components/admin/reportUser/noteCard";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock(
  "@/components/admin/buttonForComment",
  () =>
    ({ malfratId, parkourId, commentaire, isAdmin, isClient }: any) =>
      <button data-testid="button-for-comment">Button for Comment</button>
);

describe("NoteCard", () => {
  const mockNote = {
    id: "1",
    status: ReportStatus.NonVu,
    commentaire: "Commentaire en faute",
    parkour: {
      id: "parkour-1",
      title: "Parkour Title",
    },
  };

  const mockMalfratId = "111";

  it("matches snapshot", () => {
    const { asFragment } = render(
      <NoteCard note={mockNote} malfratId={mockMalfratId} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(<NoteCard note={mockNote} malfratId={mockMalfratId} />);

    // Vérifier la présence du commentaire en faute
    expect(screen.getByText("Commentaire en faute")).toBeInTheDocument();

    // Vérifier la présence du bouton pour commentaire
    expect(screen.getByTestId("button-for-comment")).toBeInTheDocument();

    // Vérifier la présence du lien vers le parkour
    expect(
      screen.getByText("Parkour du commentaire : Parkour Title")
    ).toBeInTheDocument();
  });
});
