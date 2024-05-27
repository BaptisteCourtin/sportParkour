import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import EpreuveEntity, {
  EpreuveCreateEntity,
  EpreuveUpdateEntity,
} from "../entities/epreuve.entity";
import EpreuveService from "../services/epreuve.service";
import { MessageEntity } from "../entities/message.entity";

import { MyContext } from "..";

@Resolver()
export default class EpreuveResolver {
  @Query(() => EpreuveEntity)
  async getEpreuveById(@Arg("id") id: number) {
    const result: EpreuveEntity = await new EpreuveService().getById(id);
    return result;
  }

  @Query(() => [EpreuveEntity])
  async getListEpreuveByTitle(@Arg("title", { nullable: true }) title: string) {
    const result: EpreuveEntity[] = await new EpreuveService().getListByTitle(
      title
    );
    return result;
  }

  // utilise le get by ids mais sans parametre => all
  @Authorized()
  @Query(() => [EpreuveEntity])
  async getListEpreuve(@Ctx() ctx: MyContext) {
    // if (!ctx.user) {
    //   throw new Error(
    //     "Vous devez être authentifié pour accéder à la liste des livres!"
    //   );
    // }
    const result: EpreuveEntity[] = await new EpreuveService().getListByIds();
    return result;
  }
  // ---

  @Mutation(() => EpreuveEntity)
  async createEpreuve(@Arg("infos") infos: EpreuveCreateEntity) {
    const resultNewEpreuveID: number = await new EpreuveService().create(infos);

    // on cré pas les images ici => on récupe par rapport à l'id
    const result: EpreuveEntity = await new EpreuveService().getById(
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
