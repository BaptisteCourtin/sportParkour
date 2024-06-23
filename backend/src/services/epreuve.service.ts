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

  async getEpreuveById(id: number) {
    const epreuve: EpreuveEntity | null = await this.db.findOne({
      where: { id: id },
      relations: ["images"], // Charge la relation 'images'
    });
    if (!epreuve) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return epreuve;
  }

  async getListEpreuveByIds(ids?: number[]) {
    // cherche les epreuves suivant la table de ids (all si pas de table)
    // prend les images qui ont isCouverture à true
    const listEpreuves: EpreuveEntity[] = await this.db
      .createQueryBuilder("epreuve")
      .leftJoinAndSelect(
        "epreuve.images",
        "images",
        "images.isCouverture = true"
      )
      .where(ids && ids.length > 0 ? "epreuve.id IN (:...ids)" : "1=1", { ids })
      .getMany();

    if (!listEpreuves) {
      throw new Error("Pas d'epreuves");
    }

    return listEpreuves;
  }

  async getTop20EpreuveByTitle(title?: string) {
    const listEpreuves: EpreuveEntity[] | null = await this.db.find({
      where: title ? [{ title: Like(`%${title}%`) }] : undefined,
      relations: ["images"],
      take: 20,
    });

    if (!listEpreuves) {
      throw new Error("Pas d'épreuve portant ce nom");
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

  async createEpreuve(data: EpreuveCreateEntity) {
    const newEpreuve = this.db.create(data);
    await this.db.save(newEpreuve);
    return newEpreuve;
  }

  async modifyEpreuve(id: number, data: EpreuveUpdateEntity) {
    const epreuve = await this.getEpreuveById(id);

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

  async deleteEpreuve(id: number) {
    const epreuve = await this.getEpreuveById(id);
    return await this.db.remove(epreuve);
  }
}

export default EpreuveService;
