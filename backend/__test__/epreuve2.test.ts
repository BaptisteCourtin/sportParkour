// avec mock
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "@apollo/server";

import EpreuveEntity from "../src/entities/epreuve.entity";
import ImageEpreuveEntity from "../src/entities/imageEpreuve.entity";
import EpreuveResolver from "../src/resolvers/epreuve.resolver";

import { addMocksToSchema } from "@graphql-tools/mock";
import assert from "assert";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import {
  GET_ALL_EPREUVE,
  GET_EPREUVE_BY_ID,
} from "../../frontend/src/requests/queries/epreuve.queries";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type EpreuveWithoutParkours = Omit<EpreuveEntity, "parkours">;
type EpreuveGetAll = {
  id: number;
  title: string;
  images: ImageEpreuveEntity[];
};

// ---

// ce que je donne et veux recevoir
const getEpreuveMock: EpreuveWithoutParkours = {
  id: 1,
  title: "titre de test epreuve",
  description: "description de test epreuve",
  easyToDo: "description easy de test epreuve",
  mediumToDo: "description medium de test epreuve",
  hardToDo: "description hard de test epreuve",
  videoLink: "lien video de test epreuve",
  images: [],
};

const getAllEpreuveMock: EpreuveGetAll[] = [
  {
    id: 1,
    title: "titre de test epreuve",
    images: [],
  },
  {
    id: 2,
    title: "titre de test epreuve2",
    images: [],
  },
];

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
      // même nom que dans le resolver
      getEpreuveById() {
        // le mock que on veut renvoyer - met des Hello World et des uuid par default
        // ce que je reçois
        return getEpreuveMock;
      },
      getAllEpreuve() {
        return getAllEpreuveMock;
      },
    },
  };

  server = new ApolloServer({
    schema: addMocksToSchema({ schema: baseSchema, mocks }),
  });
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Test sur le epreuve", () => {
  test("get une epreuve v2", async () => {
    const response = await server.executeOperation<EpreuveEntity>({
      query: GET_EPREUVE_BY_ID,
      variables: { getEpreuveByIdId: getEpreuveMock.id }, // Utilisation de la variable
    });

    // graphQL me renvoie un string mais je donne un int
    const expectedData = {
      ...getEpreuveMock,
      id: getEpreuveMock.id.toString(),
    };

    // assert pour vérifier le type du body (car expect ne le fait pas correctement)
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toEqual({
      getEpreuveById: expectedData,
    });
  });

  test("get all epreuve v2", async () => {
    const response = await server.executeOperation<EpreuveEntity>({
      query: GET_ALL_EPREUVE,
    });

    assert(response.body.kind === "single");

    const expectedData = getAllEpreuveMock.map((epreuve) => ({
      ...epreuve,
      id: epreuve.id.toString(),
    }));

    expect(response.body.singleResult.data).toEqual({
      getAllEpreuve: expectedData,
    });
  });
});
