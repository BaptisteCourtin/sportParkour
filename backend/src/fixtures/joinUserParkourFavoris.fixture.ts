import { DataSource } from "typeorm";

import { JoinUserParkourFavorisEntity } from "../entities/joinUserParkourFavoris.entity";
import UserEntity from "../entities/user.entity";
import ParkourEntity from "../entities/parkour.entity";

export async function createJoinUserParkourFavoris(
  dataSource: DataSource,
  parkours: ParkourEntity[],
  users: UserEntity[]
) {
  const joinUserParkourFavorisRepository = dataSource.getRepository(
    JoinUserParkourFavorisEntity
  );

  const joinUserParkoursFavoris = [];

  for (let i = 0; i < parkours.length; i++) {
    let usersTabForFav: number[] = [];
    for (let j = 0; j < Math.floor(Math.random() * (users.length / 3)); j++) {
      const idUser = Math.floor(Math.random() * users.length);

      if (!usersTabForFav.includes(idUser)) {
        const joinUserParkourFav = new JoinUserParkourFavorisEntity();

        joinUserParkourFav.user_id = users[idUser].id;
        joinUserParkourFav.parkour_id = parkours[i].id;
        joinUserParkoursFavoris.push(joinUserParkourFav);

        usersTabForFav.push(idUser);
      }
    }
  }

  return await joinUserParkourFavorisRepository.save(joinUserParkoursFavoris);
}
