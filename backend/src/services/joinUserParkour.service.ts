import { In, Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
  JoinUserParkourUpdateEntity,
} from "../entities/joinUserParkour.entity";

class JoinUserParkourService {
  db: Repository<JoinUserParkourEntity>;

  constructor() {
    this.db = datasource.getRepository(JoinUserParkourEntity);
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

  // fait aussi comme la modif
  async create(data: JoinUserParkourCreateEntity) {
    const newJoinUserParkour = this.db.create(data);
    await this.db.save(newJoinUserParkour);
    return newJoinUserParkour;
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
