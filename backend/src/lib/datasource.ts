import { DataSource } from "typeorm";
// import les entities

// -----------
// AVEC DOCKER
// -----------

// export default new DataSource({
//   type: "postgres",
//   host: "db",
//   port: 5432,
//   database: process.env.POSTGRES_DB,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   entities: [], // mettre les entities ici
//   synchronize: true, //à ne pas utiliser en production
//   logging: ["error", "query"], //à ne pas utiliser en production
// });

// -----------
// SANS DOCKER
// -----------

export default new DataSource({
  type: "sqlite",
  database: "sportParkour.sqlite",
  entities: [], // mettre les entities
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
