import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourFavorisEntity from "../entities/joinUserParkourFavoris.entity";

class JoinUserParkourFavorisService {
  db: Repository<JoinUserParkourFavorisEntity>;

  constructor() {
    this.db = datasource.getRepository(JoinUserParkourFavorisEntity);
  }

  async getFavByUserIdAndParkourId(user_id: string, parkour_id: number) {
    const result: JoinUserParkourFavorisEntity | null = await this.db.findOne({
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

  async getAllFavWithRelationsByUserId(userId: string) {
    const allFav: JoinUserParkourFavorisEntity[] | null = await this.db
      .createQueryBuilder("joinUserParkourFavoris")
      .where("joinUserParkourFavoris.user_id = :userId", { userId })
      .leftJoinAndSelect("joinUserParkourFavoris.parkour", "parkour")
      .leftJoinAndSelect("parkour.epreuves", "epreuves")
      .leftJoinAndSelect(
        "parkour.images",
        "images",
        "images.isCouverture = true"
      )
      .getMany();

    if (!allFav || allFav.length === 0) {
      throw new Error("Pas de join User-Parkour");
    }

    return allFav;
  }

  // pour delete all
  async getAllFavByUserId(user_id: string) {
    const allJoinUserParkoursFavoris: JoinUserParkourFavorisEntity[] | null =
      await this.db.find({
        where: {
          user_id: user_id,
        },
      });

    if (!allJoinUserParkoursFavoris) {
      throw new Error("Pas de join User-Parkour");
    }

    return allJoinUserParkoursFavoris;
  }

  // pour delete all
  async getAllFavByParkourId(parkour_id: number) {
    const allJoinUserParkoursFavoris: JoinUserParkourFavorisEntity[] | null =
      await this.db.find({
        where: {
          parkour_id: parkour_id,
        },
      });

    if (!allJoinUserParkoursFavoris) {
      throw new Error("Pas de join User-Parkour");
    }

    return allJoinUserParkoursFavoris;
  }

  // ---

  async createFavByUserIdAndParkourId(userId: string, parkourId: number) {
    const infos = {
      user_id: userId,
      parkour_id: parkourId,
    };

    const newJoinUserParkourFavoris = this.db.create(infos);
    await this.db.save(newJoinUserParkourFavoris);
  }

  async deleteFavByUserIdAndParkourId(user_id: string, parkours_id: number) {
    const joinUserParkoursFavoris = await this.getFavByUserIdAndParkourId(
      user_id,
      parkours_id
    );
    await this.db.remove(joinUserParkoursFavoris);
  }

  // supp user
  async deleteAllFavByUserId(user_id: string) {
    const joinUserParkoursFavoris = await this.getAllFavByUserId(user_id);
    await this.db.remove(joinUserParkoursFavoris);
  }

  // supp parkour
  async deleteAllFavByParkourId(parkour_id: number) {
    const joinUserParkoursFavoris = await this.getAllFavByParkourId(parkour_id);
    await this.db.remove(joinUserParkoursFavoris);
  }
}

export default JoinUserParkourFavorisService;
