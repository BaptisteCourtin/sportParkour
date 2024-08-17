import { Arg, Mutation, Query, Resolver } from "type-graphql";

import MessageEntity from "../entities/message.entity";
import ResetPasswordEntity, {
  ResetPasswordUpdateEntity,
} from "../entities/resetPassword.entity";
import UserEntity from "../entities/user.entity";

import ResetPasswordService from "../services/resetPassword.service";
import UserService from "../services/user.service";

// pas de @auth car non connecté
@Resolver()
export default class ResetPasswordResolver {
  // utilisé sur resetPassword
  // générer un token
  @Mutation(() => ResetPasswordEntity)
  async resetPassword(@Arg("email") email: string) {
    // vérification email
    const user: UserEntity = await new UserService().getUserByEmail(email);
    if (!user) {
      throw new Error("Cet email n'existe pas");
    }

    const resetToken = await new ResetPasswordService().createResetToken(user);
    return resetToken;
  }

  // utilisé sur [token]
  @Query(() => MessageEntity)
  async checkResetTokenValidity(@Arg("token") token: string) {
    const success = await new ResetPasswordService().checkResetTokenValidity(
      token
    );

    const message = new MessageEntity();
    message.message = "Check du token";
    message.success = success;

    return message;
  }

  // utilisé sur [token]
  @Mutation(() => MessageEntity)
  async changePassword(@Arg("data") data: ResetPasswordUpdateEntity) {
    const message = new MessageEntity();

    const resetToken = await new ResetPasswordService().checkResetTokenValidity(
      data.token
    );
    if (!resetToken) {
      message.message = "Votre token n'est plus valable";
      message.success = false;
    } else {
      const tokenInfos = await new ResetPasswordService().findResetToken(
        data.token
      );

      if (tokenInfos) {
        const user = tokenInfos.user;
        const userModified = await new ResetPasswordService().changePassword(
          data.password,
          user
        );

        await new ResetPasswordService().deleteResetToken(data.token);

        message.message = "Votre mot de passe a été changé, reconnectez vous";
        message.success = true;
      }
    }
    return message;
  }
}
