import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ReportStatus } from "@/types/graphql";

import ReportCard from "@/components/admin/reportUser/reportCard";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock(
  "@/components/DateFormatter",
  () =>
    ({ datetime }: { datetime: string }) =>
      <span>{datetime}</span>
);

jest.mock(
  "@/components/admin/buttonForReport",
  () =>
    ({ reportId, malfratId, parkourId, commentaire }: any) =>
      <button data-testid="button-for-report">Button for Report</button>
);

describe("ReportCard", () => {
  const mockReport = {
    id: "1",
    status: ReportStatus.NonVu,
    createdAt: "2023-01-01",
    commentaireEnFaute: "Commentaire en faute",
    parkour: {
      id: "parkour-1",
      title: "Parkour Title",
    },
  };

  const mockMalfratId = "111";

  // ---

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ReportCard report={mockReport} malfratId={mockMalfratId} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(<ReportCard report={mockReport} malfratId={mockMalfratId} />);

    // Vérifier les présences
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("Commentaire en faute")).toBeInTheDocument();
    expect(screen.getByTestId("button-for-report")).toBeInTheDocument();
    expect(
      screen.getByText("Parkour du commentaire : Parkour Title")
    ).toBeInTheDocument();
  });

  it("does not render ButtonForRepport when report is SUPPRIME", () => {
    const deletedReport = { ...mockReport, status: ReportStatus.Supprime };
    render(<ReportCard report={deletedReport} malfratId={mockMalfratId} />);

    // Vérifier que le bouton n'est pas rendu
    expect(screen.queryByTestId("button-for-report")).not.toBeInTheDocument();
  });
});
