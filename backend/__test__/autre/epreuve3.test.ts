// avec le store
import "reflect-metadata";
import assert from "assert";
import EpreuveEntity, {
  EpreuveCreateEntity,
} from "../../src/entities/epreuve.entity";
import ImageEpreuveEntity from "../../src/entities/imageEpreuve.entity";
import EpreuveResolver from "../../src/resolvers/epreuve.resolver";
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
import { GET_ALL_EPREUVE } from "../requests/queries/epreuve.queries";
import { CREATE_EPREUVE } from "../requests/mutations/epreuve.mutations";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type EpreuveWithoutParkours = Omit<EpreuveEntity, "parkours">;
type EpreuveGetAll = {
  id: number;
  title: string;
  images: ImageEpreuveEntity[];
};
type EpreuveWithoutParkoursAndId = Omit<EpreuveEntity, "parkours" | "id">;

// ---
// à mettre dans le store de base
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

// pour vérifier ce qu'il sort du store (get1)
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

// create
const createEpreuveData: EpreuveWithoutParkoursAndId = {
  title: "titre de test epreuve3",
  description: "description de test epreuve3",
  easyToDo: "description easy de test epreuve3",
  mediumToDo: "description medium de test epreuve3",
  hardToDo: "description hard de test epreuve3",
  videoLink: "lien video de test epreuve3",
  images: [],
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
    Mutation: {
      createEpreuve: (_: null, { infos }: { infos: EpreuveCreateEntity }) => {
        store.set("EpreuveEntity", "3", infos);
        return store.get("EpreuveEntity", "3");
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

  //remplissage du store de base
  store.set("Query", "ROOT", "getAllEpreuve", epreuvesData);
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------

describe("Test sur les épreuves v3", () => {
  it("Récupération des épreuves depuis le store", async () => {
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
  });

  it("Création d'une épreuve et stockage dans le store", async () => {
    const response = await server.executeOperation({
      query: CREATE_EPREUVE,
      variables: {
        infos: createEpreuveData,
      },
    });

    assert(response.body.kind === "single");

    expect(response.body.singleResult.data).toEqual({
      createEpreuve: {
        id: "3",
        title: "titre de test epreuve3",
      },
    });
  });
});
