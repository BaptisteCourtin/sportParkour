import "reflect-metadata";
import datasource from "./lib/datasource";

// import les resolvers
import EpreuveResolver from "./resolvers/epreuve.resolver";
import ParkourResolver from "./resolvers/parkour.resolver";
import UserResolver from "./resolvers/user.resolver";

import { buildSchema } from "type-graphql";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [EpreuveResolver, ParkourResolver, UserResolver], // mettre les resolvers
    validate: false,
  });
  const server = new ApolloServer<{}>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  await datasource.initialize(); // .env ?

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
