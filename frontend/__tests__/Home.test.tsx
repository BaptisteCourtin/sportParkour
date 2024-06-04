import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import Home from "@/pages";
import { GET_ALL_PARKOUR } from "@/requests/queries/parkour.queries";
import { ParkourEntity } from "@/types/graphql";

afterEach(() => {
  jest.resetAllMocks();
});

const mocksGetAllParkours = [
  {
    request: {
      query: GET_ALL_PARKOUR,
    },
    result: {
      data: {
        getAllParkour: [
          {
            id: "1",
            title: "Mon titre 1",
            description: "Mon titre 1",
            time: 25,
            length: 3,
            difficulty: "EASY",
            city: "AAA",
            start: "-98,56",
            note: 4.78,
            nbVote: 457,
            images: [
              {
                id: "1",
                title: "titleImage",
              },
            ],
            parkours: [{ id: "1", title: "titleParkour" }],
          },
        ],
      },
    },
  },
];

describe("Page d'accueil", () => {
  it("rendu du titre dans la topbar", () => {
    render(
      <MemoryRouterProvider url="/">
        <MockedProvider mocks={mocksGetAllParkours} addTypename={false}>
          <Home />
        </MockedProvider>
      </MemoryRouterProvider>
    );
    const titre = screen.getByText("Bonjour");
    expect(titre).toBeInTheDocument();
  });
});
