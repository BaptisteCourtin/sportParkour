import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
  JoinUserParkourUpdateEntity,
} from "../entities/joinUserParkour.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";

@Resolver()
export default class JoinUserParkourResolver {
  // le get est fait par le user

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
