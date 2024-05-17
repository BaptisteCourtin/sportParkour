import { DataSource, Repository } from "typeorm";
import datasource from "../lib/datasource";

import ParkourEntity, {
  ParkourCreateEntity,
  ParkourUpdateEntity,
} from "../entities/parkour.entity";
import EpreuveEntity from "../entities/epreuve.entity";

import EpreuveService from "./epreuve.service";

class ParkourService {
  db: Repository<ParkourEntity>;
  // dbEpreuve: Repository<EpreuveEntity>;

  constructor() {
    this.db = datasource.getRepository(ParkourEntity);
    // this.dbEpreuve = datasource.getRepository(EpreuveEntity);
  }

  async get(id: number) {
    const parkour = await this.db.findOne({
      where: { id },
      relations: ["images", "epreuves"], // Charge la relation 'images' et 'parcours'
    });
    if (!parkour) {
      throw new Error("Ce parkour n'existe pas");
    }
    return parkour;
  }

  // ---

  async create(data: ParkourCreateEntity) {
    let epreuves: EpreuveEntity[] = [];
    if (data.epreuves?.length) {
      epreuves = await new EpreuveService().getAll(data.epreuves);
    }

    const newParkour = this.db.create({ ...data, epreuves });

    return await this.db.save(newParkour);
  }

  async modify(id: number, data: ParkourUpdateEntity) {
    const parkour = await this.get(id);

    for (const key of Object.keys(data) as Array<keyof ParkourUpdateEntity>) {
      if (data[key] !== null) {
        (parkour as any)[key] = data[key];
      }
    }

    return await this.db.save(parkour);
  }

  async delete(id: number) {
    const parkour = await this.get(id);
    await this.db.remove(parkour);
  }
}

export default ParkourService;
