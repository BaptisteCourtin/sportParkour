import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import ParkourEntity from "../entities/parkour.entity";
import { Difficulty } from "../enum/difficulty.enum";
import EpreuveEntity from "../entities/epreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";
import UserEntity from "../entities/user.entity";
import JoinUserParkourEntity from "../entities/joinUserParkour.entity";

export async function createParkours(
  dataSource: DataSource,
  numParkours: number,
  epreuves: EpreuveEntity[],
  users: UserEntity[]
) {
  const parkourRepository = dataSource.getRepository(ParkourEntity);
  const imageParkourRepository = dataSource.getRepository(ImageParkourEntity);
  const joinUserParkourRepository = dataSource.getRepository(
    JoinUserParkourEntity
  );

  let indexImage = 1;

  const parkours = [];
  for (let i = 0; i < numParkours; i++) {
    // ---------------------------------------------------------------------------------

    // difficulté
    const difficultyNumber = Math.floor(Math.random() * 3);
    let thisDifficulty = Difficulty.facile;
    if (difficultyNumber == 0) {
      thisDifficulty = Difficulty.facile;
    } else if (difficultyNumber == 1) {
      thisDifficulty = Difficulty.moyen;
    } else if (difficultyNumber == 2) {
      thisDifficulty = Difficulty.difficile;
    }

    // ---------------------------------------------------------------------------------

    // time / length
    const thisLength = faker.number.int({ min: 0, max: 60 });
    let thisTime = thisLength * Math.floor(Math.random() * (15 - 7) + 6);
    if (thisTime > 600) {
      thisTime = 600;
    }

    // ---------------------------------------------------------------------------------

    // épreuves
    const epreuvesTab: EpreuveEntity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      const idEpreuve = Math.floor(Math.random() * epreuves.length);
      if (!epreuvesTab.includes(epreuves[idEpreuve])) {
        epreuvesTab.push(epreuves[idEpreuve]);
      }
    }

    // ---------------------------------------------------------------------------------

    // images
    const imagesParkour: ImageParkourEntity[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      // isCouverture
      let isCouverture = false;
      if (j == 0) {
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

    // ---------------------------------------------------------------------------------

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
      origin: [46.767671, 2.4291341],
      radius: 480,
      isMetric: true,
    })}`;
    parkour.note = 0;
    parkour.nbVote = 0;
    parkour.epreuves = epreuvesTab;
    parkour.images = imagesParkour;

    await parkourRepository.save(parkour);

    // ---------------------------------------------------------------------------------

    // note et favoris (besoin de faire après la création du parkour pour la foreign-key)
    const joinUserParkours = [];
    let noteTotalThisParkour: number = 0;
    let nbVoteThisParkour: number = 0;
    let usersTab: number[] = [];
    for (
      let k = 0;
      k < Math.floor(Math.random() * (users.length / 2 + 3));
      k++
    ) {
      const idUser = Math.floor(Math.random() * users.length);

      if (!usersTab.includes(idUser)) {
        const joinUserParkour = new JoinUserParkourEntity();
        const thisNote = faker.number.float({
          min: 0,
          max: 5,
          multipleOf: 0.25,
        });

        joinUserParkour.user_id = users[idUser].id;
        joinUserParkour.parkour_id = parkour.id;
        joinUserParkour.note = thisNote;
        joinUserParkour.favoris = faker.datatype.boolean();
        joinUserParkours.push(joinUserParkour);

        noteTotalThisParkour += thisNote;
        nbVoteThisParkour += 1;
        usersTab.push(idUser);
      }
    }
    await joinUserParkourRepository.save(joinUserParkours);

    // ---------------------------------------------------------------------------------

    if (nbVoteThisParkour == 0) {
      parkour.note = 0;
    } else {
      parkour.note = noteTotalThisParkour / nbVoteThisParkour;
    }
    parkour.nbVote = nbVoteThisParkour;

    // ---------------------------------------------------------------------------------

    parkours.push(parkour);
  }

  for (let i = 0; i < numParkours; i++) {
    const parkour = parkours[i];
    await parkourRepository.update(parkour.id, {
      note: parkour.note,
      nbVote: parkour.nbVote,
    });
  }
}
