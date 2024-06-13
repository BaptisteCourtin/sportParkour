import { faker } from "@faker-js/faker/locale/fr";
import { DataSource } from "typeorm";
import UserEntity from "../entities/user.entity";
import { Role } from "../enum/role.enum";

faker.seed(123);

export async function createUsers(dataSource: DataSource, numUsers: number) {
  const userRepository = dataSource.getRepository(UserEntity);

  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = new UserEntity();
    user.id = faker.string.uuid();
    user.password = "0000";
    user.name = faker.person.lastName();
    user.firstname = faker.person.firstName();
    user.email = faker.internet.email();
    user.city = faker.location.city();
    user.codePostal = faker.location.zipCode();
    user.phone = "06" + faker.string.numeric({ length: 8 });
    user.role = Role.CLIENT;
    users.push(user);
  }

  return await userRepository.save(users);
}
