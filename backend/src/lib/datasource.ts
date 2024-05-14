import { DataSource } from "typeorm";
// import les entities
import EpreuveEntity from "../entities/epreuve.entity";
import ParkourEntity from "../entities/parkour.entity";
import UserEntity from "../entities/user.entity";

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
//   entities: [EpreuveEntity, ParkourEntity, UserEntity], // mettre les entities ici
//   synchronize: true, //à ne pas utiliser en production
//   logging: ["error", "query"], //à ne pas utiliser en production
// });

// -----------
// SANS DOCKER
// -----------

export default new DataSource({
  type: "sqlite",
  database: "sportParkour.sqlite",
  entities: [EpreuveEntity, ParkourEntity, UserEntity], // mettre les entities
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
