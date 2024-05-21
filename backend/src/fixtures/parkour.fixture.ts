import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import ParkourEntity from "../entities/parkour.entity";
import { Difficulty } from "../enum/difficulty.enum";
import EpreuveEntity from "../entities/epreuve.entity";

export async function createParkours(
  dataSource: DataSource,
  numParkours: number,
  epreuves: EpreuveEntity[]
) {
  const parkourRepository = dataSource.getRepository(ParkourEntity);

  const parkours = [];
  for (let i = 0; i < numParkours; i++) {
    const epreuvesTab = [];

    const idEpreuve = Math.floor(Math.random() * epreuves.length);
    epreuvesTab.push(epreuves[idEpreuve]);
    if (idEpreuve % 2 == 0) {
      const idEpreuve2 = Math.floor(Math.random() * epreuves.length);
      if (idEpreuve2 !== idEpreuve) {
        epreuvesTab.push(epreuves[idEpreuve2]);
      }
    }
    if (idEpreuve % 5 == 0) {
      const idEpreuve3 = Math.floor(Math.random() * epreuves.length);
      if (idEpreuve3 !== idEpreuve) {
        epreuvesTab.push(epreuves[idEpreuve3]);
      }
    }

    const parkour = new ParkourEntity();
    (parkour.id = i + 1),
      (parkour.title = faker.lorem.words({ min: 2, max: 5 })),
      (parkour.description = faker.lorem.paragraphs({ min: 1, max: 4 })),
      (parkour.time = faker.number.int({ min: 0, max: 600 })),
      (parkour.length = faker.number.int({ min: 1, max: 60 })),
      (parkour.difficulty = Difficulty.EASY),
      (parkour.city = faker.location.city()),
      (parkour.start = `${faker.location.nearbyGPSCoordinate()}`),
      (parkour.note = faker.number.float({ min: 0, max: 5 })),
      (parkour.nbVote = faker.number.int({ min: 1, max: 200 })),
      (parkour.epreuves = epreuvesTab),
      parkours.push(parkour);
  }

  return await parkourRepository.save(parkours);
}
