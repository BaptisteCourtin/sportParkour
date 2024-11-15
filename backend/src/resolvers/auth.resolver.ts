import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";

import MessageEntity from "../entities/message.entity";
import {
  UserInputRegisterEntity,
  UserInputAuthEntity,
} from "../entities/user.entity";

import AuthService from "../services/auth.service";

const argon2 = require("argon2");
import { SignJWT } from "jose";
import Cookies from "cookies";

@Resolver()
export default class AuthResolver {
  // enregistrement du user (la première fois)
  @Mutation(() => MessageEntity)
  async inscription(@Arg("infos") infos: UserInputRegisterEntity) {
    let user = await new AuthService().findUserByEmailOrNull(infos.email);

    // vérification email
    if (user) {
      throw new Error("Cet email est déjà utilisé. Tu nous as oublié 😭?");
    }

    const newUser = await new AuthService().createUser(infos);
    const returnMessage = new MessageEntity();

    // meassage de retour si bien create
    if (newUser) {
      returnMessage.message =
        "Bien joué! Vous avez maintenant un compte chez nous!";
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Euuuuuuh petit problème... Je suis confu 😕 (aïe)";
      returnMessage.success = false;
    }
    return returnMessage;
  }

  // --------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------

  // login du user
  @Query(() => MessageEntity)
  async authentification(
    @Ctx() ctx: MyContext,
    @Arg("infos") infos: UserInputAuthEntity
  ) {
    const returnMessage = new MessageEntity();
    let token: string | undefined;

    let user = await new AuthService().findUserByEmailOrNull(infos.email);

    // vérification email
    if (!user) {
      returnMessage.message =
        "Mot de passe ou email pas bon. Mais on te dira pas lequel 😁!!!";
      returnMessage.success = false;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Attend 1 seconde

      return returnMessage;
    }

    // vérification mdp
    if (await argon2.verify(user.password, infos.password)) {
      // console.log("ENV : ", process.env.JWT_EXPIRATION_TIME);
      // console.log("ENV : ", process.env.SECRET_KEY);

      token = await new SignJWT({
        email: user.email,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime(`${process.env.JWT_EXPIRATION_TIME}`)
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("tokenParkour", token, { httpOnly: true }); // mettre à true = sécurité

      returnMessage.message = "Salut! Viens parkourir le monde !";
      returnMessage.success = true;
    } else {
      returnMessage.message =
        "Mot de passe ou email pas bon. Mais on te dira pas lequel 😁!!!";
      returnMessage.success = false;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Attend 1 seconde
    }

    return returnMessage;
  }

  // --------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------

  // logout du user
  @Query(() => MessageEntity)
  async logout(@Ctx() ctx: MyContext) {
    let cookies = new Cookies(ctx.req, ctx.res);
    cookies.set("tokenParkour"); //sans valeur, le cookie sera supprimé

    const returnMessage = new MessageEntity();
    returnMessage.message =
      "Vous avez été déconnecté. Vous reviendrez? please 🥹";
    returnMessage.success = true;

    return returnMessage;
  }
}
