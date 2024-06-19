import { Repository } from "typeorm";
import UserEntity, { UserInputRegisterEntity } from "../entities/user.entity";

import datasource from "../lib/datasource";

import { jwtVerify } from "jose";
import { Payload } from "..";

class AuthService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  async findUserByEmail(email: string) {
    const user: UserEntity | null = await this.db.findOneBy({ email });
    return user;
  }

  async createUser(data: UserInputRegisterEntity) {
    const user: UserEntity = this.db.create(data);
    const newUser: UserEntity = await this.db.save(user);
    return newUser;
  }
}
export default AuthService;
