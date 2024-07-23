import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";

import MessageEntity from "../entities/message.entity";
import JoinUserParkourFavorisEntity from "../entities/joinUserParkourFavoris.entity";
import UserEntity from "../entities/user.entity";
import ParkourEntity from "../entities/parkour.entity";

import JoinUserParkourFavorisService from "../services/joinUserParkourFavoris.service";
import ParkourService from "../services/parkour.service";

@Resolver()
export default class JoinUserParkourFavorisResolver {
  // page id parkour (true / false)
  @Authorized("CLIENT")
  @Query(() => Boolean)
  async getUserFavByTokenAndParkourId(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkourId: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourFavorisEntity | null = null;

    if (user?.id) {
      result =
        await new JoinUserParkourFavorisService().getFavByUserIdAndParkourId(
          user.id,
          parkourId
        );
    }

    if (result) {
      return true;
    }

    return false;
  }

  // page my favoris
  @Authorized("CLIENT")
  @Query(() => [JoinUserParkourFavorisEntity])
  async getAllUserFavByToken(@Ctx() ctx: MyContext) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourFavorisEntity[] | null = null;

    if (user?.id) {
      result =
        await new JoinUserParkourFavorisService().getAllFavWithRelationsByUserId(
          user.id
        );
    }

    return result;
  }

  // ---

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async createJoinUserParkourFavoris(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkourId: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: ParkourEntity | null = null;

    if (user?.id) {
      await new JoinUserParkourFavorisService().createFavByUserIdAndParkourId(
        user.id,
        parkourId
      );

      result = await new ParkourService().getParkourById(parkourId);
    }

    const returnMessage = new MessageEntity();
    if (result) {
      returnMessage.message = `Vous venez d'ajouter à vos favoris le parkour : ${result.title}`;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuh petit problème... le parkour n'a pas été ajouter à vos favoris";
      returnMessage.success = false;
    }

    return returnMessage;
  }

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async deleteJoinUserParkourFavoris(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkourId: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: ParkourEntity | null = null;

    if (user?.id) {
      await new JoinUserParkourFavorisService().deleteFavByUserIdAndParkourId(
        user.id,
        parkourId
      );

      result = await new ParkourService().getParkourById(parkourId);
    }

    const returnMessage = new MessageEntity();
    if (result) {
      returnMessage.message = `Vous venez d'enlever de vos favoris le parkour : ${result.title} `;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuh petit problème... le parkour n'a pas été enlever à vos favoris";
      returnMessage.success = false;
    }

    return returnMessage;
  }
}
