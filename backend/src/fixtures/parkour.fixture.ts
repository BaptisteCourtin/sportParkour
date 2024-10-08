import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";

import { Difficulty } from "../enum/difficulty.enum";
import ParkourEntity from "../entities/parkour.entity";
import EpreuveEntity from "../entities/epreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";
import UserEntity from "../entities/user.entity";
import JoinUserParkourNoteEntity from "../entities/joinUserParkourNote.entity";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

export async function createParkours(
  dataSource: DataSource,
  numParkours: number,
  epreuves: EpreuveEntity[],
  users: UserEntity[]
) {
  const parkourRepository = dataSource.getRepository(ParkourEntity);
  const imageParkourRepository = dataSource.getRepository(ImageParkourEntity);
  const joinUserParkourNoteRepository = dataSource.getRepository(
    JoinUserParkourNoteEntity
  );

  let indexImage = 1;
  const difficulties = Object.values(Difficulty);

  const parkours = [];
  for (let i = 0; i < numParkours; i++) {
    // ---------------------------------------------------------------------------------

    // difficulté
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    // ---------------------------------------------------------------------------------

    // length / time
    const thisLength = faker.number.int({
      min: 1,
      max: parseInt(process.env.NEXT_PUBLIC_MAX_LENGTH as string),
    });

    // (longueur / (random * nb à modifier + km/h moyen)) * 1h => (longueur / vitesse random entre 9 et 16) * 1h
    let thisTime = Math.floor(
      (thisLength / Math.floor(Math.random() * 8 + 9)) * 60
    );
    if (thisTime > parseInt(process.env.NEXT_PUBLIC_MAX_TIME as string)) {
      thisTime = parseInt(process.env.NEXT_PUBLIC_MAX_TIME as string);
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
      image.lien = faker.image.url();
      image.isCouverture = isCouverture;

      indexImage++;
      imagesParkour.push(image);
    }
    // met les images en bdd
    await imageParkourRepository.save(imagesParkour);

    // ---------------------------------------------------------------------------------

    // création
    const parkour = new ParkourEntity();
    parkour.id = i + 1;
    parkour.title = faker.word
      .words({ count: { min: 2, max: 5 } })
      .substring(0, parseInt(process.env.NEXT_PUBLIC_LENGTH_TITLE as string));
    parkour.description = faker.lorem
      .paragraphs({ min: 3, max: 5 }, "\n\n")
      .substring(
        0,
        parseInt(process.env.NEXT_PUBLIC_LENGTH_DESCRIPTION as string)
      );
    parkour.length = thisLength;
    parkour.time = thisTime;
    parkour.difficulty = randomDifficulty;
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

    // note (besoin de faire après la création du parkour pour la foreign-key)
    const joinUserParkoursNotes = [];
    let noteTotalThisParkour: number = 0;
    let nbVoteThisParkour: number = 0;
    let usersTabForNote: number[] = [];
    for (
      let k = 0;
      k < Math.floor(Math.random() * (users.length / 2 + 3));
      k++
    ) {
      const idUser = Math.floor(Math.random() * users.length);

      if (!usersTabForNote.includes(idUser)) {
        const joinUserParkourNote = new JoinUserParkourNoteEntity();
        const thisNote = faker.number.float({
          min: 0.5,
          max: 5,
          multipleOf: 0.5,
        });

        joinUserParkourNote.user_id = users[idUser].id;
        joinUserParkourNote.parkour_id = parkour.id;
        joinUserParkourNote.note = thisNote;
        joinUserParkourNote.commentaire = faker.lorem
          .paragraphs({ min: 1, max: 3 }, "\n\n")
          .substring(
            0,
            parseInt(process.env.NEXT_PUBLIC_LENGTH_COMMENTAIRE as string)
          );
        joinUserParkoursNotes.push(joinUserParkourNote);

        noteTotalThisParkour += thisNote;
        nbVoteThisParkour += 1;
        usersTabForNote.push(idUser);
      }
    }
    await joinUserParkourNoteRepository.save(joinUserParkoursNotes);

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

  return parkours;
}
