import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourFavEntity,
  JoinUserParkourNoteEntity,
} from "../entities/joinUserParkour.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";

import { MyContext } from "..";
import { MessageEntity } from "../entities/message.entity";
import UserEntity from "../entities/user.entity";
import ParkourService from "../services/parkour.service";

@Resolver()
export default class JoinUserParkourResolver {
  @Authorized("CLIENT")
  @Query(() => JoinUserParkourEntity)
  async getUserFavByTokenAndIdParkour(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkour_id: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourEntity | null = null;

    if (user?.id) {
      result = await new JoinUserParkourService().getByUserIdAndParkourId(
        user.id,
        parkour_id
      );
    }

    return result;
  }

  @Authorized("CLIENT")
  @Query(() => [JoinUserParkourEntity])
  async getAllUserFavByToken(@Ctx() ctx: MyContext) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourEntity[] | null = null;

    if (user?.email) {
      result = await new JoinUserParkourService().getFavByEmail(user.email);
    }

    return result;
  }

  // ---

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async favJoinUserParkour(
    @Arg("infos") infos: JoinUserParkourFavEntity,
    @Ctx() ctx: MyContext
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourEntity | null = null;

    if (user?.id) {
      const isExist =
        await new JoinUserParkourService().isUserIdAndParkourIdExist(
          user.id as string,
          infos.parkour_id
        );

      const data = {
        parkour_id: infos.parkour_id,
        favoris: infos.favoris,
      };

      if (!isExist) {
        // create
        result = await new JoinUserParkourService().create(user.id, data);
      } else {
        // modify
        result = await new JoinUserParkourService().modify(user.id, data);
      }
    }

    const returnMessage = new MessageEntity();
    if (result?.favoris == true) {
      returnMessage.message = `Vous venez d'ajouter le parkour ${result.parkours.title} à vos favoris`;
      returnMessage.success = true;
    } else if (result?.favoris == false) {
      returnMessage.message = `Vous venez d'enlever le parkour ${result.parkours.title} de vos favoris`;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuuh petit problème... le parkour n'a pas été ajouter à vos favoris (ou enlever)";
      returnMessage.success = false;
    }

    return returnMessage;
  }

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async noteJoinUserParkour(
    @Arg("infos") infos: JoinUserParkourNoteEntity,
    @Ctx() ctx: MyContext
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourEntity | null = null;

    if (user?.id) {
      const isExist =
        await new JoinUserParkourService().isUserIdAndParkourIdExist(
          user.id as string,
          infos.parkour_id
        );

      const data = {
        parkour_id: infos.parkour_id,
        note: infos.note,
      };

      if (isExist == false) {
        // create note
        result = await new JoinUserParkourService().create(user.id, data);
        // change la note du parkour + ajoute 1 au nbVote
        await new ParkourService().addOneVoteByParkourId(
          result.parkour_id,
          result.note
        );
      } else {
        // obliger de le faire en premier pour pouvoir récupérer l'ancienne note
        const joinUserParkour =
          await new JoinUserParkourService().getByUserIdAndParkourId(
            user.id,
            infos.parkour_id
          );
        // modify note
        result = await new JoinUserParkourService().modify(user.id, data);
        // change la note du parkour sans ajouter 1 au nbVote
        await new ParkourService().changeOneVoteByParkourId(
          joinUserParkour.note,
          result.parkour_id,
          result.note
        );
      }
    }
    const returnMessage = new MessageEntity();
    if (result?.note !== null) {
      returnMessage.message = `Vous venez de mettre une note au parkour ${result?.parkours.title}`;
      returnMessage.success = true;
    } else if (result?.note == null) {
      returnMessage.message = `Vous venez d'enlever votre note au parkour ${result.parkours.title}`;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuuh petit problème... la note du parkour n'a pas été changée";
      returnMessage.success = false;
    }

    return returnMessage;
  }
}
