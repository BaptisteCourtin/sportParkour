import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import { MessageEntity } from "../entities/message.entity";
import UserService from "../services/user.service";

import Cookies from "cookies";

import { MyContext } from "..";

@Resolver()
export default class UserResolver {
  // afficher infos user page profil
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByToken(@Ctx() ctx: MyContext) {
    let user: UserEntity | null = ctx.user;
    let result: UserEntity | null = null;

    if (user?.id) {
      // pour la liaison parkour
      result = await new UserService().getById(user.id);
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

  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => UserEntity)
  async modifyUser(
    @Arg("infos") infos: UserUpdateEntity,
    @Ctx() ctx: MyContext
  ) {
    let user: UserEntity | null = ctx.user;
    let result: UserEntity | null = null;

    if (user?.email) {
      result = await new UserService().modify(user.id, infos);
    }

    return result;
  }

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
