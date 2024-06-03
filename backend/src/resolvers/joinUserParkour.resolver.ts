import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import JoinUserParkourEntity, {
  JoinUserParkourCreateEntity,
} from "../entities/joinUserParkour.entity";
import JoinUserParkourService from "../services/joinUserParkour.service";
import AuthService from "../services/auth.service";

import { MyContext } from "..";
import { MessageEntity } from "../entities/message.entity";

@Resolver()
export default class JoinUserParkourResolver {
  @Authorized("CLIENT")
  @Query(() => JoinUserParkourEntity)
  async getUserFavByTokenAndIdParkour(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkour_id: number
  ) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: JoinUserParkourEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.id) {
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
    let token = ctx.req.cookies["tokenParkour"];
    let result: JoinUserParkourEntity[] | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.email) {
      result = await new JoinUserParkourService().getFavByEmail(user.email);
    }

    return result;
  }

  // ---

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async createFavJoinUserParkour(
    @Arg("infos") infos: JoinUserParkourCreateEntity,
    @Ctx() ctx: MyContext
  ) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: JoinUserParkourEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.id) {
      if (infos.favoris == false && infos.note == null) {
        result = await new JoinUserParkourService().deleteByUserIdAndParkourId(
          user.id,
          infos.parkour_id
        );
      } else {
        result = await new JoinUserParkourService().create(user.id, infos);
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
  async createNoteJoinUserParkour(
    @Arg("infos") infos: JoinUserParkourCreateEntity,
    @Ctx() ctx: MyContext
  ) {
    let token = ctx.req.cookies["tokenParkour"];
    let result: JoinUserParkourEntity | null = null;

    const user = await new AuthService().getUserFromToken(token);
    if (user.id) {
      if (infos.favoris == false && infos.note == null) {
        result = await new JoinUserParkourService().deleteByUserIdAndParkourId(
          user.id,
          infos.parkour_id
        );
      } else {
        result = await new JoinUserParkourService().create(user.id, infos);
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
