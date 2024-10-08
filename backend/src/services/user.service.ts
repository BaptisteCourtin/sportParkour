import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import UserEntity, { UserUpdateEntity } from "../entities/user.entity";

import JoinUserParkourNoteService from "./joinUserParkourNote.service";

class UserService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  // pour report delete
  async getUserById(id: string) {
    const user: UserEntity | null = await this.db.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new Error("L'utilisateur n'existe pas ? 🤔 bizarre...");
    }

    return user;
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
    try {
      const updateData: Partial<UserEntity> = {};
      for (const key of Object.keys(data) as Array<keyof UserUpdateEntity>) {
        if (data[key] !== null) {
          updateData[key] = data[key];
        }
      }

      await this.db.update(user.id, updateData);
      return await this.db.findOne({ where: { id: user.id } });
    } catch (error) {
      console.error("Error modifying user:", error);
      throw new Error("Failed to modify user");
    }
  }

  async deleteUser(user: UserEntity) {
    await new JoinUserParkourNoteService().deleteAllNoteByUserId(user.id);
    await this.db.remove(user);
  }
}
export default UserService;
