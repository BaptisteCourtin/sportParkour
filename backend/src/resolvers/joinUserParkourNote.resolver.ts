import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "..";
import { MessageEntity } from "../entities/message.entity";
import UserEntity from "../entities/user.entity";
import ParkourService from "../services/parkour.service";
import JoinUserParkourNoteEntity, {
  JoinUserParkourNoteCreateEntity,
} from "../entities/joinUserParkourNote.entity";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";
import ParkourEntity from "../entities/parkour.entity";

@Resolver()
export default class JoinUserParkourResolver {
  // page id parkour
  @Authorized("CLIENT")
  @Query(() => JoinUserParkourNoteEntity)
  async getUserNoteByTokenAndParkourId(
    @Ctx() ctx: MyContext,
    @Arg("parkourId") parkour_id: number
  ) {
    let user: UserEntity | null = ctx.user;
    let result: JoinUserParkourNoteEntity | null = null;

    if (user?.id) {
      result =
        await new JoinUserParkourNoteService().getNoteByUserIdAndParkourId(
          user.id,
          parkour_id
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
    @Arg("infos") infos: JoinUserParkourNoteCreateEntity,
    @Ctx() ctx: MyContext
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
          await new ParkourService().changeOneNoteByParkourId(
            joinUserParkourLastNote.note,
            result.parkour_id,
            result.note
          );
        } else {
          await new ParkourService().addOneNoteByParkourId(
            result.parkour_id,
            result.note
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
    @Arg("idParkour") idParkour: number,
    @Ctx() ctx: MyContext
  ) {
    let user: UserEntity | null = ctx.user;
    let parkour: ParkourEntity | null = null;

    if (user?.id) {
      await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
        user.id,
        idParkour
      );

      parkour = await new ParkourService().getParkourById(idParkour);
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
