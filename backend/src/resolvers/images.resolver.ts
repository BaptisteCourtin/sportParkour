import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { MessageEntity } from "../entities/message.entity";
import ImageEpreuveEntity from "../entities/imageEpreuve.entity";
import ImagesService from "../services/images.service";
import ImageParkourEntity from "../entities/imageParkour.entity";

@Resolver()
export default class ImagesResolver {
  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async modifyImageCouvertureEpreuve(@Arg("idImage") idImage: number) {
    const returnMessage = new MessageEntity();

    const result: ImageEpreuveEntity | null =
      await new ImagesService().modifyImageCouvertureEpreuve(idImage);

    if (result) {
      returnMessage.message = "Les images ont été mis à jour";
      returnMessage.success = true;
    } else {
      returnMessage.message = "un pb est survenu";
      returnMessage.success = false;
    }
    return returnMessage;
  }

  // ---

  @Authorized("ADMIN")
  @Mutation(() => MessageEntity)
  async modifyImageCouvertureParkour(@Arg("idImage") idImage: number) {
    const returnMessage = new MessageEntity();

    const result: ImageParkourEntity | null =
      await new ImagesService().modifyImageCouvertureParkour(idImage);

    if (result) {
      returnMessage.message = "Les images ont été mis à jour";
      returnMessage.success = true;
    } else {
      returnMessage.message = "un pb est survenu";
      returnMessage.success = false;
    }
    return returnMessage;
  }
}
