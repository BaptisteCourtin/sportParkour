import assert from "assert";
import datasource_test from "./lib/datasource_test";
import datasource from "../src/lib/datasource";

import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import ImageEpreuveEntity from "../src/entities/imageEpreuve.entity";
import EpreuveEntity from "../src/entities/epreuve.entity";
import EpreuveResolver from "../src/resolvers/epreuve.resolver";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import { GET_ALL_EPREUVE } from "./requests/queries/epreuve.queries";
import { CREATE_EPREUVE } from "./requests/mutations/epreuve.mutations";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type ResponseData = {
  getAllEpreuve: EpreuveEntity[];
};

type ResponseDataCreate = {
  createEpreuve: EpreuveEntity;
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

  jest
    .spyOn(datasource, "getRepository")
    .mockReturnValue(datasource_test.getRepository(EpreuveEntity));

  await datasource_test.initialize(); //initialisation de la datasource_test
  await datasource_test.getRepository(EpreuveEntity).clear(); //vidage de la table des epreuves avant tous les tests
});

// afterAll(async () => {
//   await datasource_test.dropDatabase(); //vidage de la datasource_test
// });

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Test sur les livres avec la base de données", () => {
  it("récupération de la liste des epreuves en base (y'en a pas)", async () => {
    const response = await server.executeOperation<ResponseData>({
      query: GET_ALL_EPREUVE,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllEpreuve).toHaveLength(0);
  });

  it("Création d'une epreuve et stockage dans le store", async () => {
    const response = await server.executeOperation<ResponseDataCreate>({
      query: CREATE_EPREUVE,
      variables: {
        infos: {
          title: "titre test epreuve bdd",
          description: "description de test epreuve avec bdd",
          easyToDo: "description easy de test epreuve avec bdd",
          mediumToDo: "description medium de test epreuve avec bdd",
          hardToDo: "description hard de test epreuve avec bdd",
          videoLink: "lien video de test epreuve avec bdd",
          images: [],
        },
      },
    });

    assert(response.body.kind === "single");

    const id = response.body.singleResult.data?.createEpreuve.id;
    expect(id).not.toBeNull();
    expect(response.body.singleResult.data?.createEpreuve.title).toEqual(
      "titre test epreuve bdd"
    );
  });

  it("récupération de la liste des livres en base après l'ajout d'un livre", async () => {
    const response = await server.executeOperation<ResponseData>({
      query: GET_ALL_EPREUVE,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllEpreuve).toHaveLength(1);
  });
});

// but => create - get - modify - get - delete - get
