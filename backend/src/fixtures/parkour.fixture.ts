import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import ParkourEntity from "../entities/parkour.entity";
import { Difficulty } from "../enum/difficulty.enum";
import EpreuveEntity from "../entities/epreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";

export async function createParkours(
  dataSource: DataSource,
  numParkours: number,
  epreuves: EpreuveEntity[],
  numberUser: number
) {
  const parkourRepository = dataSource.getRepository(ParkourEntity);
  const imageParkourRepository = dataSource.getRepository(ImageParkourEntity);

  let indexImage = 1;

  const parkours = [];
  for (let i = 0; i < numParkours; i++) {
    // difficulté
    const difficultyNumber = Math.floor(Math.random() * 3);
    let thisDifficulty = Difficulty.facile;
    if (difficultyNumber == 1) {
      thisDifficulty = Difficulty.facile;
    } else if (difficultyNumber == 2) {
      thisDifficulty = Difficulty.moyen;
    } else if (difficultyNumber == 3) {
      thisDifficulty = Difficulty.difficile;
    }

    // épreuves
    const epreuvesTab: EpreuveEntity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      const idEpreuve = Math.floor(Math.random() * epreuves.length);
      if (!epreuvesTab.includes(epreuves[idEpreuve])) {
        epreuvesTab.push(epreuves[idEpreuve]);
      }
    }

    // time / length
    const thisLength = faker.number.int({ min: 0, max: 60 });
    let thisTime = thisLength * Math.floor(Math.random() * (15 - 7) + 6);
    if (thisTime > 600) {
      thisTime = 600;
    }

    // images
    const imagesParkour: ImageParkourEntity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      // isCouverture
      let isCouverture = false;
      if (j == 1) {
        isCouverture = true;
      }

      // create image
      const image = new ImageParkourEntity();
      image.id = indexImage;
      indexImage++;
      image.lien = faker.image.url();
      image.isCouverture = isCouverture;
      imagesParkour.push(image);
    }
    // met les images en bdd
    await imageParkourRepository.save(imagesParkour);

    // création
    const parkour = new ParkourEntity();
    parkour.id = i + 1;
    parkour.title = faker.word.words({ count: { min: 2, max: 5 } });
    parkour.description = faker.lorem.paragraphs({ min: 3, max: 5 }, "<br/>\n");
    parkour.length = thisLength;
    parkour.time = thisTime;
    parkour.difficulty = thisDifficulty;
    parkour.city = faker.location.city();
    parkour.start = `${faker.location.nearbyGPSCoordinate({
      origin: [46.77, -2.42],
      radius: 480000,
      isMetric: true,
    })}`;
    parkour.note = faker.number.float({ min: 0, max: 5 });
    parkour.nbVote = faker.number.int({ min: 1, max: numberUser });
    parkour.epreuves = epreuvesTab;
    parkour.images = imagesParkour;

    parkours.push(parkour);
  }

  return await parkourRepository.save(parkours);
}
