import { In, Repository } from "typeorm";
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
    console.log(user_id, parkour_id);
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

  async getFavByEmail(email: string) {
    const allFav: JoinUserParkourEntity[] | null = await this.db.find({
      where: {
        users: { email: email },
        favoris: true,
      },
      relations: ["parkours"], // Charge les relations 'parkours' => JoinUserParkourEntity ET 'parkours.parkours' => l'netity parkour pour le title
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

  // fait aussi pour la modif
  async create(userId: string, infos: JoinUserParkourCreateEntity) {
    const data = {
      user_id: userId,
      parkour_id: infos.parkour_id,
      note: infos.note,
      favoris: infos.favoris,
    };
    const newJoinUserParkour = this.db.create(data);
    await this.db.save(newJoinUserParkour);

    const resultWithTitle = await this.getByUserIdAndParkourId(
      userId,
      newJoinUserParkour.parkour_id
    );
    return resultWithTitle;
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
