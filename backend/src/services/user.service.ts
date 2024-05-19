import { Repository } from "typeorm";
import UserEntity from "../entities/user.entity";

import datasource from "../lib/datasource";

class UserService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  async get(id: string) {
    const user = await this.db.findOne({
      where: { id },
      relations: ["parkours"], // Charge la relation 'parkours'
    });
    if (!user) {
      throw new Error("Vous n'existez pas ? 🤔 bizarre...");
    }
    return user;
  }
}
export default UserService;
