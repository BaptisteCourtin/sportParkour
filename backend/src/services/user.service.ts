import { Repository } from "typeorm";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";

import datasource from "../lib/datasource";
import JoinUserParkourFavorisService from "./joinUserParkourFavoris.service";
import JoinUserParkourNoteService from "./joinUserParkourNote.service";

class UserService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  // pour auth et reset password
  async getUserByEmail(email: string) {
    const user: UserEntity | null = await this.db.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Vous n'existez pas ? 🤔 bizarre...");
    }

    return user;
  }

  // ---

  async modifyUser(user: UserEntity, data: UserUpdateEntity) {
    for (const key of Object.keys(data) as Array<keyof UserUpdateEntity>) {
      if (data[key] !== null) {
        (user as any)[key] = data[key];
      }
    }

    return await this.db.save(user);
  }

  async deleteUser(user: UserEntity) {
    await this.db.remove(user);
  }
}
export default UserService;
