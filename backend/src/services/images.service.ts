import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import ImageEpreuveEntity from "../entities/imageEpreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";

class ImagesService {
  dbImgEpreuve: Repository<ImageEpreuveEntity>;
  dbImgParkour: Repository<ImageParkourEntity>;

  constructor() {
    this.dbImgEpreuve = datasource.getRepository(ImageEpreuveEntity);
    this.dbImgParkour = datasource.getRepository(ImageParkourEntity);
  }

  async getImageEpreuveById(id: number) {
    const imgEpreuve: ImageEpreuveEntity | null =
      await this.dbImgEpreuve.findOne({
        where: { id: id },
      });

    return imgEpreuve;
  }

  async modifyImageCouvertureEpreuve(idImage: number) {
    let image = await this.getImageEpreuveById(+idImage);
    if (image) {
      image.isCouverture = !image.isCouverture;
      return await this.dbImgEpreuve.save(image);
    }

    return null;
  }

  // ---

  async getImageParkourById(id: number) {
    const imgParkour: ImageParkourEntity | null =
      await this.dbImgParkour.findOne({
        where: { id: id },
      });

    return imgParkour;
  }

  async modifyImageCouvertureParkour(idImage: number) {
    let image = await this.getImageParkourById(+idImage);

    if (image) {
      image.isCouverture = !image.isCouverture;
      return await this.dbImgParkour.save(image);
    }
    return null;
  }
}

export default ImagesService;
