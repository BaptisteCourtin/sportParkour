import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
  JoinUserParkourUpdateEntity,
} from "../entities/joinUserParkour.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";

@Resolver()
export default class JoinUserParkourResolver {
  @Authorized("ADMIN", "CLIENT")
  @Query(() => [JoinUserParkourEntity])
  async getUserFavByEmail(@Arg("email") email: string) {
    const result: JoinUserParkourEntity[] =
      await new JoinUserParkourService().getFavByEmail(email);
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
