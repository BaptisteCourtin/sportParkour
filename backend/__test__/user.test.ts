// avec la database de tests
import datasource from "../src/lib/datasource";
import datasource_test from "./lib/datasource_test";

import assert from "assert";
import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";

import MessageEntity from "../src/entities/message.entity";
import UserEntity from "../src/entities/user.entity";
import UserResolver from "../src/resolvers/user.resolver";
import AuthResolver from "../src/resolvers/auth.resolver";

// ---------------------------------------------------------------------------------
// --- REQUESTS ---
// ---------------------------------------------------------------------------------
import {
  GET_USER_BY_TOKEN,
  IS_ADMIN,
  IS_CLIENT,
} from "./requests/queries/user.queries";
import { DELETE_USER, MODIFY_USER } from "./requests/mutations/user.mutations";

import { AUTHENTIFICATION, LOGOUT } from "./requests/queries/auth.queries";
import { INSCRIPTION } from "./requests/mutations/auth.mutations";

// ---------------------------------------------------------------------------------
// --- MOCKS ---
// ---------------------------------------------------------------------------------
type ResponseDataCreate = {
  inscription: MessageEntity;
};

type ResponseDataOneUser = {
  getUserByToken: UserEntity;
};

type ResponseDataAuthent = {
  authentification: MessageEntity;
};

type ResponseDataModify = {
  modifyUser: MessageEntity;
};

type ResponseDataLogout = {
  logout: MessageEntity;
};

type ResponseDataDelete = {
  deleteUser: MessageEntity;
};

// ---------------------------------------------------------------------------------
// --- SERVER ---
// ---------------------------------------------------------------------------------
import { jwtVerify } from "jose";
jest.mock("cookies");

import { MyContext } from "../src/index";
import express from "express";
import Cookies from "cookies";

let server: ApolloServer<MyContext>;
const baseSchema = buildSchemaSync({
  resolvers: [UserResolver, AuthResolver],
  authChecker: ({ context }) => {
    return !!context.user; // Simule l'autorisation si un utilisateur est présent dans le contexte
  },
});

// utilisable
let token: string | null = null;
let user: UserEntity | null = null;

// ---------------------------------------------------------------------------------
// --- BEFORE_ALL ---
// ---------------------------------------------------------------------------------
beforeAll(async () => {
  server = new ApolloServer<MyContext>({
    schema: baseSchema,
  });

  jest
    .spyOn(datasource, "getRepository")
    .mockReturnValue(datasource_test.getRepository(UserEntity));

  if (!datasource_test.isInitialized) {
    await datasource_test.initialize();
  }
  await datasource_test.getRepository(UserEntity).clear();
});

afterAll(async () => {
  await datasource_test.destroy();
});

