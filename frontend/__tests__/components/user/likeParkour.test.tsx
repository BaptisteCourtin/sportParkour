import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LikeParkour from "@/components/user/likeParkour";
import {
  useCreateJoinUserParkourFavorisMutation,
  useDeleteJoinUserParkourFavorisMutation,
} from "@/types/graphql";
import toast from "react-hot-toast";

jest.mock("@/types/graphql");
jest.mock("react-hot-toast");

const mockedUseCreateJoinUserParkourFavorisMutation =
  useCreateJoinUserParkourFavorisMutation as jest.Mock;
const mockedUseDeleteJoinUserParkourFavorisMutation =
  useDeleteJoinUserParkourFavorisMutation as jest.Mock;

describe("LikeParkour component", () => {
  const setIsLiked = jest.fn();
  const parkourId = "123";
  const dataIsClient = true;

  beforeEach(() => {
    mockedUseCreateJoinUserParkourFavorisMutation.mockReturnValue([
      jest.fn(),
      {},
    ]);
    mockedUseDeleteJoinUserParkourFavorisMutation.mockReturnValue([
      jest.fn(),
      {},
    ]);
  });

  it("renders correctly when liked", () => {
    const { getByText } = render(
      <MockedProvider>
        <LikeParkour
          isLiked={true}
          setIsLiked={setIsLiked}
          parkourId={parkourId}
          dataIsClient={dataIsClient}
        />
      </MockedProvider>
    );

    expect(getByText("Supprimer des favoris")).toBeInTheDocument();
  });

  it("renders correctly when not liked", () => {
    const { getByText } = render(
      <MockedProvider>
        <LikeParkour
          isLiked={false}
          setIsLiked={setIsLiked}
          parkourId={parkourId}
          dataIsClient={dataIsClient}
        />
      </MockedProvider>
    );

    expect(getByText("Mettre en favoris")).toBeInTheDocument();
  });

  it("calls createFav on like", () => {
    const createFavMock = jest.fn();
    mockedUseCreateJoinUserParkourFavorisMutation.mockReturnValue([
      createFavMock,
      {},
    ]);

    const { getByText } = render(
      <MockedProvider>
        <LikeParkour
          isLiked={false}
          setIsLiked={setIsLiked}
          parkourId={parkourId}
          dataIsClient={dataIsClient}
        />
      </MockedProvider>
    );

    fireEvent.click(getByText("Mettre en favoris"));
    expect(createFavMock).toHaveBeenCalled();
  });

  it("calls deleteFav on unlike", () => {
    const deleteFavMock = jest.fn();
    mockedUseDeleteJoinUserParkourFavorisMutation.mockReturnValue([
      deleteFavMock,
      {},
    ]);

    const { getByText } = render(
      <MockedProvider>
        <LikeParkour
          isLiked={true}
          setIsLiked={setIsLiked}
          parkourId={parkourId}
          dataIsClient={dataIsClient}
        />
      </MockedProvider>
    );

    fireEvent.click(getByText("Supprimer des favoris"));
    expect(deleteFavMock).toHaveBeenCalled();
  });

  it("shows toast message on success", async () => {
    const createFavMock = jest.fn((options) => {
      options.onCompleted({
        createJoinUserParkourFavoris: { message: "Added to favorites" },
      });
    });
    mockedUseCreateJoinUserParkourFavorisMutation.mockReturnValue([
      createFavMock,
      {},
    ]);

    const { getByText } = render(
      <MockedProvider>
        <LikeParkour
          isLiked={false}
          setIsLiked={setIsLiked}
          parkourId={parkourId}
          dataIsClient={dataIsClient}
        />
      </MockedProvider>
    );

    fireEvent.click(getByText("Mettre en favoris"));
    expect(toast.success).toHaveBeenCalledWith("Added to favorites");
  });
});
