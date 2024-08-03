import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardParkour from "@/components/parkour/cardParkour";
import { Difficulty } from "@/types/graphql";
import Rating from "@mui/material/Rating";
import {
  FaLocationDot,
  FaPersonRunning,
  FaStopwatch,
  FaArrowUpRightDots,
  FaCircleArrowRight,
} from "react-icons/fa6";
import { title } from "process";

// Mock Rating component
jest.mock("@mui/material/Rating", () => (props: any) => (
  <div data-testid="rating" {...props}></div>
));

// Mock data
const mockParkour = {
  id: "1",
  title: "Test Parkour",
  start: "Test Start",
  images: [
    {
      id: "621",
      lien: "https://example.com/test-image.jpg",
      isCouverture: true,
    },
  ],
  time: 60,
  length: 5,
  difficulty: Difficulty.Medium,
  city: "Test City",
  epreuves: [
    { id: "1", title: "testEpreuve1" },
    { id: "2", title: "testEpreuve2" },
  ],
  note: 4.2,
  nbVote: 10,
};

// Mock pour les icônes
jest.mock("react-icons/fa6", () => ({
  FaLocationDot: () => <span data-testid="FaLocationDot">LocationDotIcon</span>,
  FaStopwatch: () => <span data-testid="FaStopwatch">StopwatchIcon</span>,
  FaPersonRunning: () => (
    <span data-testid="FaPersonRunning">PersonRunningIcon</span>
  ),
  FaArrowUpRightDots: () => (
    <span data-testid="FaArrowUpRightDots">ArrowUpRightDotsIcon</span>
  ),
  FaCircleArrowRight: () => (
    <span data-testid="FaCircleArrowRight">CircleArrowRightIcon</span>
  ),
}));

describe("CardParkour", () => {
  it("renders the parkour title with location icon", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByText("Test Parkour")).toBeInTheDocument();
    expect(screen.getByTestId("FaLocationDot")).toBeInTheDocument();
  });

  it("renders the couverture image if available", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://example.com/test-image.jpg"
    );
  });

  it("renders a default image if no images are available", () => {
    const mockParkourWithoutImages = { ...mockParkour, images: [] };
    render(<CardParkour parkour={mockParkourWithoutImages} color="red" />);
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
    );
  });

  it("renders the parkour time, length, and difficulty with respective icons", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByText("60 min")).toBeInTheDocument();
    expect(screen.getByTestId("FaStopwatch")).toBeInTheDocument();
    expect(screen.getByText("5 km")).toBeInTheDocument();
    expect(screen.getByTestId("FaPersonRunning")).toBeInTheDocument();
    expect(screen.getByText("moyen")).toBeInTheDocument();
    expect(screen.getByTestId("FaArrowUpRightDots")).toBeInTheDocument();
  });

  it("renders the parkour city", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByText("Test City")).toBeInTheDocument();
  });

  it("renders the number of epreuves", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByText("2 épreuves")).toBeInTheDocument();
  });

  it("renders the rating if available", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByTestId("rating")).toBeInTheDocument();
    expect(screen.getByText("4.2 sur 10 votes")).toBeInTheDocument();
  });

  it("renders 'Nouveau' if no rating is available", () => {
    const mockParkourWithoutRating = { ...mockParkour, note: null };
    render(<CardParkour parkour={mockParkourWithoutRating} color="red" />);
    expect(screen.getByText("Nouveau")).toBeInTheDocument();
  });

  it("renders the arrow icon at the bottom", () => {
    render(<CardParkour parkour={mockParkour} color="red" />);
    expect(screen.getByTestId("FaCircleArrowRight")).toBeInTheDocument();
  });
});
