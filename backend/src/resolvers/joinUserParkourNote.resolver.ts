import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";

import MessageEntity from "../entities/message.entity";
import JoinUserParkourNoteEntity, {
  JoinUserParkourNoteCreateEntity,
} from "../entities/joinUserParkourNote.entity";
import UserEntity from "../entities/user.entity";
import ParkourEntity from "../entities/parkour.entity";

import ParkourService from "../services/parkour.service";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";

@Resolver()
export default class JoinUserParkourNoteResolver {
  // page id parkour
  @Authorized("CLIENT")
  @Query(() => JoinUserParkourNoteEntity)
  async getUserNoteByTokenAndParkourId(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkourId: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourNoteEntity | null = null;

    if (user?.id) {
      result =
        await new JoinUserParkourNoteService().getNoteByUserIdAndParkourId(
          user.id,
          parkourId
        );
    }

    return result;
  }

  // page my note
  @Authorized("CLIENT")
  @Query(() => [JoinUserParkourNoteEntity])
  async getAllUserNoteByToken(@Ctx() ctx: MyContext) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourNoteEntity[] | null = null;

    if (user?.id) {
      result =
        await new JoinUserParkourNoteService().getAllNoteWithRelationsByUserId(
          user.id
        );
    }

    return result;
  }

  // ---

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async createJoinUserParkourNote(
    @Ctx() ctx: MyContext,
    @Arg("infos") infos: JoinUserParkourNoteCreateEntity
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourNoteEntity | null = null;
    let parkour: ParkourEntity | null = null;

    if (user?.id) {
      const joinUserParkourLastNote =
        await new JoinUserParkourNoteService().getNoteByUserIdAndParkourIdOrNull(
          user.id,
          infos.parkour_id
        );

      result = await new JoinUserParkourNoteService().createNote(
        user.id,
        infos
      );

      if (result) {
        if (joinUserParkourLastNote) {
          // modify
          await new ParkourService().changeOneNoteByParkourId(
            +joinUserParkourLastNote.note,
            +result.parkour_id,
            +result.note
          );
        } else {
          // create
          await new ParkourService().addOneNoteByParkourId(
            +result.parkour_id,
            +result.note
          );
        }

        parkour = await new ParkourService().getParkourById(result.parkour_id);
      }
    }

    const returnMessage = new MessageEntity();
    if (parkour) {
      returnMessage.message = `Vous venez de mettre une note au parkour : ${parkour.title}`;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuuh petit problème... la note du parkour n'a pas été ajoutée au parkour";
      returnMessage.success = false;
    }

    return returnMessage;
  }

  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async deleteJoinUserParkourNote(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkourId: number
  ) {
    let user: UserEntity | null = ctx.user;
    let parkour: ParkourEntity | null = null;

    if (user?.id) {
      await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
        user.id,
        parkourId
      );

      parkour = await new ParkourService().getParkourById(parkourId);
    }

    const returnMessage = new MessageEntity();
    if (parkour) {
      returnMessage.message = `Vous venez de supprimer une note au parkour : ${parkour.title}`;
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuh petit problème... la note n'a pas pu être supprimer du parkour";
      returnMessage.success = false;
    }

    return returnMessage;
  }
}
