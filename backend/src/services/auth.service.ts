import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import UserEntity, { UserInputRegisterEntity } from "../entities/user.entity";

class AuthService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  async findUserByEmailOrNull(email: string) {
    const user: UserEntity | null = await this.db.findOne({
      where: { email: email },
    });
    return user;
  }

  async createUser(data: UserInputRegisterEntity) {
    const user: UserEntity = this.db.create(data);
    const newUser: UserEntity = await this.db.save(user);
    return newUser;
  }
}
export default AuthService;
