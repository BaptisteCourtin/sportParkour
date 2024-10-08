import "reflect-metadata";
import datasource from "./lib/datasource";
import express from "express";
import http from "http";
import cors from "cors";

import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// import les resolvers
import EpreuveResolver from "./resolvers/epreuve.resolver";
import ParkourResolver from "./resolvers/parkour.resolver";
import UserResolver from "./resolvers/user.resolver";
import AuthResolver from "./resolvers/auth.resolver";
import JoinUserParkourFavorisResolver from "./resolvers/joinUserParkourFavoris.resolver";
import JoinUserParkourNoteResolver from "./resolvers/joinUserParkourNote.resolver";
import ResetPasswordResolver from "./resolvers/resetPassword.resolver";
import ReportResolver from "./resolvers/report.resolver";
import ImagesResolver from "./resolvers/images.resolver";
import MailToAdminResolver from "./resolvers/mailToAdmin.resolver";

// authent
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // Charge les variables d'environnement du fichier .env s'il existe (il n'existe pas en CI)

import Cookies from "cookies";
import { jwtVerify } from "jose";
import { customAuthChecker } from "./lib/authChecker";
import UserEntity from "./entities/user.entity";
import UserService from "./services/user.service";

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

const app = express();
const httpServer = http.createServer(app);

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: UserEntity | null;
}

export interface Payload {
  email: string;
}

// on passe ici que au lancement du server
async function main() {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      EpreuveResolver,
      ParkourResolver,
      UserResolver,
      JoinUserParkourFavorisResolver,
      JoinUserParkourNoteResolver,
      ResetPasswordResolver,
      ReportResolver,
      ImagesResolver,
      MailToAdminResolver,
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
        const token = cookies.get("tokenParkour");

        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new UserService().getUserByEmail(verify.payload.email);
          } catch (err) {
            console.error(err);
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
