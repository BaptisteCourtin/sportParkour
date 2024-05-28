import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import UserService from "../services/user.service";
import { MessageEntity } from "../entities/message.entity";

@Resolver()
export default class UserResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByEmail(@Arg("email") email: string) {
    const UserEntity = await new UserService().getByEmail(email);
    return UserEntity;
  }

  // @Authorized("ADMIN", "CLIENT")
  // @Query(() => UserEntity)
  // async getUserFavByEmail(@Arg("email") email: string) {
  //   const UserEntity = await new UserService().getFavByEmail(email);
  //   return UserEntity;
  // }

  // ---

  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => UserEntity)
  async modifyUser(
    @Arg("id") id: string,
    @Arg("infos") infos: UserUpdateEntity
  ) {
    const result: UserEntity = await new UserService().modify(id, infos);
    return result;
  }

  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => MessageEntity)
  async deleteUser(@Arg("id") id: string) {
    await new UserService().delete(id);

    const returnMessage = new MessageEntity();
    returnMessage.message = "Vous venez de vous désintégrer 🎆";
    returnMessage.success = true;
    return returnMessage;
  }
}
