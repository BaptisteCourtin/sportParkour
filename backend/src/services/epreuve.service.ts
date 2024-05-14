import { Repository } from "typeorm";
import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";

import datasource from "../lib/datasource";

class EpreuveService {
  db: Repository<EpreuveEntity>;

  constructor() {
    this.db = datasource.getRepository(EpreuveEntity);
  }

  async get(id: number) {
    const epreuve = await this.db.findOneBy({ id });
    if (!epreuve) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return epreuve;
  }

  // ---

  async create({ ...data }: EpreuveCreateEntity) {
    const newEpreuve = this.db.create(data);
    return await this.db.save(newEpreuve);
  }

  async modify(id: number, { ...data }: Partial<EpreuveUpdateEntity>) {
    const ad = await this.get(id);
    const infosMerge = this.db.merge(ad, data);
    return await this.db.save(infosMerge);
  }

  async delete(id: number) {
    const ad = await this.get(id);
    await this.db.remove(ad);
  }
}

export default EpreuveService;
