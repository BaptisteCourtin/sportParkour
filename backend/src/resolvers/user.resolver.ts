import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import { MessageEntity } from "../entities/message.entity";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import Cookies from "cookies";

import { MyContext } from "..";

@Resolver()
export default class UserResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByToken(@Ctx() ctx: MyContext) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: UserEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.email) {
      // pour la liaison parkour
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

  // le @Authorized vérifie déjà que on est client
  @Authorized("CLIENT")
  @Query(() => Boolean)
  async isClient() {
    return true;
  }

  // ---

  // éviter le id et faire avec le token
  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => UserEntity)
  async modifyUser(
    @Arg("infos") infos: UserUpdateEntity,
    @Ctx() ctx: MyContext
  ) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: UserEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.email) {
      result = await new UserService().modify(user.id, infos);
    }
    return result;
  }

  // éviter le id et faire avec le token
  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => MessageEntity)
  async deleteUser(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    await new UserService().delete(id);

    let cookies = new Cookies(ctx.req, ctx.res);
    cookies.set("tokenParkour"); //sans valeur, le cookie sera supprimé

    const returnMessage = new MessageEntity();
    returnMessage.message = "Vous venez de vous désintégrer 🎆";
    returnMessage.success = true;
    return returnMessage;
  }
}
