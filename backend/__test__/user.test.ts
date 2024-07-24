import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { printSchema } from "graphql";
import {
  addMocksToSchema,
  createMockStore,
  IMockStore,
} from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import assert from "assert";

import { Role } from "../src/enum/role.enum";
import UserEntity from "../src/entities/user.entity";
import UserResolver from "../src/resolvers/user.resolver";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import {
  IS_ADMIN,
  IS_CLIENT,
  GET_USER_BY_TOKEN,
} from "../../frontend/src/requests/queries/user.queries";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
const userAllData: Omit<UserEntity, "hashPassword"> = {
  id: "0",
  password: "0000",
  name: "bernard",
  firstname: "kevin",
  email: "kevin75du75@gmail.com",
  city: "15 rue du belvedere",
  codePostal: "44100",
  phone: "06 06 06 06 06",
  role: Role.ADMIN,
  imageProfil: "",
  nbReportValide: 0,
  nbReportAjoute: 0,
  favorisParkours: [],
  notesParkours: [],
  reports: [],
};

// ---

const userGetData = {
  id: "0",
  name: "bernard",
  firstname: "kevin",
  email: "kevin75du75@gmail.com",
  city: "15 rue du belvedere",
  codePostal: "44100",
  phone: "06 06 06 06 06",
  imageProfil: "",
};

type ResponseGetUser = {
  user: UserEntity;
};

// ---------------------------------------------------------------------------------
// --- SERVER ---
// ---------------------------------------------------------------------------------
let server: ApolloServer;

const baseSchema = buildSchemaSync({
  resolvers: [UserResolver],
  authChecker: () => true,
});

const schemaString = printSchema(baseSchema);
const schema = makeExecutableSchema({ typeDefs: schemaString });

// ---------------------------------------------------------------------------------
// --- BEFORE_ALL ---
// ---------------------------------------------------------------------------------
beforeAll(async () => {
  const store = createMockStore({ schema });

  const resolvers = (store: IMockStore) => ({
    Query: {
      getUserByToken() {
        const user = store.get("Query", "ROOT", "getUserByToken");
        return user;
      },
      isAdmin() {
        return true;
      },
      isClient() {
        return true;
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

  // on met un user dans la db
  store.set("Query", "ROOT", "getUserByToken", userAllData);
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Test sur les users", () => {
  it("get un user", async () => {
    // fait la requête (va dans le resolvers du beforeAll)
    const response = await server.executeOperation<UserEntity>({
      query: GET_USER_BY_TOKEN,
    });

    // ce que l'on est sensé avoir
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toEqual({
      getUserByToken: userGetData,
    });
  });

  test("is admin", async () => {
    const response = await server.executeOperation<Boolean>({
      query: IS_ADMIN,
    });

    // Vérifiez que le résultat est true
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toEqual({ isAdmin: true });
  });

  test("is client", async () => {
    const response = await server.executeOperation<Boolean>({
      query: IS_CLIENT,
    });

    // Vérifiez que le résultat est true
    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toEqual({ isClient: true });
  });
});
