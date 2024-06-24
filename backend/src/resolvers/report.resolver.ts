import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MessageEntity } from "../entities/message.entity";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";
import ReportService from "../services/report.service";
import UserService from "../services/user.service";
import { MyContext } from "..";

@Resolver()
export default class ReportResolver {
  @Mutation(() => MessageEntity)
  async reportNote(
    @Arg("user_id") user_id: string,
    @Arg("parkour_id") parkour_id: number,
    @Ctx() ctx: MyContext
  ) {
    const returnMessage = new MessageEntity();

    const result = await new ReportService().reportNoteByUserIdAndParkourId(
      user_id,
      parkour_id
    );

    await new ReportService().addOneAtReporterByToken(ctx.user?.id);

    returnMessage.message =
      "Vous venez de reporter le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  // ---

  @Mutation(() => MessageEntity)
  async deleteNoteByReport(
    @Arg("user_id") user_id: string,
    @Arg("parkour_id") parkour_id: number
  ) {
    const returnMessage = new MessageEntity();

    await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
      user_id,
      parkour_id
    );

    await new ReportService().addOneReportForUser(user_id);

    returnMessage.message =
      "Vous venez de supprimer le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  @Mutation(() => MessageEntity)
  async deleteUserByReport(@Arg("user_id") user_id: string) {
    const returnMessage = new MessageEntity();

    const user = await new UserService().getUserById(user_id);
    await new UserService().deleteUser(user);

    returnMessage.message = "Vous venez de supprimer un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }
}
