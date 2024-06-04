// books.test.ts
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
import UserEntity, { UserUpdateEntity } from "../src/entities/user.entity";
import UserResolver from "../src/resolvers/user.resolver";
import { MessageEntity } from "../src/entities/message.entity";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
export const GET_USER_BY_TOKEN = `#graphql
  query GetUserByToken {
    getUserByToken {
      id
      name
      firstname
      email
      city
      codePostal
      phone
      parkours {
        user_id
        parkour_id
        favoris
        note
        parkours {
          id
          title
        }
      }
    }
  }
`;

export const IS_ADMIN = `#graphql
  query IsAdmin {
    isAdmin
  }
`;

export const IS_CLIENT = `#graphql
  query IsClient {
    isClient
  }
`;

export const MODIFY_USER = `#graphql
  mutation ModifyUser($infos: UserUpdateEntity!) {
    modifyUser(infos: $infos) {
      id
      name
      firstname
      email
      city
      codePostal
      phone
    }
  }
`;

export const DELETE_USER = `#graphql
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      message
      success
    }
  }
`;

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
  parkours: [],
};

const userModifyData: UserUpdateEntity = {
  name: "bernard",
  firstname: "josette",
  email: "josette75du75@gmail.com",
  city: "15 rue du belvedere",
  codePostal: "44100",
  phone: "07 06 06 06 06",
};

// ---

const userGetData: Omit<UserEntity, "hashPassword" | "password" | "role"> = {
  id: "0",
  name: "bernard",
  firstname: "kevin",
  email: "kevin75du75@gmail.com",
  city: "15 rue du belvedere",
  codePostal: "44100",
  phone: "06 06 06 06 06",
  parkours: [],
};

const userGetModifyData: Omit<
  UserEntity,
  "hashPassword" | "password" | "role"
> = {
  id: "0",
  name: "bernard",
  firstname: "josette",
  email: "josette75du75@gmail.com",
  city: "15 rue du belvedere",
  codePostal: "44100",
  phone: "07 06 06 06 06",
  parkours: [],
};

const userDeleteMessage: MessageEntity = {
  message: "Vous venez de vous désintégrer 🎆",
  success: true,
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
    Mutation: {
      // modifyUser() {
      //   const modifyUser = { ...userAllData, ...userGetData };
      //   console.log(modifyUser);
      //   return modifyUser;
      // },
      deleteUser() {
        return userDeleteMessage;
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

  // ---

  // it("modifies user information", async () => {
  //   const response = await server.executeOperation<UserEntity>({
  //     query: MODIFY_USER,
  //     variables: userModifyData,
  //   });

  //   assert(response.body.kind === "single");
  //   expect(response.body.singleResult.data).toEqual({
  //     modifyUser: userGetModifyData,
  //   });
  // });

  it("delete un user", async () => {
    const response = await server.executeOperation<MessageEntity>({
      query: DELETE_USER,
      variables: {
        deleteUserId: userAllData.id,
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toEqual({
      deleteUser: userDeleteMessage,
    });
  });
});
