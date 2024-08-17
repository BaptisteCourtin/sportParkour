import React from "react";
import { render, screen } from "@testing-library/react";
import ReportCardForSearch from "@/components/admin/reportCardForSearch";

// Mock the next/link component
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

// Mock the ButtonForReport component
jest.mock("@/components/admin/buttonForReport", () => {
  return function DummyButtonForReport() {
    return <button>Mocked Button</button>;
  };
});

// Mock the DateFormatter component
jest.mock("@/components/DateFormatter", () => {
  return function DummyDateFormatter({ datetime }: { datetime: string }) {
    return <span>{datetime}</span>;
  };
});

describe("ReportCardForSearch", () => {
  const mockReport = {
    id: "1",
    status: "NON_VU",
    malfrat: {
      id: "123",
      firstname: "John",
      name: "Doe",
      imageProfil: "/profile.jpg",
      nbReportValide: 5,
    },
    parkour: {
      id: "456",
      title: "Test Parkour",
    },
    commentaireEnFaute: "This is a test comment",
    createdAt: "2023-07-28T12:00:00Z",
  };

  it("renders the report card with correct information", () => {
    render(<ReportCardForSearch report={mockReport} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("Nombre de reports valides : 5")
    ).toBeInTheDocument();
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(
      screen.getByText("Parkour du commentaire : Test Parkour")
    ).toBeInTheDocument();
  });

  it("displays the user profile image when available", () => {
    const { container } = render(<ReportCardForSearch report={mockReport} />);

    const profileImage = container.querySelector('img[src="/profile.jpg"]');
    expect(profileImage).toBeInTheDocument();

    if (profileImage) {
      expect(profileImage.getAttribute("src")).toBe("/profile.jpg");
    }
  });

  it("displays default user image when profile image is not available", () => {
    const reportWithoutImage = {
      ...mockReport,
      malfrat: { ...mockReport.malfrat, imageProfil: undefined },
    };
    const { container } = render(
      <ReportCardForSearch report={reportWithoutImage} />
    );

    const defaultImage = container.querySelector('img[src="/userDefault.png"]');
    expect(defaultImage).toBeInTheDocument();

    if (defaultImage) {
      expect(defaultImage.getAttribute("src")).toBe("/userDefault.png");
    }
  });

  it("renders ButtonForReport when status is not SUPPRIME", () => {
    render(<ReportCardForSearch report={mockReport} />);

    expect(screen.getByText("Mocked Button")).toBeInTheDocument();
  });

  it("does not render ButtonForReport when status is SUPPRIME", () => {
    const suppressedReport = { ...mockReport, status: "SUPPRIME" };
    render(<ReportCardForSearch report={suppressedReport} />);

    expect(screen.queryByText("Mocked Button")).not.toBeInTheDocument();
  });

  it("renders correct links", () => {
    render(<ReportCardForSearch report={mockReport} />);

    const userLink = screen.getByText("John Doe").closest("a");
    expect(userLink).toHaveAttribute("href", "/admin/reports/user/123");

    const parkourLink = screen
      .getByText("Parkour du commentaire : Test Parkour")
      .closest("a");
    expect(parkourLink).toHaveAttribute("href", "/parkour/456");
  });
});
