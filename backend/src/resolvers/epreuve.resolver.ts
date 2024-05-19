import { Arg, Mutation, Query, Resolver } from "type-graphql";
import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";
import EpreuveService from "../services/epreuve.service";
import { MessageEntity } from "../entities/message.entity";

@Resolver()
export default class EpreuveResolver {
  @Query(() => EpreuveEntity)
  async getEpreuve(@Arg("id") id: number) {
    const result: EpreuveEntity = await new EpreuveService().get(id);
    return result;
  }

  @Query(() => [EpreuveEntity])
  async getListEpreuve() {
    const result: EpreuveEntity[] = await new EpreuveService().getAll();
    return result;
  }

  // ---

  @Mutation(() => EpreuveEntity)
  async createEpreuve(@Arg("infos") infos: EpreuveCreateEntity) {
    const resultNewEpreuveID: number = await new EpreuveService().create(infos);

    // on cré pas les images ici => on récupe par rapport à l'id
    const result: EpreuveEntity = await new EpreuveService().get(
      resultNewEpreuveID
    );
    return result;
  }

  @Mutation(() => EpreuveEntity)
  async modifyEpreuve(
    @Arg("id") id: number,
    @Arg("infos") infos: EpreuveUpdateEntity
  ) {
    const result: EpreuveEntity = await new EpreuveService().modify(id, infos);
    return result;
  }

  @Mutation(() => MessageEntity)
  async deleteEpreuve(@Arg("id") id: number) {
    const isLinkedToParkours =
      await new EpreuveService().isEpreuveLinkedToParkours(id);

    if (isLinkedToParkours) {
      throw new Error(
        "Cette épreuve est encore liée à des parkours et ne peut pas être supprimée."
      );
    }
    await new EpreuveService().delete(id);

    const returnMessage = new MessageEntity();
    returnMessage.message = "Vous venez de supprimer une épreuve";
    returnMessage.success = true;
    return returnMessage;
  }
}
