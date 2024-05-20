import "reflect-metadata";
import datasource from "./lib/datasource";

import { buildSchema } from "type-graphql";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

// import les resolvers
import EpreuveResolver from "./resolvers/epreuve.resolver";
import ParkourResolver from "./resolvers/parkour.resolver";
import UserResolver from "./resolvers/user.resolver";
import AuthResolver from "./resolvers/auth.resolver";
import JoinUserParkourResolver from "./resolvers/joinUserParkour.resolver";

// authent
import dotenv from "dotenv";
dotenv.config({
  path: "../.env", // je ne sais pas pk le path est pas le bon mais ça marche
});
import UserEntity from "./entities/user.entity";
import AuthService from "./services/auth.service";
import Cookies from "cookies";
import { jwtVerify } from "jose";
import { customAuthChecker } from "./lib/authChecker";

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

// async function main() {
//   const schema = await buildSchema({
//     resolvers: [EpreuveResolver, ParkourResolver, UserResolver], // mettre les resolvers
//     validate: false,
//   });
//   const server = new ApolloServer<{}>({
//     schema,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });
//   await server.start();
//   app.use(
//     "/",
//     cors<cors.CorsRequest>({
//       origin: ["http://localhost:3000", "https://studio.apollographql.com"],
//       credentials: true,
//     }),
//     express.json(),
//     expressMiddleware(server)
//   );

//   await datasource.initialize();

//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port: 4000 }, resolve)
//   );
//   console.log(`🚀 Server lancé sur http://localhost:4000/`);
// }

// main();

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: UserEntity | null;
}

export interface Payload {
  email: string;
}

async function main() {
  const schema = await buildSchema({
    resolvers: [
      EpreuveResolver,
      ParkourResolver,
      UserResolver,
      AuthResolver,
      JoinUserParkourResolver,
    ],
    validate: false,
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "http://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: UserEntity | null = null;

        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new AuthService().findUserByEmail(
              verify.payload.email
            );
          } catch (err) {
            console.log(err);
            //potentiellement gérer l'erreur, est ce que l'erreur est liée au fait que le token soit expiré? est ce qu'on le renouvelle? ou est ce autre chose? etc...
          }
        }
        return { req, res, user };
      },
    })
  );

  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  // console.log("ENV : ", process.env.JWT_EXPIRATION_TIME);
  // console.log("ENV : ", process.env.SECRET_KEY);
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
