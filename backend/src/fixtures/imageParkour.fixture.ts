import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import ImageParkourEntity from "../entities/imageParkour.entity";
import ParkourEntity from "../entities/parkour.entity";

export async function createImageParkour(
  dataSource: DataSource,
  numImageParkours: number,
  parkours: ParkourEntity[]
) {
  const imageParkourRepository = dataSource.getRepository(ImageParkourEntity);

  const imageParkours = [];
  for (let i = 0; i < numImageParkours; i++) {
    const idParkour = Math.floor(Math.random() * parkours.length);

    const imageParkour = new ImageParkourEntity();
    (imageParkour.id = i + 1),
      (imageParkour.lien = faker.image.url()),
      (imageParkour.id_parkour = parkours[idParkour]),
      imageParkours.push(imageParkour);
  }

  return await imageParkourRepository.save(imageParkours);
}
