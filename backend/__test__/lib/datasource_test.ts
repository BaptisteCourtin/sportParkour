import { DataSource } from "typeorm";
import EpreuveEntity from "../../src/entities/epreuve.entity";
import ImageEpreuveEntity from "../../src/entities/imageEpreuve.entity";
import ImageParkourEntity from "../../src/entities/imageParkour.entity";
import JoinUserParkourFavorisEntity from "../../src/entities/joinUserParkourFavoris.entity";
import JoinUserParkourNoteEntity from "../../src/entities/joinUserParkourNote.entity";
import ParkourEntity from "../../src/entities/parkour.entity";
import ReportEntity from "../../src/entities/reportEntity.entity";
import ResetPasswordEntity from "../../src/entities/resetPassword.entity";
import UserEntity from "../../src/entities/user.entity";

export default new DataSource({
  type: "sqlite",
  database: "sportParkourTest.sqlite",
  synchronize: true,
  entities: [
    EpreuveEntity,
    ParkourEntity,
    UserEntity,
    JoinUserParkourFavorisEntity,
    JoinUserParkourNoteEntity,
    ImageEpreuveEntity,
    ImageParkourEntity,
    ResetPasswordEntity,
    ReportEntity,
  ], // mettre les entities
  logging: ["query", "error"],
});
