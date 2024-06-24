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

  async getNoteByUserIdAndParkourId(user_id: string, parkour_id: number) {
    const result: JoinUserParkourNoteEntity | null = await this.db.findOne({
      where: {
        user_id: user_id,
        parkour_id: parkour_id,
      },
    });

    if (!result) {
      throw new Error("Pas de join User-Parkour avec cet id de parkour");
    }

    return result;
  }

  async getNoteByUserIdAndParkourIdOrNull(user_id: string, parkour_id: number) {
    const result: JoinUserParkourNoteEntity | null = await this.db.findOne({
      where: {
        user_id: user_id,
        parkour_id: parkour_id,
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
  async getAllNoteByUserId(user_id: string) {
    const allJoinUserParkours: JoinUserParkourNoteEntity[] | null =
      await this.db.find({
        where: {
          user_id: user_id,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de note join User-Parkour");
    }

    return allJoinUserParkours;
  }

  // pour delete all
  async getAllNoteByParkourId(parkour_id: number) {
    const allJoinUserParkours: JoinUserParkourNoteEntity[] | null =
      await this.db.find({
        where: {
          parkour_id: parkour_id,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de note join User-Parkour");
    }

    return allJoinUserParkours;
  }

  // ---

  async createNote(
    userId: string,
    data: Partial<JoinUserParkourNoteCreateEntity>
  ) {
    const infos = {
      user_id: userId,
      parkour_id: data.parkour_id,
      note: data.note,
      commentaire: data.commentaire,
    };

    const newJoinUserParkour = this.db.create(infos);

    await this.db.save(newJoinUserParkour);

    return await this.getNoteByUserIdAndParkourId(
      userId,
      newJoinUserParkour.parkour_id
    );
  }

  async modifyNote(
    userId: string,
    infos: Partial<JoinUserParkourNoteCreateEntity>
  ) {
    const joinUserParkour = await this.getNoteByUserIdAndParkourId(
      userId,
      infos.parkour_id as number
    );

    const modifyJoinUserParkour = this.db.merge(joinUserParkour, infos);
    return await this.db.save(modifyJoinUserParkour);
  }

  async deleteNoteByUserIdAndParkourId(user_id: string, parkours_id: number) {
    const joinUserParkour = await this.getNoteByUserIdAndParkourId(
      user_id,
      parkours_id
    );

    await this.db.remove(joinUserParkour);

    await new ParkourService().deleteOneNoteByParkourId(
      joinUserParkour.note,
      parkours_id
    );
  }

  // supp user => modifier note parkour
  async deleteAllNoteByUserId(user_id: string) {
    const joinUserParkours = await this.getAllNoteByUserId(user_id);
    console.log(joinUserParkours);

    joinUserParkours.forEach(async (element) => {
      await new ParkourService().deleteOneNoteByParkourId(
        element.note,
        element.parkour_id
      );
    });
  }

  // supp parkour
  async deleteAllNoteByParkourId(parkour_id: number) {
    const joinUserParkours = await this.getAllNoteByParkourId(parkour_id);
    await this.db.remove(joinUserParkours);
  }
}

export default JoinUserParkourNoteService;
