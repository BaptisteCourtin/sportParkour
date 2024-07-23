import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";

import MessageEntity from "../entities/message.entity";
import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";

import EpreuveService from "../services/epreuve.service";

@Resolver()
export default class EpreuveResolver {
  @Query(() => EpreuveEntity)
  async getEpreuveById(@Arg("id") id: number) {
    const result: EpreuveEntity = await new EpreuveService().getEpreuveById(id);
    return result;
  }

  // utilise le get by ids mais sans parametre => all
  // page get all
  @Query(() => [EpreuveEntity])
  async getAllEpreuve() {
    const result: EpreuveEntity[] =
      await new EpreuveService().getListEpreuveByIds();
    return result;
  }

  // pour les search auto-complete
  @Query(() => [EpreuveEntity])
  async getTop20EpreuveByTitle(
    @Arg("title", { nullable: true }) title: string
  ) {
    const result: EpreuveEntity[] =
      await new EpreuveService().getTop20EpreuveByTitle(title);
    return result;
  }

  // ---

  // on cré pas les images ici => on récupe par rapport à l'id
  @Authorized("ADMIN")
  @Mutation(() => EpreuveEntity)
  async createEpreuve(@Arg("infos") infos: EpreuveCreateEntity) {
    const newEpreuve: EpreuveEntity = await new EpreuveService().createEpreuve(
      infos
    );

    return newEpreuve;
  }

  @Authorized("ADMIN")
  @Mutation(() => EpreuveEntity)
  async modifyEpreuve(
    @Arg("id") id: number,
    @Arg("infos") infos: EpreuveUpdateEntity
  ) {
    const result: EpreuveEntity = await new EpreuveService().modifyEpreuve(
      id,
      infos
    );
    return result;
  }

  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteEpreuve(@Arg("id") id: number) {
    const returnMessage = new MessageEntity();

    const isLinkedToParkours =
      await new EpreuveService().isEpreuveLinkedToParkours(id);

    if (isLinkedToParkours) {
      returnMessage.message =
        "Cette épreuve est encore liée à des parkours et ne peut pas être supprimée.";
      returnMessage.success = false;
    } else {
      const epreuveRemove = await new EpreuveService().deleteEpreuve(id);

      returnMessage.message = `Vous venez de supprimer l' épreuve : ${epreuveRemove.title}`;
      returnMessage.success = true;
    }
    return returnMessage;
  }
}
