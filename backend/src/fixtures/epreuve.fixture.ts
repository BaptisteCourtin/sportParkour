import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";

import EpreuveEntity from "../entities/epreuve.entity";
import ImageEpreuveEntity from "../entities/imageEpreuve.entity";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

export async function createEpreuves(
  dataSource: DataSource,
  numEpreuves: number
) {
  const epreuveRepository = dataSource.getRepository(EpreuveEntity);
  const imageEpreuveRepository = dataSource.getRepository(ImageEpreuveEntity);

  let indexImage = 1;

  const tabVideo = [
    "https://www.youtube.com/watch?v=Dsk3DTdTY3Y",
    "https://www.youtube.com/watch?v=ze9DrYHmiwg",
    "https://www.youtube.com/watch?v=aHqS1Iu-dQw",

    "https://www.youtube.com/watch?v=Ss6vLmLcCbU",
    "https://www.youtube.com/watch?v=c22J8d6IAVM",
    "https://www.youtube.com/watch?v=QF6BocR_7UA",
    "https://www.youtube.com/watch?v=ucX_WCNSbpo",
    "https://www.youtube.com/watch?v=j3VzaBcoDAI",
    "https://www.youtube.com/watch?v=FJFHyOXSOaI",
    "https://www.youtube.com/watch?v=qVZhwYupcg4",
  ];

  const epreuves = [];
  for (let i = 0; i < numEpreuves; i++) {
    // ---------------------------------------------------------------------------------

    // video
    const idVideo = Math.floor(Math.random() * tabVideo.length);

    // ---------------------------------------------------------------------------------

    // images
    const imagesEpreuve: ImageEpreuveEntity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      // isCouverture
      let isCouverture = false;
      if (j == 0) {
        isCouverture = true;
      }

      // create image
      const image = new ImageEpreuveEntity();
      image.id = indexImage;
      image.lien = faker.image.url();
      image.isCouverture = isCouverture;

      imagesEpreuve.push(image);
      indexImage++;
    }
    // met les images en bdd
    await imageEpreuveRepository.save(imagesEpreuve);

    // ---------------------------------------------------------------------------------

    // création épreuve
    const epreuve = new EpreuveEntity();
    epreuve.id = i + 1;
    epreuve.title = faker.word
      .words({ count: { min: 2, max: 5 } })
      .substring(0, parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string));
    epreuve.description = faker.lorem
      .paragraphs({ min: 2, max: 4 }, "\n\n")
      .substring(
        0,
        parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string)
      );
    epreuve.easyToDo = faker.lorem
      .paragraphs({ min: 1, max: 3 }, "\n\n")
      .substring(
        0,
        parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
      );
    epreuve.mediumToDo = faker.lorem
      .paragraphs({ min: 1, max: 3 }, "\n\n")
      .substring(
        0,
        parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
      );
    epreuve.hardToDo = faker.lorem
      .paragraphs({ min: 1, max: 3 }, "\n\n")
      .substring(
        0,
        parseInt(process.env.NEXT_PUBLIC_LENGTH_LITTLE_DESCRIPTION as string)
      );
    epreuve.videoLink = tabVideo[idVideo];
    epreuve.images = imagesEpreuve;

    // ---------------------------------------------------------------------------------

    epreuves.push(epreuve);
  }

  return await epreuveRepository.save(epreuves);
}
