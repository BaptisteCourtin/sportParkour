import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AllEpreuves from "@/pages/epreuve/allEpreuves";
import {
  useGetAllEpreuveQuery,
  useIsAdminQuery,
  useGetTop20EpreuveByTitleLazyQuery,
} from "@/types/graphql";

// Mock the next/router
jest.mock("next/router", () => require("next-router-mock"));

// Mock the GraphQL queries
jest.mock("@/types/graphql", () => ({
  useGetAllEpreuveQuery: jest.fn(),
  useIsAdminQuery: jest.fn(),
  useGetTop20EpreuveByTitleLazyQuery: jest.fn(),
}));

describe("allEpreuves component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Setup default mock implementations
    (useGetAllEpreuveQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getAllEpreuve: [
          { id: "1", title: "Test Epreuve 1" },
          { id: "2", title: "Test Epreuve 2" },
        ],
      },
    });

    (useIsAdminQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: { isAdmin: false },
    });

    // Mock the useGetTop20EpreuveByTitleLazyQuery
    (useGetTop20EpreuveByTitleLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(), // This is the query function
      { loading: false, error: null, data: null }, // This is the result object
    ]);
  });

  it("renders correctly when loading", () => {
    (useGetAllEpreuveQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });

    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AllEpreuves />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when there is an error", () => {
    (useGetAllEpreuveQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error("Test error"),
      data: null,
    });

    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AllEpreuves />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with data for non-admin user", () => {
    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AllEpreuves />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with data for admin user", () => {
    (useIsAdminQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: { isAdmin: true },
    });

    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AllEpreuves />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