// ---------------------------------------------------------------------------------
// --- TESTS ---
// ---------------------------------------------------------------------------------
describe("Flux complet utilisateur", () => {
  // Créer une instance réelle de UserEntity
  const mockUser = new UserEntity();
  Object.assign(mockUser, {
    id: "1",
    password: "TestIng2142?Please",
    name: "nameTest",
    firstname: "firstnameTest",
    email: "test@test.com",
    city: null,
    codePostal: null,
    phone: null,
    imageProfil: null,
    role: "CLIENT",
    nbReportValide: 0,
    nbReportAjoute: 0,
  });

  // Crée une nouvelle instance en copiant mockUser et en changeant le name
  const mockUserAfterModif = Object.assign(
    Object.create(Object.getPrototypeOf(mockUser)),
    mockUser
  );
  mockUserAfterModif.name = "nameTestAfterModif";

  test("1. Création utilisateur", async () => {
    const response = await server.executeOperation<ResponseDataCreate>({
      query: INSCRIPTION,
      variables: {
        infos: {
          password: mockUser.password,
          name: mockUser.name,
          firstname: mockUser.firstname,
          email: mockUser.email,
          city: mockUser.city,
          codePostal: mockUser.codePostal,
          phone: mockUser.phone,
        },
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.inscription.success).toBeTruthy();
    expect(response.body.singleResult.data?.inscription.message).toEqual(
      "Bien joué! Vous avez maintenant un compte chez nous!"
    );
  });

  test("2. Authentification", async () => {
    const mockCookies = {
      set: jest.fn(),
      get: jest.fn(),
    };
    (Cookies as jest.MockedClass<typeof Cookies>).mockImplementation(
      () => mockCookies as any
    );
    // bien mettre le mock cookie avant l'appel

    const response = await server.executeOperation<ResponseDataAuthent>({
      query: AUTHENTIFICATION,
      variables: {
        infos: {
          email: mockUser.email,
          password: mockUser.password,
        },
      },
    });

    assert(response.body.kind === "single");

    console.log(
      "Authentication response",
      JSON.stringify(response.body, null, 2)
    );

    expect(
      response.body.singleResult.data?.authentification.success
    ).toBeTruthy();
    expect(response.body.singleResult.data?.authentification.message).toEqual(
      "Salut! Viens parkourir le monde !"
    );

    // Récupérer le token des cookies mockés
    token = mockCookies.set.mock.calls[0][1];
    expect(token).toBeTruthy();

    // récupération du user pour les contexte
    if (token) {
      try {
        const verify = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.SECRET_KEY)
        );
        if (verify.payload.email === mockUser.email) {
          user = mockUser; // mock du user du context
        } else {
          token = null;
          user = null;
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      user = null;
    }
  });

  test("3. Get user by token", async () => {
    const response = await server.executeOperation<ResponseDataOneUser>(
      {
        query: GET_USER_BY_TOKEN,
      },
      {
        contextValue: {
          req: {} as express.Request,
          res: {} as express.Response,
          user,
        },
      }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getUserByToken.id).toBe("1");
    expect(response.body.singleResult.data?.getUserByToken.email).toBe(
      "test@test.com"
    );
    expect(response.body.singleResult.data?.getUserByToken.name).toBe(
      "nameTest"
    );
    expect(response.body.singleResult.data?.getUserByToken.firstname).toBe(
      "firstnameTest"
    );
  });

  test("4. Modify user by token", async () => {
    const response = await server.executeOperation<ResponseDataModify>(
      {
        query: MODIFY_USER,
        variables: {
          infos: {
            name: "nameTestModif",
            firstname: null,
            email: null,
            city: null,
            codePostal: null,
            phone: null,
          },
        },
      },
      {
        contextValue: {
          req: {} as express.Request,
          res: {} as express.Response,
          user,
        },
      }
    );

    assert(response.body.kind === "single");

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.modifyUser.success).toBeTruthy();
    expect(response.body.singleResult.data?.modifyUser.message).toEqual(
      "Bien joué, vous venez de vous modifier"
    );

    // récupération du user pour les contexte
    if (token) {
      try {
        const verify = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.SECRET_KEY)
        );
        if (verify.payload.email === mockUserAfterModif.email) {
          user = mockUserAfterModif; // mock du user du context
        } else {
          token = null;
          user = null;
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      user = null;
    }
  });

  test("5. Get user by token after modif", async () => {
    const response = await server.executeOperation<ResponseDataOneUser>(
      {
        query: GET_USER_BY_TOKEN,
      },
      {
        contextValue: {
          req: {} as express.Request,
          res: {} as express.Response,
          user,
        },
      }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.getUserByToken.id).toBe("1");
    expect(response.body.singleResult.data?.getUserByToken.email).toBe(
      "test@test.com"
    );
    expect(response.body.singleResult.data?.getUserByToken.name).toBe(
      "nameTestAfterModif"
    );
    expect(response.body.singleResult.data?.getUserByToken.firstname).toBe(
      "firstnameTest"
    );
  });

  test("6. Logout by token", async () => {
    const mockCookies = {
      set: jest.fn(),
      get: jest.fn(),
    };
    (Cookies as jest.MockedClass<typeof Cookies>).mockImplementation(
      () => mockCookies as any
    );

    const response = await server.executeOperation<ResponseDataLogout>(
      {
        query: LOGOUT,
      },
      {
        contextValue: {
          req: {} as express.Request,
          res: {} as express.Response,
          user,
        },
      }
    );

    // Récupérer le token des cookies mockés
    token = mockCookies.set.mock.calls[0][1];
    expect(token).toBeFalsy();

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data?.logout.success).toBeTruthy();
    expect(response.body.singleResult.data?.logout.message).toEqual(
      "Vous avez été déconnecté. Vous reviendrez? please 🥹"
    );

    // récupération du user pour les contexte
    if (token) {
      try {
        const verify = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.SECRET_KEY)
        );
        if (verify.payload.email === mockUserAfterModif.email) {
          user = mockUserAfterModif; // mock du user du context
        } else {
          token = null;
          user = null;
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      user = null;
    }
  });

  test("7. Get user by token after logout", async () => {
    const response = await server.executeOperation<ResponseDataOneUser>(
      {
        query: GET_USER_BY_TOKEN,
      },
      {
        contextValue: {
          req: {} as express.Request,
          res: {} as express.Response,
          user,
        },
      }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.data).toBe(null);
  });
});

// but => create - authent - get - modify - get - logout - get - authent/delete - get
