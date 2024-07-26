// avec la database de tests
import assert from "assert";
import datasource_test from "./lib/datasource_test";
import datasource from "../src/lib/datasource";

import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import MessageEntity from "../src/entities/message.entity";
import ParkourEntity from "../src/entities/parkour.entity";
import ParkourResolver from "../src/resolvers/parkour.resolver";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import {
  GET_ALL_PARKOUR_FOR_MAP,
  GET_PARKOUR_BY_ID,
} from "./requests/queries/parkour.queries";
import {
  CREATE_PARKOUR,
  DELETE_PARKOUR,
  MODIFY_PARKOUR,
} from "./requests/mutations/parkour.mutations";
import { Difficulty } from "../src/enum/difficulty.enum";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type ResponseDataAllParkour = {
  getAllParkourForMap: ParkourEntity[];
};

type ResponseDataCreate = {
  createParkour: ParkourEntity;
};

type ResponseDataModify = {
  modifyParkour: ParkourEntity;
};

type ResponseDataOneParkour = {
  getParkourById: ParkourEntity;
};

type ResponseDataDelete = {
  deleteParkour: MessageEntity;
};

// ---------------------------------------------------------------------------------
// --- SERVER ---
// ---------------------------------------------------------------------------------
let server: ApolloServer;

const baseSchema = buildSchemaSync({
  resolvers: [ParkourResolver],
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
    .mockReturnValue(datasource_test.getRepository(ParkourEntity));

  if (!datasource_test.isInitialized) {
    await datasource_test.initialize();
  }
  await datasource_test.getRepository(ParkourEntity).clear();
});

afterAll(async () => {
  await datasource_test.destroy();
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Test sur les livres avec la base de données", () => {
  it("récupération de la liste des parkours en base (y'en a pas)", async () => {
    const response = await server.executeOperation<ResponseDataAllParkour>({
      query: GET_ALL_PARKOUR_FOR_MAP,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllParkourForMap).toHaveLength(
      0
    );
  });

  it("Création d'une parkour et stockage dans le store", async () => {
    const response = await server.executeOperation<ResponseDataCreate>({
      query: CREATE_PARKOUR,
      variables: {
        infos: {
          title: "titre test parkour bdd",
          description: "description de test parkour avec bdd",
          time: 30,
          length: 20,
          difficulty: Difficulty.EASY,
          city: "Nantes",
          start: "5.63, 8.13",
          epreuves: [],
          images: [],
        },
      },
    });

    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.createParkour.id).not.toBeNull();
    expect(response.body.singleResult.data?.createParkour.title).toEqual(
      "titre test parkour bdd"
    );
  });

  it("récupération de la liste des livres en base après l'ajout d'un livre", async () => {
    const response = await server.executeOperation<ResponseDataAllParkour>({
      query: GET_ALL_PARKOUR_FOR_MAP,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllParkourForMap).toHaveLength(
      1
    );
  });

  it("Modification d'une parkour et stockage dans le store", async () => {
    const response = await server.executeOperation<ResponseDataModify>({
      query: MODIFY_PARKOUR,
      variables: {
        modifyParkourId: 1,
        infos: {
          title: "titre test apres modif",
          description: null,
          time: null,
          length: null,
          difficulty: null,
          city: null,
          start: null,
          images: null,
          epreuves: null,
          deletedImageIds: null,
        },
      },
    });

    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.modifyParkour.id).not.toBeNull();
    expect(response.body.singleResult.data?.modifyParkour.title).toEqual(
      "titre test apres modif"
    );
  });

  it("récupération de la liste des épreuves", async () => {
    const response = await server.executeOperation<ResponseDataAllParkour>({
      query: GET_ALL_PARKOUR_FOR_MAP,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllParkourForMap).toHaveLength(
      1
    );
  });

  it("récupération de l'épreuve 1", async () => {
    const response = await server.executeOperation<ResponseDataOneParkour>({
      query: GET_PARKOUR_BY_ID,
      variables: {
        getParkourByIdId: 1,
      },
    });
    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.getParkourById.title).toEqual(
      "titre test apres modif"
    );
    expect(response.body.singleResult.data?.getParkourById.description).toEqual(
      "description de test parkour avec bdd"
    );
  });

  it("delete du parkour", async () => {
    const response = await server.executeOperation<ResponseDataDelete>({
      query: DELETE_PARKOUR,
      variables: {
        deleteParkourId: 1,
      },
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.deleteParkour.success).toBeTruthy();
    expect(response.body.singleResult.data?.deleteParkour.message).toEqual(
      `Vous venez de supprimer le parkour : titre test apres modif`
    );
  });

  it("récupération de la liste des épreuves", async () => {
    const response = await server.executeOperation<ResponseDataAllParkour>({
      query: GET_ALL_PARKOUR_FOR_MAP,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getAllParkourForMap).toHaveLength(
      0
    );
  });
});

// but => create - get - modify - get - getOne - delete - get
