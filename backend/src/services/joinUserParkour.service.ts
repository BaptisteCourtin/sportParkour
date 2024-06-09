import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
} from "../entities/joinUserParkour.entity";

class JoinUserParkourService {
  db: Repository<JoinUserParkourEntity>;

  constructor() {
    this.db = datasource.getRepository(JoinUserParkourEntity);
  }

  async getByUserIdAndParkourId(user_id: string, parkour_id: number) {
    const result: JoinUserParkourEntity | null = await this.db.findOne({
      where: {
        user_id: user_id,
        parkour_id: parkour_id,
      },
      relations: ["parkours"],
    });

    if (!result) {
      throw new Error("Pas de join User-Parkour avec cet id de parkour");
    }

    return result;
  }

  async isUserIdAndParkourIdExist(user_id: string, parkour_id: number) {
    const result: JoinUserParkourEntity | null = await this.db.findOne({
      where: {
        user_id: user_id,
        parkour_id: parkour_id,
      },
    });

    if (result == null) {
      return false;
    }

    return true;
  }

  async getFavByEmail(email: string) {
    const allFav: JoinUserParkourEntity[] | null = await this.db.find({
      where: {
        users: { email: email },
        favoris: true,
      },
      relations: ["parkours.epreuves", "parkours.images"], // Charge les relations 'parkours' => JoinUserParkourEntity ET 'parkours.parkours' => l'netity parkour pour le title
    });

    if (!allFav) {
      throw new Error("Pas de join User-Parkour");
    }

    return allFav;
  }

  async getAllByUserId(user_id: string) {
    const allJoinUserParkours: JoinUserParkourEntity[] | null =
      await this.db.find({
        where: {
          user_id: user_id,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de join User-Parkour");
    }

    return allJoinUserParkours;
  }

  async getAllByParkourId(parkour_id: number) {
    const allJoinUserParkours: JoinUserParkourEntity[] | null =
      await this.db.find({
        where: {
          parkour_id: parkour_id,
        },
      });

    if (!allJoinUserParkours) {
      throw new Error("Pas de join User-Parkour");
    }

    return allJoinUserParkours;
  }

  // ---

  async create(userId: string, data: Partial<JoinUserParkourCreateEntity>) {
    const infos = {
      user_id: userId,
      parkour_id: data.parkour_id,
      favoris: data.favoris,
      note: data.note,
    };

    const newJoinUserParkour = this.db.create(infos);
    console.log(newJoinUserParkour);

    await this.db.save(newJoinUserParkour);

    const result = await this.getByUserIdAndParkourId(
      userId,
      newJoinUserParkour.parkour_id
    );

    return result;
  }

  // delete la note n'est pas prévu
  async modify(userId: string, infos: Partial<JoinUserParkourCreateEntity>) {
    const joinUserParkour = await this.getByUserIdAndParkourId(
      userId,
      infos.parkour_id as number
    );

    console.log("TEST", joinUserParkour.favoris, infos);
    console.log(infos.note);
    if (
      infos.favoris == false &&
      joinUserParkour.note == null &&
      infos.note == undefined
    ) {
      // delete
      return await this.deleteByUserIdAndParkourId(
        userId,
        infos.parkour_id as number
      );
    } else {
      // modify
      const modifyJoinUserParkour = this.db.merge(joinUserParkour, infos);
      return await this.db.save(modifyJoinUserParkour);
    }
  }

  async deleteByUserIdAndParkourId(user_id: string, parkours_id: number) {
    const joinUserParkours = await this.getByUserIdAndParkourId(
      user_id,
      parkours_id
    );
    return await this.db.remove(joinUserParkours);
  }

  async deleteAllByUserId(user_id: string) {
    const joinUserParkours = await this.getAllByUserId(user_id);
    await this.db.remove(joinUserParkours);
  }

  async deleteAllByParkourId(parkour_id: number) {
    const joinUserParkours = await this.getAllByParkourId(parkour_id);
    await this.db.remove(joinUserParkours);
  }
}

export default JoinUserParkourService;
