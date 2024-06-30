import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourFavorisEntity from "../entities/joinUserParkourFavoris.entity";

class JoinUserParkourFavorisService {
  db: Repository<JoinUserParkourFavorisEntity>;

  constructor() {
    this.db = datasource.getRepository(JoinUserParkourFavorisEntity);
  }

  async getFavByUserIdAndParkourId(userId: string, parkourId: number) {
    const result: JoinUserParkourFavorisEntity | null = await this.db.findOne({
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
  async getAllFavByUserId(userId: string) {
    const allJoinUserParkoursFavoris: JoinUserParkourFavorisEntity[] | null =
      await this.db.find({
        where: {
          user_id: userId,
        },
      });

    if (!allJoinUserParkoursFavoris) {
      throw new Error("Pas de join User-Parkour");
    }

    return allJoinUserParkoursFavoris;
  }

  // pour delete all
  async getAllFavByParkourId(parkourId: number) {
    const allJoinUserParkoursFavoris: JoinUserParkourFavorisEntity[] | null =
      await this.db.find({
        where: {
          parkour_id: parkourId,
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

  async deleteFavByUserIdAndParkourId(userId: string, parkourId: number) {
    const joinUserParkoursFavoris = await this.getFavByUserIdAndParkourId(
      userId,
      parkourId
    );
    await this.db.remove(joinUserParkoursFavoris);
  }

  // supp user
  async deleteAllFavByUserId(userId: string) {
    const joinUserParkoursFavoris = await this.getAllFavByUserId(userId);
    await this.db.remove(joinUserParkoursFavoris);
  }

  // supp parkour
  async deleteAllFavByParkourId(parkourId: number) {
    const joinUserParkoursFavoris = await this.getAllFavByParkourId(parkourId);
    await this.db.remove(joinUserParkoursFavoris);
  }
}

export default JoinUserParkourFavorisService;
