import { Repository } from "typeorm";
import UserEntity, { UserInputRegisterEntity } from "../entities/user.entity";

import datasource from "../lib/datasource";

class AuthService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  async findUserByEmail(email: string) {
    const user = await this.db.findOneBy({ email });
    return user;
  }

  async createUser(data: UserInputRegisterEntity) {
    const user = this.db.create(data);
    const newUser = await this.db.save(user);
    return newUser;
  }
}
export default AuthService;
