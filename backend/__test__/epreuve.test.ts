// avec la database de tests
import assert from "assert";
import datasource_test from "./lib/datasource_test";
import datasource from "../src/lib/datasource";

import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import MessageEntity from "../src/entities/message.entity";
import EpreuveEntity from "../src/entities/epreuve.entity";
import EpreuveResolver from "../src/resolvers/epreuve.resolver";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import {
  GET_ALL_EPREUVE,
  GET_EPREUVE_BY_ID,
} from "./requests/queries/epreuve.queries";
import {
  CREATE_EPREUVE,
  DELETE_EPREUVE,
  MODIFY_EPREUVE,
} from "./requests/mutations/epreuve.mutations";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type ResponseData = {
  getAllEpreuve: EpreuveEntity[];
};

type ResponseDataCreate = {
  createEpreuve: EpreuveEntity;
};

type ResponseDataModify = {
  modifyEpreuve: EpreuveEntity;
};

type ResponseDataOneEpreuve = {
  getEpreuveById: EpreuveEntity;
};

type ResponseDataDelete = {
  deleteEpreuve: MessageEntity;
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

  if (!datasource_test.isInitialized) {
    await datasource_test.initialize();
  }
  await datasource_test.getRepository(EpreuveEntity).clear();
});

afterAll(async () => {
  await datasource_test.destroy();
});

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

    expect(response.body.singleResult.data?.createEpreuve.id).not.toBeNull();
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

  it("Modification d'une epreuve et stockage dans le store", async () => {
    const response = await server.executeOperation<ResponseDataModify>({
      query: MODIFY_EPREUVE,
      variables: {
        modifyEpreuveId: 1,
        infos: {
          title: "titre test apres modif",
          description: null,
          easyToDo: null,
          mediumToDo: null,
          hardToDo: null,
          videoLink: null,
          images: [],
        },
      },
    });

    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.modifyEpreuve.id).not.toBeNull();
    expect(response.body.singleResult.data?.modifyEpreuve.title).toEqual(
      "titre test apres modif"
    );
  });

  it("récupération de la liste des épreuves", async () => {
    const response = await server.executeOperation<ResponseData>({
      query: GET_ALL_EPREUVE,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllEpreuve).toHaveLength(1);
  });

  it("récupération de l'épreuve 1", async () => {
    const response = await server.executeOperation<ResponseDataOneEpreuve>({
      query: GET_EPREUVE_BY_ID,
      variables: {
        getEpreuveByIdId: 1,
      },
    });
    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.getEpreuveById.title).toEqual(
      "titre test apres modif"
    );
    expect(response.body.singleResult.data?.getEpreuveById.description).toEqual(
      "description de test epreuve avec bdd"
    );
    expect(response.body.singleResult.data?.getEpreuveById.easyToDo).toEqual(
      "description easy de test epreuve avec bdd"
    );
  });

  it("delete de l'épreuve", async () => {
    const response = await server.executeOperation<ResponseDataDelete>({
      query: DELETE_EPREUVE,
      variables: {
        deleteEpreuveId: 1,
      },
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.deleteEpreuve.success).toBeTruthy();
    expect(response.body.singleResult.data?.deleteEpreuve.message).toEqual(
      `Vous venez de supprimer l' épreuve : titre test apres modif`
    );
  });

  it("récupération de la liste des épreuves", async () => {
    const response = await server.executeOperation<ResponseData>({
      query: GET_ALL_EPREUVE,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllEpreuve).toHaveLength(0);
  });
});

// but => create - get - modify - get - getOne - delete - get
