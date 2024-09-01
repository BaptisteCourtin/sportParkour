import { DataSource } from "typeorm";
// import les entities
import EpreuveEntity from "../entities/epreuve.entity";
import ParkourEntity from "../entities/parkour.entity";
import UserEntity from "../entities/user.entity";
import JoinUserParkourFavorisEntity from "../entities/joinUserParkourFavoris.entity";
import JoinUserParkourNoteEntity from "../entities/joinUserParkourNote.entity";
import ImageEpreuveEntity from "../entities/imageEpreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";
import ResetPasswordEntity from "../entities/resetPassword.entity";
import ReportEntity from "../entities/reportEntity.entity";
import MailToAdminEntity from "../entities/mailToAdmin.entity";

// -----------
// AVEC DOCKER
// -----------

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    EpreuveEntity,
    UserEntity,
    ParkourEntity,
    JoinUserParkourFavorisEntity,
    JoinUserParkourNoteEntity,
    ImageEpreuveEntity,
    ImageParkourEntity,
    ResetPasswordEntity,
    ReportEntity,
    MailToAdminEntity,
  ], // mettre les entities ici

  synchronize: true, // true pour créer les tables directemment dans la db
  logging: ["error"],
});

// -----------
// SANS DOCKER
// -----------

// export default new DataSource({
//   type: "sqlite",
//   database: "sportParkour.sqlite",
//   entities: [
//     EpreuveEntity,
//     ParkourEntity,
//     UserEntity,
//     JoinUserParkourFavorisEntity,
//     JoinUserParkourNoteEntity,
//     ImageEpreuveEntity,
//     ImageParkourEntity,
//     ResetPasswordEntity,
//     ReportEntity,
//     MailToAdminEntity,
//   ], // mettre les entities
//   synchronize: true, // à ne pas utiliser en production - cré les tables et ???
//   // logging: ["error", "query"], // à ne pas utiliser en production - écrit les queries dans la console
//   // synchronize: false,
//   logging: false,
// });
