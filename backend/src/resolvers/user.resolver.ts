import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import { MessageEntity } from "../entities/message.entity";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import { MyContext } from "..";

@Resolver()
export default class UserResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByToken(@Ctx() ctx: MyContext) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: UserEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user) {
      result = await new UserService().getByEmail(user.email);
    }

    return result;
  }

  // le @Authorized vérifie déjà que on est admin
  @Authorized("ADMIN")
  @Query(() => Boolean)
  async isAdmin() {
    return true;
  }

  // ---

  // éviter le id et faire avec le token
  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => UserEntity)
  async modifyUser(
    @Arg("id") id: string,
    @Arg("infos") infos: UserUpdateEntity
  ) {
    const result: UserEntity = await new UserService().modify(id, infos);
    return result;
  }

  // éviter le id et faire avec le token
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
