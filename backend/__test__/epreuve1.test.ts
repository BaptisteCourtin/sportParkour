// va chercher dans la bdd
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "@apollo/server";

import EpreuveEntity from "../src/entities/epreuve.entity";
import EpreuveResolver from "../src/resolvers/epreuve.resolver";

import datasource from "../src/lib/datasource";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import { GET_EPREUVE_BY_ID } from "../../frontend/src/requests/queries/epreuve.queries";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------

const epreuveAllData: EpreuveEntity = {
  id: 0,
  title: "titre de test epreuve",
  description: "description de test epreuve",
  easyToDo: "description easy de test epreuve",
  mediumToDo: "description medium de test epreuve",
  hardToDo: "description hard de test epreuve",
  videoLink: "lien video de test epreuve",
  images: [],
  parkours: [],
};

// ---

type ResponseGetEpreuve = {
  epreuve: EpreuveEntity;
};

// ---------------------------------------------------------------------------------
// --- SERVER ---
// ---------------------------------------------------------------------------------
let server: ApolloServer;

const baseSchema = buildSchemaSync({
  resolvers: [EpreuveResolver],
  authChecker: () => true,
});

// ---------------------------------------------------------------------------------
// --- BEFORE_ALL ---
// ---------------------------------------------------------------------------------

beforeAll(async () => {
  server = new ApolloServer({
    schema: baseSchema,
  });

  const mocks = {
    Query: {
      getEpreuveByToken() {
        return epreuveAllData;
      },
    },
  };

  server = new ApolloServer({
    schema: baseSchema,
  });

  await datasource.initialize(); //initialisation de la datasource
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Test sur le epreuve", () => {
  const epreuveId = 1; // Définition de la variable ID

  test("get epreuve v2", async () => {
    const response = await server.executeOperation<ResponseGetEpreuve>({
      query: GET_EPREUVE_BY_ID,
      variables: { getEpreuveByIdId: epreuveId }, // Utilisation de la variable
    });
  });
});
