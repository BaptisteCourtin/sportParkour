import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourNoteEntity, {
  JoinUserParkourNoteCreateEntity,
} from "../entities/joinUserParkourNote.entity";

import ParkourService from "./parkour.service";

class JoinUserParkourNoteService {
  db: Repository<JoinUserParkourNoteEntity>;

  constructor() {
    this.db = datasource.getRepository(JoinUserParkourNoteEntity);
  }

  async getNoteByUserIdAndParkourId(userId: string, parkourId: number) {
    const result: JoinUserParkourNoteEntity | null = await this.db.findOne({
      where: {
        user_id: userId,
        parkour_id: parkourId,
      },
    });

    if (!result) {
      throw new Error("Pas de join User-Parkour avec cet id de parkour");
    }

    return result;
  }

  async getNoteByUserIdAndParkourIdOrNull(userId: string, parkourId: number) {
    const result: JoinUserParkourNoteEntity | null = await this.db.findOne({
      where: {
        user_id: userId,
        parkour_id: parkourId,
      },
    });

    return result;
  }

  async getAllNoteWithRelationsByUserId(userId: string) {
    const allNote: JoinUserParkourNoteEntity[] | null = await this.db
      .createQueryBuilder("joinUserParkourNote")
      .where("joinUserParkourNote.user_id = :userId", { userId })
      .leftJoinAndSelect("joinUserParkourNote.parkour", "parkour")
      .leftJoinAndSelect("parkour.epreuves", "epreuves")
      .leftJoinAndSelect(
        "parkour.images",
        "images",
        "images.isCouverture = true"
      )
      .getMany();

    if (!allNote || allNote.length === 0) {
      throw new Error("Pas de join User-Parkour");
    }

    return allNote;
  }

  // pour delete all
  async getAllNoteByUserId(userId: string) {
    const allJoinUserParkours: JoinUserParkourNoteEntity[] | null =
      await this.db.find({
        where: {
          user_id: userId,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de note join User-Parkour");
    }

    return allJoinUserParkours;
  }

  // pour delete all
  async getAllNoteByParkourId(parkourId: number) {
    const allJoinUserParkours: JoinUserParkourNoteEntity[] | null =
      await this.db.find({
        where: {
          parkour_id: parkourId,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de note join User-Parkour");
    }

    return allJoinUserParkours;
  }

  // ---

  // fait aussi la modif
  async createNote(userId: string, data: JoinUserParkourNoteCreateEntity) {
    const infos = {
      user_id: userId,
      parkour_id: data.parkour_id,
      note: data.note,
      commentaire: data.commentaire,
    };

    const newJoinUserParkour: JoinUserParkourNoteEntity = this.db.create(infos);

    await this.db.save(newJoinUserParkour);

    return await this.getNoteByUserIdAndParkourId(
      userId,
      newJoinUserParkour.parkour_id
    );
  }

  async deleteNoteByUserIdAndParkourId(userId: string, parkourId: number) {
    const joinUserParkour = await this.getNoteByUserIdAndParkourId(
      userId,
      parkourId
    );

    await this.db.remove(joinUserParkour);

    await new ParkourService().deleteOneNoteByParkourId(
      joinUserParkour.note,
      parkourId
    );
  }

  // supp user => modifier note parkour
  async deleteAllNoteByUserId(userId: string) {
    const joinUserParkours = await this.getAllNoteByUserId(userId);

    joinUserParkours.forEach(async (element) => {
      await new ParkourService().deleteOneNoteByParkourId(
        element.note,
        element.parkour_id
      );
    });
  }

  // supp parkour
  async deleteAllNoteByParkourId(parkourId: number) {
    const joinUserParkours = await this.getAllNoteByParkourId(parkourId);
    await this.db.remove(joinUserParkours);
  }
}

export default JoinUserParkourNoteService;
