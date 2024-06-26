import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MessageEntity } from "../entities/message.entity";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";
import ReportService from "../services/report.service";
import UserService from "../services/user.service";
import { MyContext } from "..";
import UserEntity from "../entities/user.entity";
import { ReportStatus } from "../enum/reportStatus.enum";
import { ReportEntity } from "../entities/reportEntity.entity";
import JoinUserParkourNoteEntity from "../entities/joinUserParkourNote.entity";

@Resolver()
export default class ReportResolver {
  // page user by admin
  @Authorized("ADMIN")
  @Query(() => UserEntity)
  async getUserByIdForPageReport(@Arg("userId") userId: string) {
    const result = await new ReportService().getUserByIdForPageReport(userId);

    return result;
  }

  // page search reports
  @Authorized("ADMIN")
  @Query(() => [ReportEntity])
  async getReportsBySearch(@Arg("status") status: ReportStatus) {
    const result: ReportEntity[] = await new ReportService().getReportsBySearch(
      status
    );
    return result;
  }

  // ---

  // user sur malfrat comm
  @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async reportNote(
    @Arg("malfratId") malfratId: string,
    @Arg("parkourId") parkourId: number,
    @Ctx() ctx: MyContext,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    if (ctx.user) {
      const reportExist = await new ReportService().isReportExist(
        malfratId,
        parkourId,
        commentaire
      );

      if (!reportExist) {
        // cré le report
        await new ReportService().reportNoteByUserIdAndParkourId(
          malfratId,
          parkourId,
          ctx.user.id,
          commentaire
        );
      }

      // ajoute 1 au nb de report ajoutés par le user
      await new ReportService().addOneNbReportAjouteByToken(ctx.user);

      returnMessage.message =
        "Vous venez de reporter le message d'un utilisateur";
      returnMessage.success = true;
    }

    return returnMessage;
  }

  // ---

  // admin sur malfrat comm - laisse
  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async letNote(@Arg("reportId") reportId: number) {
    const returnMessage = new MessageEntity();

    // on laisse le comm => on enlève le report (c'est tout)
    await new ReportService().deleteReportByReportId(reportId);

    returnMessage.message = "Vous venez de laisser le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  // admin sur malfrat comm - delete
  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteNoteAndAddOneReportValide(
    @Arg("malfratId") malfratId: string,
    @Arg("parkourId") parkourId: number,
    @Arg("reportId") reportId: number,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    const joinUserParkourNote: JoinUserParkourNoteEntity | null =
      await new JoinUserParkourNoteService().getNoteByUserIdAndParkourIdOrNull(
        malfratId,
        parkourId
      );

    if (joinUserParkourNote && joinUserParkourNote.commentaire == commentaire) {
      // supprime la note
      await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
        malfratId,
        parkourId
      );
    }

    await new ReportService().modifyStatusReport(
      reportId,
      ReportStatus.SUPPRIME
    );

    // ajoute 1 nbReportValide à ce user
    await new ReportService().addOneReportValideForUser(malfratId);

    returnMessage.message =
      "Vous venez de supprimer le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  // admin sur malfrat comm - delete sans passer par report
  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteNoteAndAddOneReportValideAndCreateReport(
    @Arg("malfratId") malfratId: string,
    @Arg("parkourId") parkourId: number,
    @Ctx() ctx: MyContext,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    if (ctx.user) {
      await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
        malfratId,
        parkourId
      );

      // cré le repport
      await new ReportService().createDeleteReport(
        malfratId,
        parkourId,
        ctx.user.id,
        commentaire
      );

      // ajoute 1 nbReportValide à ce user
      await new ReportService().addOneReportValideForUser(malfratId);

      returnMessage.message =
        "Vous venez de supprimer le message d'un utilisateur";
      returnMessage.success = true;
    }

    return returnMessage;
  }

  // admin sur malfrat compte
  // @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteUserByAdmin(@Arg("malfratId") malfratId: string) {
    const returnMessage = new MessageEntity();

    const user = await new UserService().getUserById(malfratId);
    // (possiblement garder son email pour ne pas le revoir)
    await new UserService().deleteUser(user);

    returnMessage.message = "Vous venez de supprimer un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }
}
