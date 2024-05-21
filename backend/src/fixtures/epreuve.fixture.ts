import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import EpreuveEntity from "../entities/epreuve.entity";

export async function createEpreuves(
  dataSource: DataSource,
  numEpreuves: number
) {
  const epreuveRepository = dataSource.getRepository(EpreuveEntity);

  const tabVideo = [
    "https://www.youtube.com/watch?v=Dsk3DTdTY3Y",
    "https://www.youtube.com/watch?v=ze9DrYHmiwg",
    "https://www.youtube.com/watch?v=aHqS1Iu-dQw",
  ];

  const epreuves = [];
  for (let i = 0; i < numEpreuves; i++) {
    const idVideo = Math.floor(Math.random() * tabVideo.length);

    const epreuve = new EpreuveEntity();
    (epreuve.id = i + 1),
      (epreuve.title = faker.lorem.words({ min: 2, max: 5 })),
      (epreuve.description = faker.lorem.paragraphs({ min: 3, max: 8 })),
      (epreuve.easyToDo = faker.lorem.paragraph()),
      (epreuve.mediumToDo = faker.lorem.paragraph()),
      (epreuve.hardToDo = faker.lorem.paragraph()),
      (epreuve.videoLink = tabVideo[idVideo]),
      epreuves.push(epreuve);
  }

  return await epreuveRepository.save(epreuves);
}
