import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import ImageEpreuveEntity from "../entities/imageEpreuve.entity";
import EpreuveEntity from "../entities/epreuve.entity";

export async function createImageEpreuve(
  dataSource: DataSource,
  numImageEpreuves: number,
  epreuves: EpreuveEntity[]
) {
  const imageEpreuveRepository = dataSource.getRepository(ImageEpreuveEntity);

  const imageEpreuves = [];
  for (let i = 0; i < numImageEpreuves; i++) {
    const idEpreuve = Math.floor(Math.random() * epreuves.length);

    const imageEpreuve = new ImageEpreuveEntity();
    (imageEpreuve.id = i + 1),
      (imageEpreuve.lien = faker.image.url()),
      (imageEpreuve.id_epreuve = epreuves[idEpreuve]),
      imageEpreuves.push(imageEpreuve);
  }

  return await imageEpreuveRepository.save(imageEpreuves);
}
