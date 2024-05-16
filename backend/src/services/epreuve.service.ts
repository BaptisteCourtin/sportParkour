import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";
import EpreuveImageEntity from "../entities/imageEpreuve.entity";

class EpreuveService {
  db: Repository<EpreuveEntity>;
  dbImage: Repository<EpreuveImageEntity>;

  constructor() {
    this.db = datasource.getRepository(EpreuveEntity);
    this.dbImage = datasource.getRepository(EpreuveImageEntity);
  }

  async get(id: number) {
    const epreuve = await this.db.findOne({
      where: { id },
      relations: ["images"], // Charge la relation 'images'
    });
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
