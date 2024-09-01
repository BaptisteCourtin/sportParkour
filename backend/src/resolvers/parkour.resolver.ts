import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import ParkourEntity, {
  ParkourCreateEntity,
  ParkourUpdateEntity,
} from "../entities/parkour.entity";
import MessageEntity from "../entities/message.entity";

import ParkourService from "../services/parkour.service";

@Resolver()
export default class ParkourResolver {
  @Query(() => ParkourEntity)
  async getParkourById(@Arg("id") id: number) {
    const result: ParkourEntity =
      await new ParkourService().getParkourWithRelationsById(id);
    return result;
  }

  @Query(() => [ParkourEntity])
  async getAllParkourForMap() {
    const result: ParkourEntity[] =
      await new ParkourService().getAllParkourForMap();
    return result;
  }

  // pour le search auto-complete
  @Query(() => [ParkourEntity])
  async getTop20ParkourByTitle(
    @Arg("title", { nullable: true }) title: string
  ) {
    const result: ParkourEntity[] =
      await new ParkourService().getTop20ParkourByTitle(title);
    return result;
  }

  // pour le search
  @Query(() => [ParkourEntity])
  async getTop20ParkourBySearch(
    @Arg("triParField") triParField: string,
    @Arg("triParSort") triParSort: "ASC" | "DESC",
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
        triParField,
        triParSort,
        startPage,

        city,
        lengthMin,
        lengthMax,
        timeMin,
        timeMax,
        difficulty,
        noteMin
      );
    return result;
  }

  // pagination
  @Query(() => Number)
  async getTheParkourTotalForSearch(
    @Arg("city", { nullable: true }) city: string,
    @Arg("timeMin", { nullable: true }) timeMin: number,
    @Arg("timeMax", { nullable: true }) timeMax: number,
    @Arg("lengthMin", { nullable: true }) lengthMin: number,
    @Arg("lengthMax", { nullable: true }) lengthMax: number,
    @Arg("difficulty", { nullable: true }) difficulty: string,
    @Arg("noteMin", { nullable: true }) noteMin: number
  ) {
    const result: Number =
      await new ParkourService().getTheParkourTotalForSearch(
        city,
        lengthMin,
        lengthMax,
        timeMin,
        timeMax,
        difficulty,
        noteMin
      );
    return result;
  }

  // ---

  // on cré pas les images ici => on récupe par rapport à l'id
  @Authorized("ADMIN")
  @Mutation(() => ParkourEntity)
  async createParkour(@Arg("infos") infos: ParkourCreateEntity) {
    const newParkour: ParkourEntity = await new ParkourService().createParkour(
      infos
    );

    return newParkour;
  }

  @Authorized("ADMIN")
  @Mutation(() => ParkourEntity)
  async modifyParkour(
    @Arg("id") id: number,
    @Arg("infos") infos: ParkourUpdateEntity
  ) {
    const result: ParkourEntity = await new ParkourService().modifyParkour(
      id,
      infos
    );
    return result;
  }

  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteParkour(@Arg("id") id: number) {
    const parkourRemove = await new ParkourService().deleteParkour(id);

    const returnMessage = new MessageEntity();
    returnMessage.message = `Vous venez de supprimer le parkour : ${parkourRemove.title}`;
    returnMessage.success = true;
    return returnMessage;
  }
}
