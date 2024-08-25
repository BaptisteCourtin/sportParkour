import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { AUTHENTIFICATION } from "@/requests/queries/auth.queries";

import Login from "@/pages/auth/login";

// Mock du module next/router pour contrôler la navigation
jest.mock("next/router", () => require("next-router-mock"));

// Mock de react-hot-toast pour éviter les erreurs de non-implémentation dans le test
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock des requêtes Apollo
const mocks = [
  {
    request: {
      query: AUTHENTIFICATION,
      variables: {
        infos: { email: "test@test.com", password: "mot2passe" },
      },
    },
    result: {
      data: {
        authentification: {
          success: true,
          message: "Bienvenue!",
        },
      },
    },
  },
];

// --------------------------------------------------------------------------------------------------

describe("Login", () => {
  it("Snapshot du composant login", async () => {
    const { container, getByText } = render(
      <MemoryRouterProvider url="/auth/login">
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouterProvider>
    );

    // Sélectionner les éléments
    const emailInput = container.querySelector('input[name="email"]');
    const passwordInput = container.querySelector('input[name="password"]');

    // Vérifier que les éléments existent avant de les utiliser
    if (emailInput && passwordInput) {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "mot2passe" } });

      // Soumettre le formulaire
      fireEvent.submit(getByText("SUIVANT"));

      // On attend un certain temps pour permettre à onCompleted de s'exécuter
      await waitFor(() => {}, { timeout: 1000 });

      // On vérifie le snapshot après que onCompleted a eu le temps de s'exécuter
      await waitFor(
        () => {
          expect(container).toMatchSnapshot();
        },
        { timeout: 10000 }
      );
    } else {
      throw new Error("Les éléments du formulaire sont introuvables.");
    }
  });
});
