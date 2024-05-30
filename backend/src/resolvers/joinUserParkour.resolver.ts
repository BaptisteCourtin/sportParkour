import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
} from "../entities/joinUserParkour.entity";
import UserEntity from "../entities/user.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";
import AuthService from "../services/auth.service";

import { MyContext, Payload } from "..";
import { jwtVerify } from "jose";

@Resolver()
export default class JoinUserParkourResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => [JoinUserParkourEntity])
  async getUserFavByToken(@Ctx() ctx: MyContext) {
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

    let result: JoinUserParkourEntity[] | null = null;
    if (user) {
      result = await new JoinUserParkourService().getFavByEmail(user.email);
    }

    return result;
  }

  @Authorized("CLIENT")
  @Mutation(() => JoinUserParkourEntity)
  async createJoinUserParkour(
    @Arg("infos") infos: JoinUserParkourCreateEntity
  ) {
    const result: JoinUserParkourEntity =
      await new JoinUserParkourService().create(infos);
    return result;
  }
}
