import { useRouter } from "next/router";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { LogoutDocument } from "@/types/graphql";

import toast from "react-hot-toast";

import Logout from "@/pages/user/logout";

// Mock des dépendances
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

describe("Logout Component", () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
    isReady: true,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("affiche le message de chargement", () => {
    const mocks = [
      {
        request: {
          query: LogoutDocument,
        },
        result: {
          data: {
            logout: {
              success: true,
              message: "Déconnexion réussie",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Logout />
      </MockedProvider>
    );

    expect(screen.getByText("Veuillez patienter...")).toBeInTheDocument();
  });

  it("affiche le message de déconnexion et redirige après la déconnexion", async () => {
    const mocks = [
      {
        request: {
          query: LogoutDocument,
        },
        result: {
          data: {
            logout: {
              success: true,
              message: "Déconnexion réussie",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Logout />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Vous êtes déconnectés!")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Déconnexion réussie");
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    });
  });

  it("gère les erreurs de déconnexion", async () => {
    const mocks = [
      {
        request: {
          query: LogoutDocument,
        },
        error: new Error("Erreur de déconnexion"),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Logout />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Vous êtes déconnectés!")).toBeInTheDocument();
    });
  });
});
