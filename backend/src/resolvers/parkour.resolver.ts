import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import ParkourEntity, {
  ParkourCreateEntity,
  ParkourUpdateEntity,
} from "../entities/parkour.entity";
import ParkourService from "../services/parkour.service";
import { MessageEntity } from "../entities/message.entity";

@Resolver()
export default class ParkourResolver {
  @Query(() => ParkourEntity)
  async getParkourById(@Arg("id") id: number) {
    const result = await new ParkourService().getById(id);
    return result;
  }

  // pour le search auto-complete
  @Query(() => [ParkourEntity])
  async getTop20ParkourByTitle(
    @Arg("title", { nullable: true }) title: string
  ) {
    const result: ParkourEntity[] =
      await new ParkourService().getListTop20ByTitle(title);
    return result;
  }

  // pour le search et pagination
  @Query(() => [ParkourEntity])
  async getTop20ParkourBySearch(
    @Arg("startPage") startPage: number,
    @Arg("city", { nullable: true }) city: string,
    @Arg("timeMin", { nullable: true }) timeMin: number,
    @Arg("timeMax", { nullable: true }) timeMax: number,
    @Arg("lengthMin", { nullable: true }) lengthMin: number,
    @Arg("lengthMax", { nullable: true }) lengthMax: number,
    @Arg("difficulty", { nullable: true }) difficulty: string,
    @Arg("noteMin", { nullable: true }) noteMin: number
  ) {
    const result: ParkourEntity[] =
      await new ParkourService().getTop20ParkourBySearch(
        startPage,
        city,
        timeMin,
        timeMax,
        lengthMin,
        lengthMax,
        difficulty,
        noteMin
      );
    return result;
  }

  // ---

  @Authorized("ADMIN")
  @Mutation(() => ParkourEntity)
  async createParkour(@Arg("infos") infos: ParkourCreateEntity) {
    const resultNewParkourID: number = await new ParkourService().create(infos);

    const result: ParkourEntity = await new ParkourService().getById(
      resultNewParkourID
    );
    return result;
  }

  @Authorized("ADMIN")
  @Mutation(() => ParkourEntity)
  async modifyParkour(
    @Arg("id") id: number,
    @Arg("infos") infos: ParkourUpdateEntity
  ) {
    const result: ParkourEntity = await new ParkourService().modify(id, infos);
    return result;
  }

  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteParkour(@Arg("id") id: number) {
    await new ParkourService().delete(id);

    const returnMessage = new MessageEntity();
    returnMessage.message = "Vous venez de supprimer un parkour";
    returnMessage.success = true;
    return returnMessage;
  }
}
