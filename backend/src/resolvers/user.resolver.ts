import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import { MessageEntity } from "../entities/message.entity";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import { MyContext, Payload } from "..";
import { jwtVerify } from "jose";

@Resolver()
export default class UserResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByEmail(@Arg("email") email: string) {
    const UserEntity = await new UserService().getByEmail(email);
    return UserEntity;
  }

  @Authorized("ADMIN", "CLIENT")
  @Query(() => UserEntity)
  async getUserByToken(@Ctx() ctx: MyContext) {
    let token = ctx.req.cookies["tokenParkour"];
    let user: UserEntity | null = null;

    if (token) {
      try {
        const verify = await jwtVerify<Payload>(
          token,
          new TextEncoder().encode(process.env.SECRET_KEY)
        );
        user = await new AuthService().findUserByEmail(verify.payload.email);
      } catch (err) {
        console.log(err);
      }
    }

    if (user) {
      user = await new UserService().getByEmail(user.email);
    }

    return user;
  }

  // le @Authorized vérifie déjà que on est admin
  @Authorized("ADMIN")
  @Query(() => Boolean)
  async isAdmin() {
    return true;
  }

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
