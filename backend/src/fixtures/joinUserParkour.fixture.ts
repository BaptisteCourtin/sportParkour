import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import JoinUserParkourEntity from "../entities/joinUserParkour.entity";
import UserEntity from "../entities/user.entity";
import ParkourEntity from "../entities/parkour.entity";

export async function createJoinUserParkour(
  dataSource: DataSource,
  numJoinUserParkours: number,
  users: UserEntity[],
  parkours: ParkourEntity[]
) {
  const joinUserParkourRepository = dataSource.getRepository(
    JoinUserParkourEntity
  );

  const joinUserParkours = [];
  for (let i = 0; i < numJoinUserParkours; i++) {
    const idUser = Math.floor(Math.random() * users.length);
    const idParkour = Math.floor(Math.random() * parkours.length);

    const joinUserParkour = new JoinUserParkourEntity();
    (joinUserParkour.user_id = users[idUser].id),
      (joinUserParkour.parkour_id = parkours[idParkour].id),
      (joinUserParkour.note = faker.number.float({
        min: 0,
        max: 5,
        multipleOf: 0.25,
      })),
      (joinUserParkour.favoris = faker.datatype.boolean()),
      joinUserParkours.push(joinUserParkour);
  }

  return await joinUserParkourRepository.save(joinUserParkours);
}
