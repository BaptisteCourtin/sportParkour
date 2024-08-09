import { Like, Repository } from "typeorm";
import datasource from "../lib/datasource";

import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";
import ImageEpreuveEntity from "../entities/imageEpreuve.entity";

class EpreuveService {
  db: Repository<EpreuveEntity>;
  dbImage: Repository<ImageEpreuveEntity>;

  constructor() {
    this.db = datasource.getRepository(EpreuveEntity);
    this.dbImage = datasource.getRepository(ImageEpreuveEntity);
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

    return listEpreuves;
  }

  async getTop20EpreuveByTitle(title?: string) {
    const listEpreuves: EpreuveEntity[] | null = await this.db.find({
      where: title ? [{ title: Like(`%${title}%`) }] : undefined,
      relations: ["images"],
      take: 20,
    });

    return listEpreuves;
  }

  // ---

  async isEpreuveLinkedToParkours(id: number) {
    const epreuve: EpreuveEntity | null = await this.db.findOne({
      where: { id },
      relations: ["parkours"],
    });

    if (epreuve?.parkours && epreuve.parkours.length > 0) {
      return true;
    }

    return false;
  }

  // ---

  async createEpreuve(data: EpreuveCreateEntity) {
    const newEpreuve: EpreuveEntity = this.db.create(data);
    await this.db.save(newEpreuve);

    if (data.images && data.images.length > 0) {
      for (const imageData of data.images) {
        const newImage = this.dbImage.create({
          ...imageData,
          epreuve_id: newEpreuve,
        });
        await this.dbImage.save(newImage);
      }
    }

    return newEpreuve;
  }

  async modifyEpreuve(id: number, data: EpreuveUpdateEntity) {
    const epreuve: EpreuveEntity = await this.getEpreuveById(id);

    // Mettre à jour les champs de l'épreuve
    for (const key of Object.keys(data) as Array<keyof EpreuveUpdateEntity>) {
      if (data[key] !== null && key !== "images" && key !== "deletedImageIds") {
        (epreuve as any)[key] = data[key];
      }
    }

    await this.db.save(epreuve);

    // Gérer les images
    if (data.images || data.deletedImageIds) {
      // Supprimer les images si nécessaire
      if (data.deletedImageIds && data.deletedImageIds.length > 0) {
        await this.dbImage.delete(data.deletedImageIds);
      }

      // Ajouter les images
      if (data.images && data.images.length > 0) {
        for (const imageData of data.images) {
          // Création d'une nouvelle image
          const newImage = this.dbImage.create({
            ...imageData,
            epreuve_id: epreuve,
          });
          await this.dbImage.save(newImage);
        }
      }
    }

    // on retourne epreuve (donc sans les images mais osef on veut juste l'id)
    return epreuve;
  }

  async deleteEpreuve(id: number) {
    const epreuve: EpreuveEntity = await this.getEpreuveById(id);
    return await this.db.remove(epreuve);
  }
}

export default EpreuveService;
