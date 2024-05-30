import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
} from "../entities/joinUserParkour.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";
import AuthService from "../services/auth.service";

import { MyContext } from "..";

@Resolver()
export default class JoinUserParkourResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => [JoinUserParkourEntity])
  async getUserFavByToken(@Ctx() ctx: MyContext) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: JoinUserParkourEntity[] | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user) {
      result = await new JoinUserParkourService().getFavByEmail(user.email);
    }

    return result;
  }

  // ---

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
