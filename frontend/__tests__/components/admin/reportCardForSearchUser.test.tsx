import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReportCardForSearchUser from "@/components/admin/reportCardForSearchUser";

describe("ReportCardForSearchUser", () => {
  const mockReportUser = {
    id: "123",
    firstname: "John",
    name: "Doe",
    imageProfill: null,
    nbReportValide: 3,
    nbReportAjoute: 5,
  };

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ReportCardForSearchUser reportUser={mockReportUser} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(<ReportCardForSearchUser reportUser={mockReportUser} />);

    // Vérifier la présence du nom complet de l'utilisateur
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Vérifier la présence des informations sur les reports
    expect(
      screen.getByText("L'utilisateur a 3 report valide contre lui")
    ).toBeInTheDocument();
    expect(
      screen.getByText("L'utilisateur a émis 5 reports")
    ).toBeInTheDocument();

    // Vérifier que l'image par défaut est affichée
    expect(screen.getByRole("img")).toHaveAttribute("src", "/userDefault.png");
  });

  it("renders user profile image when available", () => {
    const userWithImage = {
      ...mockReportUser,
      imageProfill: "/profile.png",
    };

    render(<ReportCardForSearchUser reportUser={userWithImage} />);

    // Vérifier que l'image de profil est affichée
    expect(screen.getByRole("img")).toHaveAttribute("src", "/profile.png");
  });
});
