import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserEntity from "../entities/user.entity";
import UserService from "../services/user.service";

@Resolver()
export default class UserResolver {
  @Query(() => UserEntity)
  async getUser(@Arg("id") id: string) {
    const UserEntity = await new UserService().get(id);
    return UserEntity;
  }
}
