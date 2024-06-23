import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import { MessageEntity } from "../entities/message.entity";
import UserService from "../services/user.service";

import Cookies from "cookies";

import { MyContext } from "..";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";

@Resolver()
export default class UserResolver {
  // afficher infos user page profil
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByToken(@Ctx() ctx: MyContext) {
    const user: UserEntity | null = ctx.user;
    return user;
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
  @Mutation(() => MessageEntity)
  async modifyUser(
    @Arg("infos") infos: UserUpdateEntity,
    @Ctx() ctx: MyContext
  ) {
    let user: UserEntity | null = ctx.user;
    const returnMessage = new MessageEntity();

    if (user) {
      await new UserService().modifyUser(user, infos);
      returnMessage.message = "Bien joué, vous venez de vous modifier";
      returnMessage.success = true;
    } else {
      returnMessage.message = "Une erreur ... (oups)";
      returnMessage.success = false;
    }

    return returnMessage;
  }

  @Authorized("ADMIN", "CLIENT")
  @Mutation(() => MessageEntity)
  async deleteUser(@Ctx() ctx: MyContext) {
    let user: UserEntity | null = ctx.user;
    const returnMessage = new MessageEntity();

    if (user) {
      await new JoinUserParkourNoteService().deleteAllNoteByUserId(user.id);

      await new UserService().deleteUser(user);

      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("tokenParkour"); // sans valeur, le cookie sera supprimé

      returnMessage.message = "Vous venez de vous désintégrer 🎆";
      returnMessage.success = true;
    } else {
      returnMessage.message = "Vous n'existez pas ? 🤔 bizarre...";
      returnMessage.success = false;
    }

    return returnMessage;
  }
}
