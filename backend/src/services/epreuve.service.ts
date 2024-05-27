import { In, Like, Repository } from "typeorm";
import datasource from "../lib/datasource";

import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";

class EpreuveService {
  db: Repository<EpreuveEntity>;

  constructor() {
    this.db = datasource.getRepository(EpreuveEntity);
  }

  async getById(id: number) {
    const epreuve: EpreuveEntity | null = await this.db.findOne({
      where: { id: id },
      relations: ["images"], // Charge la relation 'images'
    });
    if (!epreuve) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return epreuve;
  }

  async getListByTitle(title?: string) {
    const listEpreuves: EpreuveEntity[] | null = await this.db.find({
      where: title ? [{ title: Like(`%${title}%`) }] : undefined,
      relations: ["images"],
    });

    if (!listEpreuves) {
      throw new Error("Pas d'épreuve portant ce nom");
    }

    return listEpreuves;
  }

  async getListByIds(ids?: number[]) {
    const listEpreuves: EpreuveEntity[] | null = await this.db.find({
      where: {
        id: ids && ids.length > 0 ? In(ids.map((id) => id)) : undefined,
      },
    });

    if (!listEpreuves) {
      throw new Error("Pas d'epreuves");
    }

    return listEpreuves;
  }

  // ---

  async isEpreuveLinkedToParkours(id: number) {
    const epreuve: EpreuveEntity | null = await this.db.findOne({
      where: { id },
      relations: ["parkours"],
    });

    if (!epreuve) {
      throw new Error("Cette épreuve n'existe pas");
    }
    if (epreuve?.parkours && epreuve.parkours.length > 0) {
      return true;
    }
    return false;
  }

  // ---

  async create(data: EpreuveCreateEntity) {
    const newEpreuve = this.db.create(data);
    await this.db.save(newEpreuve);
    return newEpreuve.id;
  }

  // pas besoin de partial<>
  async modify(id: number, data: EpreuveUpdateEntity) {
    // les images ont déjà été changés avant (si besoin) => donc on peut juste renvoyer le save
    const epreuve = await this.getById(id);

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
    const epreuve = await this.getById(id);
    await this.db.remove(epreuve);
  }
}

export default EpreuveService;
