import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { uuid } from "uuidv4";

import ResetPasswordEntity from "../entities/resetPassword.entity";
import UserEntity from "../entities/user.entity";

import UserService from "./user.service";

export default class ResetPasswordService {
  db: Repository<ResetPasswordEntity>;
  dbUser: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(ResetPasswordEntity);
    this.dbUser = datasource.getRepository(UserEntity);
  }

  async findResetToken(token: string) {
    const resetToken: ResetPasswordEntity | null = await this.db.findOne({
      where: { resetToken: token },
      relations: { user: true },
    });

    return resetToken;
  }

  async checkResetTokenValidity(token: string) {
    let result = false;

    const resetToken = await this.findResetToken(token);
    if (resetToken) {
      const dateToken = resetToken.expirationDate;
      const date = Date.now();
      result = dateToken.getTime() > date; // vérifie la date d'expiration
    }

    return result; // true / false
  }

  // ---

  async createResetToken(email: string) {
    const user: UserEntity = await new UserService().getUserByEmail(email);

    // cherche dans la bdd reset
    let resetToken = await this.db.findOne({
      where: { user },
      relations: { user: true },
    });
    if (!resetToken) {
      resetToken = this.db.create({ user });
    }

    const date = new Date();
    date.setMinutes(date.getMinutes() + 10); // permet 10 minutes

    resetToken.expirationDate = new Date(date.getTime());
    resetToken.resetToken = uuid();

    const newResetToken: ResetPasswordEntity = this.db.create(resetToken);
    return await this.db.save(newResetToken);
  }

  async changePassword(password: string, user: UserEntity) {
    const editedUser: UserEntity = this.dbUser.create({ ...user });
    editedUser.password = password;

    return await this.dbUser.save(editedUser);
  }

  async deleteResetToken(token: string) {
    const tokenToDelete: ResetPasswordEntity | null = await this.db.findOne({
      where: { resetToken: token },
    });

    if (tokenToDelete) {
      await this.db.remove(tokenToDelete);
    } else {
      throw new Error("Pas pu supprimé le token de reset mdp");
    }
  }
}
