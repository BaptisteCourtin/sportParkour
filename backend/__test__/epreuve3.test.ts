import "reflect-metadata";

import assert from "assert";
import EpreuveEntity from "../src/entities/epreuve.entity";
import ImageEpreuveEntity from "../src/entities/imageEpreuve.entity";
import EpreuveResolver from "../src/resolvers/epreuve.resolver";
import {
  IMockStore,
  addMocksToSchema,
  createMockStore,
} from "@graphql-tools/mock";
import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import { GET_ALL_EPREUVE } from "../../frontend/src/requests/queries/epreuve.queries";

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
// à mettre dans le store
const epreuvesData: EpreuveWithoutParkours[] = [
  {
    id: 1,
    title: "titre de test epreuve",
    description: "description de test epreuve",
    easyToDo: "description easy de test epreuve",
    mediumToDo: "description medium de test epreuve",
    hardToDo: "description hard de test epreuve",
    videoLink: "lien video de test epreuve",
    images: [],
  },
  {
    id: 2,
    title: "titre de test epreuve2",
    description: "description de test epreuve2",
    easyToDo: "description easy de test epreuve2",
    mediumToDo: "description medium de test epreuve2",
    hardToDo: "description hard de test epreuve2",
    videoLink: "lien video de test epreuve2",
    images: [],
  },
];

// pour vérifier ce qu'il sort du store
const getAllEpreuveData: EpreuveGetAll[] = [
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
const schemaString = printSchema(baseSchema);
const schema = makeExecutableSchema({ typeDefs: schemaString });

beforeAll(async () => {
  const store = createMockStore({ schema });
  const resolvers = (store: IMockStore) => ({
    Query: {
      getAllEpreuve() {
        return store.get("Query", "ROOT", "getAllEpreuve");
      },
    },
  });
  server = new ApolloServer({
    schema: addMocksToSchema({
      schema: baseSchema,
      store,
      resolvers,
    }),
  });

  //remplissage du store
  store.set("Query", "ROOT", "getAllEpreuve", epreuvesData);
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------

describe("Test sur les épreuves v3", () => {
  it("Récupération des epreuves depuis le store", async () => {
    const response = await server.executeOperation<{
      getAllEpreuve: EpreuveGetAll[];
    }>({
      query: GET_ALL_EPREUVE,
    });

    assert(response.body.kind === "single");

    const expectedData = getAllEpreuveData.map((epreuve) => ({
      ...epreuve,
      id: epreuve.id.toString(),
    }));

    expect(response.body.singleResult.data).toEqual({
      getAllEpreuve: expectedData,
    });
    console.log(response);

    // assert(response.body.singleResult.data);
    // const epreuves = response.body.singleResult.data.getAllEpreuve;

    // assert(Array.isArray(epreuves));
    // assert(epreuves.length === epreuvesData.length);
    // epreuves.forEach((epreuve, index) => {
    //   assert(epreuve.id === epreuvesData[index].id);
    //   assert(epreuve.title === epreuvesData[index].title);
    // });
  });
});

// but => create + get + modify + get + delete + get
