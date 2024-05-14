import { Repository } from "typeorm";
import ParkourEntity from "../entities/parkour.entity";

import datasource from "../lib/datasource";

class ParkourService {
  db: Repository<ParkourEntity>;

  constructor() {
    this.db = datasource.getRepository(ParkourEntity);
  }

  async get(id: number) {
    const parkour = await this.db.findOneBy({ id });
    if (!parkour) {
      throw new Error("Ce parkour n'existe pas");
    }
    return parkour;
  }
}

export default ParkourService;
