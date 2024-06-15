import { Repository } from "typeorm";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";

import datasource from "../lib/datasource";
import JoinUserParkourService from "./joinUserParkour.service";

class UserService {
  db: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(UserEntity);
  }

  async getById(id: string) {
    const user: UserEntity | null = await this.db.findOne({
      where: { id },
      relations: ["parkours"], // Charge les relations 'parkours' => JoinUserParkourEntity ET 'parkours.parkours' => l'netity parkour pour le title
    });

    if (!user) {
      throw new Error("Vous n'existez pas ? 🤔 bizarre...");
    }

    // Vérifier si la relation "parkours" existe
    if (user.parkours && user.parkours.length > 0) {
      // Charger la relation imbriquée "parkours.parkours" uniquement si "parkours" existe
      const userWithParkours = await this.db.findOne({
        where: { id },
        relations: ["parkours.parkours"], // Charge les relations 'parkours' => JoinUserParkourEntity ET 'parkours.parkours' => l'entity parkour pour le title
      });

      if (!user) {
        throw new Error("Alors..., c'est la merde.");
      }

      if (userWithParkours) {
        return userWithParkours;
      }
    }

    // si pas de parkours relier au user => on renvoie user
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.db.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Vous n'existez pas ? 🤔 bizarre...");
    }

    return user;
  }

  // ---

  async modify(id: string, data: UserUpdateEntity) {
    const user = await this.getById(id);
    const { parkours, ...userWithoutParkours } = user;

    for (const key of Object.keys(data) as Array<keyof UserUpdateEntity>) {
      if (data[key] !== null) {
        (userWithoutParkours as any)[key] = data[key];
      }
    }

    return await this.db.save(userWithoutParkours);
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await new JoinUserParkourService().deleteAllByUserId(id);

    await this.db.save(user);
    await this.db.remove(user);
  }
}
export default UserService;
