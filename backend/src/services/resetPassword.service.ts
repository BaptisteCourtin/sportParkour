import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import User from "../entities/user.entity";
import ResetPasswordEntity from "../entities/resetPassword.entity";
import UserService from "./user.service";
import { uuid } from "uuidv4";

export default class ResetPasswordService {
  db: Repository<ResetPasswordEntity>;

  constructor() {
    this.db = datasource.getRepository(ResetPasswordEntity);
  }

  async createResetToken(email: string) {
    const user = await new UserService().getByEmail(email);
    if (!user) {
      throw new Error("Ce user n'existe pas");
    }

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

    const newResetToken = this.db.create(resetToken);
    return await this.db.save(newResetToken);
  }

  async findResetToken(token: string) {
    const resetToken = await this.db.findOne({
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

  async changePassword(password: string, user: User) {
    const data = {
      ...user,
      password: password,
    };

    return await await new UserService().modify(user.id, data);
  }

  async deleteResetToken(token: string) {
    const tokenToDelete = await this.db.findOne({
      where: { resetToken: token },
    });

    if (tokenToDelete) {
      await this.db.remove(tokenToDelete);
    } else {
      throw new Error("Pas pu supprimé le token de reset mdp");
    }
  }
}
