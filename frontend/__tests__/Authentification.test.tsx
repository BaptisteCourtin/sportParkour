import Login from "@/pages/auth/login";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { AUTHENTIFICATION } from "@/requests/queries/auth.queries";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("next/router", () => ({
  ...jest.requireActual("next-router-mock"),
  push: jest.fn(),
}));

const mocksAuthentification = [
  {
    request: {
      query: AUTHENTIFICATION,
      variables: {
        infos: { email: "kevin75du75@gmail.com", password: "0000" },
      },
    },
    result: {
      data: {
        authentification: {
          message: "Salut! Viens parkourir le monde !",
          success: true,
        },
      },
    },
  },
];

it("Snapshot du login", async () => {
  const { container, getByText, getByPlaceholderText } = render(
    <MemoryRouterProvider url="/">
      <MockedProvider mocks={mocksAuthentification} addTypename={false}>
        <Login />
      </MockedProvider>
    </MemoryRouterProvider>
  );

  // Remplissage du formulaire avec des données de test
  fireEvent.change(getByPlaceholderText("Indiquez votre email"), {
    target: { value: "kevin75du75@gmail.com" },
  });
  fireEvent.change(getByPlaceholderText("Indiquez votre mot de passe"), {
    target: { value: "0000" },
  });

  // Soumission du formulaire
  fireEvent.submit(getByText("Se connecter"));

  // On attend un certain temps pour permettre à onCompleted de s'exécuter
  await waitFor(() => {}, { timeout: 1000 });

  // On vérifie le snapshot après que onCompleted a eu le temps de s'exécuter
  await waitFor(
    () => {
      expect(container).toMatchSnapshot();
    },
    { timeout: 10000 }
  );
});
