import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import ParkourEntity, {
  ParkourCreateEntity,
  ParkourUpdateEntity,
} from "../entities/parkour.entity";
import EpreuveEntity from "../entities/epreuve.entity";

import EpreuveService from "./epreuve.service";
import JoinUserParkourService from "./joinUserParkour.service";

class ParkourService {
  db: Repository<ParkourEntity>;

  constructor() {
    this.db = datasource.getRepository(ParkourEntity);
  }

  async getById(id: number) {
    const parkour = await this.db.findOne({
      where: { id },
      relations: ["images", "epreuves"], // Charge la relation 'images' et 'parcours'
    });
    if (!parkour) {
      throw new Error("Ce parkour n'existe pas");
    }
    return parkour;
  }

  async getByTitle(title: string) {
    const parkour = await this.db.findOne({
      where: { title },
      relations: ["images", "epreuves"],
    });
    if (!parkour) {
      throw new Error("Ce parkour n'existe pas");
    }
    return parkour;
  }

  async getAll() {
    const allParkours: ParkourEntity[] | null = await this.db.find({
      relations: ["images", "epreuves"],
    });

    if (!allParkours) {
      throw new Error("Pas de parkours");
    }

    return allParkours;
  }

  // ---

  async create(data: ParkourCreateEntity) {
    let epreuves: EpreuveEntity[] = [];
    if (data.epreuves?.length) {
      epreuves = await new EpreuveService().getListByIds(data.epreuves);
    }

    const newParkour = this.db.create({ ...data, epreuves });
    await this.db.save(newParkour);
    return newParkour.id;
  }

  // ajouter modify note  + nbNotes

  async modify(id: number, data: ParkourUpdateEntity) {
    const parkour = await this.getById(id);

    for (const key of Object.keys(data) as Array<keyof ParkourUpdateEntity>) {
      if (data[key] !== null && key !== "epreuves") {
        (parkour as any)[key] = data[key];
      }
    }

    // Gérer les relations avec epreuves
    if (data.epreuves !== null && data.epreuves.length > 0) {
      const epreuveIds = data.epreuves;
      parkour.epreuves = await new EpreuveService().getListByIds(epreuveIds);
    } else if (data.epreuves?.length == 0) {
      parkour.epreuves = [];
    }

    return await this.db.save(parkour);
  }

  async delete(id: number) {
    const parkour = await this.getById(id);
    // pour sup les relations epreuves
    parkour.epreuves = [];

    // pour sup les relations user
    await new JoinUserParkourService().deleteAllByParkourId(id);

    await this.db.save(parkour);
    await this.db.remove(parkour);
  }
}

export default ParkourService;
