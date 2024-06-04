import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import AllEpreuves from "@/pages/epreuve/allEpreuves";
import { GET_LIST_EPREUVE } from "@/requests/queries/epreuve.queries";
import { EpreuveEntity } from "@/types/graphql";

jest.mock("next/router", () => ({
  ...jest.requireActual("next-router-mock"),
  push: jest.fn(),
}));

const mocksGetAllEpreuves: MockedResponse<{
  getListEpreuve: EpreuveEntity[];
}>[] = [
  {
    request: {
      query: GET_LIST_EPREUVE,
    },
    result: {
      data: {
        getListEpreuve: [
          { id: "1", title: "Mon titre 1" },
          { id: "2", title: "Mon titre 2" },
          { id: "3", title: "Mon titre 3" },
        ],
      },
    },
  },
];

describe("Liste des livres", () => {
  it("récupération de liste et affichage des éléments", async () => {
    render(
      <MemoryRouterProvider url="/">
        <MockedProvider mocks={mocksGetAllEpreuves} addTypename={false}>
          <AllEpreuves />
        </MockedProvider>
      </MemoryRouterProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Mon titre 1")).toBeInTheDocument();
    });
  });
});
