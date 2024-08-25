import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { GetEpreuveByIdQuery } from "@/types/graphql";

import CardEpreuve from "@/components/epreuve/cardEpreuve";

// Mock next/link to handle the Link component
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

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("CardEpreuve", () => {
  const mockEpreuve: GetEpreuveByIdQuery["getEpreuveById"] = {
    id: "1",
    title: "Test Epreuve",
    images: [
      {
        id: "621",
        lien: "https://example.com/test-image.jpg",
        isCouverture: false,
      },
    ],
  };

  it("renders the epreuve title", () => {
    render(<CardEpreuve epreuve={mockEpreuve} />);
    expect(screen.getByText("Test Epreuve")).toBeInTheDocument();
  });

  it("renders the epreuve image if available", () => {
    render(<CardEpreuve epreuve={mockEpreuve} />);
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://example.com/test-image.jpg"
    );
  });

  it("renders a default image if epreuve image is not available", () => {
    const mockEpreuveWithoutImage = {
      ...mockEpreuve,
      images: [],
    };
    render(<CardEpreuve epreuve={mockEpreuveWithoutImage} />);
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
    );
  });

  it("renders the link with correct href", () => {
    render(<CardEpreuve epreuve={mockEpreuve} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/epreuve/1");
  });
});
