import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";

import MessageEntity from "../entities/message.entity";
import MailToAdminEntity, {
  MailToAdminCreateEntity,
} from "../entities/mailToAdmin.entity";

import MailToAdminService from "../services/mailToAdmin.service";

@Resolver()
export default class MailToAdminResolver {
  @Authorized("ADMIN")
  @Query(() => MailToAdminEntity)
  async getMailToAdminById(@Arg("id") id: number) {
    try {
      const result: MailToAdminEntity =
        await new MailToAdminService().getMailToAdminById(id);
      return result;
    } catch (err) {
      const error = err as Error;
      throw new Error(
        `Erreur lors de la récupération du mail : ${error.message}`
      );
    }
  }

  @Authorized("ADMIN")
  @Query(() => [MailToAdminEntity])
  async getAllMailToAdmin() {
    const result: MailToAdminEntity[] =
      await new MailToAdminService().getAllMailToAdmin();
    return result;
  }

  // ---

  @Mutation(() => MessageEntity)
  async createMailToAdmin(@Arg("infos") data: MailToAdminCreateEntity) {
    const returnMessage = new MessageEntity();

    const newEmailToAdmin = await new MailToAdminService().createMailToAdmin(
      data
    );

    if (newEmailToAdmin) {
      returnMessage.message = `Vous venez de d'envoyer un message à l'admin`;
      returnMessage.success = true;
    } else {
      returnMessage.message = `votre message n'a pas pu être envoyé`;
      returnMessage.success = false;
    }

    return returnMessage;
  }

  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async deleteMailToAdmin(@Arg("id") id: number) {
    const returnMessage = new MessageEntity();

    await new MailToAdminService().deleteMailToAdmin(id);

    returnMessage.message = `Vous venez de supprimer un email`;
    returnMessage.success = true;

    return returnMessage;
  }
}
