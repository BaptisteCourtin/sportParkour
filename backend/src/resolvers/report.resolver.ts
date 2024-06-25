import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MessageEntity } from "../entities/message.entity";
import JoinUserParkourNoteService from "../services/joinUserParkourNote.service";
import ReportService from "../services/report.service";
import UserService from "../services/user.service";
import { MyContext } from "..";
import UserEntity from "../entities/user.entity";
import { ReportStatus } from "../enum/reportStatus.enum";
import { ReportEntity } from "../entities/reportEntity.entity";

@Resolver()
export default class ReportResolver {
  // page user by admin
  // @Authorized("ADMIN")
  @Query(() => UserEntity)
  async getUserByIdForPageReport(@Arg("userId") userId: string) {
    const result = await new ReportService().getUserByIdForPageReport(userId);

    return result;
  }

  // page search reports
  // @Authorized("ADMIN")
  @Query(() => [ReportEntity])
  async getReportsBySearch(@Arg("status") status: ReportStatus) {
    const result: ReportEntity[] = await new ReportService().getReportsBySearch(
      status
    );
    return result;
  }

  // ---

  // user sur malfrat comm
  // @Authorized("CLIENT")
  @Mutation(() => MessageEntity)
  async reportNote(
    @Arg("malfrat_id") malfrat_id: string,
    @Arg("parkour_id") parkour_id: number,
    @Ctx() ctx: MyContext,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    if (ctx.user) {
      // cré le report
      await new ReportService().reportNoteByUserIdAndParkourId(
        malfrat_id,
        parkour_id,
        ctx.user.id,
        commentaire
      );

      // ajoute 1 au nb de report ajoutés par le user
      await new ReportService().addOneNbReportAjouteByToken(ctx.user);

      returnMessage.message =
        "Vous venez de reporter le message d'un utilisateur";
      returnMessage.success = true;
    }

    return returnMessage;
  }

  // admin sur malfrat comm - laisse
  // @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async letNoteFromReport(
    @Arg("user_id") malfrat_id: string,
    @Arg("parkour_id") parkour_id: number
  ) {
    const returnMessage = new MessageEntity();

    // on laisse le comm => on enlève les reports (c'est tout)
    await new ReportService().deleteReportsByUserIdAndParkourId(
      malfrat_id,
      parkour_id
    );

    returnMessage.message = "Vous venez de laisser le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  // admin sur malfrat comm - laisse (car modifié ou supprimé) mais ajoute un reportValide sur le user
  // @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async addOneReportValideFromReport(
    @Arg("user_id") malfrat_id: string,
    @Arg("parkour_id") parkour_id: number,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    // ajoute 1 nbReportValide à ce user
    await new ReportService().addOneReportValideForUser(malfrat_id);

    // pour éviter les doublons
    await new ReportService().keepOnlyOneReport(
      malfrat_id,
      parkour_id,
      commentaire
    );
    await new ReportService().modifyStatusReport(
      malfrat_id,
      parkour_id,
      ReportStatus.VU_ET_LAISSE_MODIF
    );

    returnMessage.message =
      "Vous venez de laisser le message d'un utilisateur mais ajouté un report sur son profil";
    returnMessage.success = true;

    return returnMessage;
  }

  // admin sur malfrat comm - delete
  // @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteNoteFromReport(
    @Arg("user_id") malfrat_id: string,
    @Arg("parkour_id") parkour_id: number,
    @Arg("commentaire") commentaire: string
  ) {
    const returnMessage = new MessageEntity();

    // supprime la note
    await new JoinUserParkourNoteService().deleteNoteByUserIdAndParkourId(
      malfrat_id,
      parkour_id
    );

    // ajoute 1 nbReportValide à ce user
    await new ReportService().addOneReportValideForUser(malfrat_id);

    // pour éviter les doublons (ne marche pas de mettre un flag sur le joinNote)
    await new ReportService().keepOnlyOneReport(
      malfrat_id,
      parkour_id,
      commentaire
    );
    await new ReportService().modifyStatusReport(
      malfrat_id,
      parkour_id,
      ReportStatus.VU_ET_SUPPRIME
    );

    returnMessage.message =
      "Vous venez de supprimer le message d'un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }

  // admin sur malfrat compte
  // @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteUserByReport(@Arg("user_id") malfrat_id: string) {
    const returnMessage = new MessageEntity();

    const user = await new UserService().getUserById(malfrat_id);
    // (possiblement garder son email pour ne pas le revoir)
    await new ReportService().supprimeAllReportsByUserId(malfrat_id);
    await new UserService().deleteUser(user);

    returnMessage.message = "Vous venez de supprimer un utilisateur";
    returnMessage.success = true;

    return returnMessage;
  }
}
