import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import JoinUserParkourEntity from "../entities/joinUserParkour.entity";
import UserEntity from "../entities/user.entity";
import ParkourEntity from "../entities/parkour.entity";

export async function createJoinUserParkour(
  dataSource: DataSource,
  users: UserEntity[],
  parkours: ParkourEntity[]
) {
  const joinUserParkourRepository = dataSource.getRepository(
    JoinUserParkourEntity
  );

  const joinUserParkours = [];
  // user
  for (let i = 0; i < users.length; i++) {
    // parkour
    const parkoursTab: Number[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      const idParkour = Math.floor(Math.random() * parkours.length);

      if (!parkoursTab.includes(idParkour)) {
        const joinUserParkour = new JoinUserParkourEntity();
        joinUserParkour.user_id = users[i].id;
        joinUserParkour.parkour_id = parkours[idParkour].id;
        joinUserParkour.note = faker.number.float({
          min: 0,
          max: 5,
          multipleOf: 0.25,
        });
        joinUserParkour.favoris = faker.datatype.boolean();
        joinUserParkours.push(joinUserParkour);
        parkoursTab.push(idParkour);
      }
    }
  }

  return await joinUserParkourRepository.save(joinUserParkours);
}
