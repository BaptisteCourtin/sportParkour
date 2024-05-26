import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
    const ParkourEntity = await new ParkourService().getById(id);
    return ParkourEntity;
  }

  @Query(() => ParkourEntity)
  async getParkourByTitle(@Arg("title") title: string) {
    const ParkourEntity = await new ParkourService().getByTitle(title);
    return ParkourEntity;
  }

  @Query(() => [ParkourEntity])
  async getAllParkour() {
    const result: ParkourEntity[] = await new ParkourService().getAll();
    return result;
  }

  // ---

  @Mutation(() => ParkourEntity)
  async createParkour(@Arg("infos") infos: ParkourCreateEntity) {
    const resultNewParkourID: number = await new ParkourService().create(infos);

    const result: ParkourEntity = await new ParkourService().getById(
      resultNewParkourID
    );
    return result;
  }

  @Mutation(() => ParkourEntity)
  async modifyParkour(
    @Arg("id") id: number,
    @Arg("infos") infos: ParkourUpdateEntity
  ) {
    const result: ParkourEntity = await new ParkourService().modify(id, infos);
    return result;
  }

  @Mutation(() => MessageEntity)
  async deleteParkour(@Arg("id") id: number) {
    await new ParkourService().delete(id);

    const returnMessage = new MessageEntity();
    returnMessage.message = "Vous venez de supprimer un parkour";
    returnMessage.success = true;
    return returnMessage;
  }
}
