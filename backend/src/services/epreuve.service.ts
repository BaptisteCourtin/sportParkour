import { In, Repository } from "typeorm";
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
    const epreuve: EpreuveEntity | null = await this.db.findOne({
      where: { id },
      relations: ["images"], // Charge la relation 'images'
    });
    if (!epreuve) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return epreuve;
  }

  async getAll(epreuvesIds?: number[]) {
    const allEpreuves: EpreuveEntity[] | null = await this.db.find({
      where: {
        id:
          epreuvesIds && epreuvesIds.length > 0
            ? In(epreuvesIds.map((id) => id))
            : undefined,
      },
    });

    if (!allEpreuves) {
      throw new Error("Pas d'epreuves");
    }

    console.log(allEpreuves);
    return allEpreuves;
  }

  // ---

  async create(data: EpreuveCreateEntity) {
    const newEpreuve = this.db.create(data);
    return await this.db.save(newEpreuve);
  }

  // pas besoin de partial<>
  async modify(id: number, data: EpreuveUpdateEntity) {
    const epreuve = await this.get(id);

    // Itérer sur les clés de l'objet data
    for (const key of Object.keys(data) as Array<keyof EpreuveUpdateEntity>) {
      // Vérifier si la valeur n'est pas nulle
      if (data[key] !== null) {
        // Mettre à jour la propriété correspondante de epreuve
        (epreuve as any)[key] = data[key];
      }
    }

    return await this.db.save(epreuve);
  }

  async delete(id: number) {
    const epreuve = await this.get(id);
    await this.db.remove(epreuve);
  }
}

export default EpreuveService;
