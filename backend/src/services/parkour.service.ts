import { Between, Like, MoreThanOrEqual, Repository } from "typeorm";
import datasource from "../lib/datasource";

import ParkourEntity, {
  ParkourCreateEntity,
  ParkourUpdateEntity,
  ParkourUpdateNoteEntity,
} from "../entities/parkour.entity";
import EpreuveEntity from "../entities/epreuve.entity";
import ImageParkourEntity from "../entities/imageParkour.entity";

import EpreuveService from "./epreuve.service";

class ParkourService {
  db: Repository<ParkourEntity>;
  dbImage: Repository<ImageParkourEntity>;

  constructor() {
    this.db = datasource.getRepository(ParkourEntity);
    this.dbImage = datasource.getRepository(ImageParkourEntity);
  }

  async getParkourById(id: number) {
    const parkour: ParkourEntity | null = await this.db.findOne({
      where: { id: id },
    });
    if (!parkour) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return parkour;
  }

  async getListParkourByIds(ids?: number[]) {
    // cherche les parkours suivant la table de ids (all si pas de table)
    // prend les images qui ont isCouverture à true
    const listParkours: ParkourEntity[] = await this.db
      .createQueryBuilder("parkour")
      .leftJoinAndSelect(
        "parkour.images",
        "images",
        "images.isCouverture = true"
      )
      .where(ids && ids.length > 0 ? "parkour.id IN (:...ids)" : "1=1", { ids })
      .getMany();

    return listParkours;
  }

  async getParkourWithRelationsById(id: number) {
    const parkour: ParkourEntity | null = await this.db
      .createQueryBuilder("parkour")
      .leftJoinAndSelect("parkour.images", "imagesParkour")

      .leftJoinAndSelect("parkour.notesParkours", "notesParkours")
      .leftJoinAndSelect("notesParkours.user", "user")

      .leftJoinAndSelect("parkour.epreuves", "epreuves")
      .leftJoinAndSelect(
        "epreuves.images",
        "imagesEpreuves",
        "imagesEpreuves.isCouverture = true"
      )

      // Récupérer les connexions où le parkour est parkour_A_id
      .leftJoinAndSelect("parkour.parkourConnect", "connectedParkoursA")
      .leftJoinAndSelect(
        "connectedParkoursA.images",
        "connectedParkourImagesA",
        "connectedParkourImagesA.isCouverture = true"
      )
      // Récupérer les connexions où le parkour est parkour_B_id
      .leftJoinAndSelect("parkour.parkourConnectInverse", "connectedParkoursB")
      .leftJoinAndSelect(
        "connectedParkoursB.images",
        "connectedParkourImagesB",
        "connectedParkourImagesB.isCouverture = true"
      )

      .where("parkour.id = :id", { id })
      .getOne();

    if (!parkour) {
      throw new Error("Ce parkour n'existe pas");
    }

    return parkour;
  }

  async getAllParkourForMap() {
    const parkour: ParkourEntity[] = await this.db.find({});
    if (!parkour) {
      throw new Error("Pas de parkours en stock");
    }
    return parkour;
  }

  async getTop20ParkourByTitle(title?: string) {
    const listParkours: ParkourEntity[] | null = await this.db.find({
      where: title ? [{ title: Like(`%${title}%`) }] : undefined,
      take: 20,
    });

    if (!listParkours) {
      throw new Error("Aucun parkour avec cette recherche");
    }

    return listParkours;
  }

  async getTop20ParkourBySearch(
    triParField: string,
    triParSort: "ASC" | "DESC",

    startPage?: number,
    city?: string,
    lengthMin?: number,
    lengthMax?: number,
    timeMin?: number,
    timeMax?: number,
    difficulty?: string,
    noteMin?: number
  ) {
    const query = this.db
      .createQueryBuilder("parkour")
      .leftJoinAndSelect(
        "parkour.images",
        "image",
        "image.isCouverture = :isCouverture",
        { isCouverture: true }
      )
      .leftJoinAndSelect("parkour.epreuves", "epreuves");

    if (city) {
      query.andWhere("LOWER(parkour.city) LIKE LOWER(:city)", {
        city: `%${city}%`,
      });
    }
    query.andWhere("parkour.length BETWEEN :lengthMin AND :lengthMax", {
      lengthMin,
      lengthMax,
    });
    query.andWhere("parkour.time BETWEEN :timeMin AND :timeMax", {
      timeMin,
      timeMax,
    });
    if (difficulty) {
      query.andWhere("parkour.difficulty = :difficulty", { difficulty });
    }
    if (noteMin) {
      query.andWhere("parkour.note >= :noteMin", { noteMin });
    }

    // tri si nom => gérer les accents
    // PostgreSQL offre un excellent support pour les collations internationales via ICU (International Components for Unicode).
    // Nous utilisons la collation "fr-FR-x-icu" qui est spécifique au français et gère correctement les accents et la casse.
    // Assurez-vous que votre base de données PostgreSQL est configurée pour utiliser UTF-8 comme encodage par défaut.
    if (triParField === "name" || triParField === "city") {
      // Pour les champs textuels, utilisez la collation française
      query.orderBy(`parkour.${triParField} COLLATE "fr-FR-x-icu"`, triParSort);
    } else {
      // Pour les autres champs, gardez le tri normal
      query.orderBy(`parkour.${triParField}`, triParSort);
    }
    query.skip(startPage || 0).take(20);

    const listParkours = await query.getMany();

    return listParkours;
  }

  async getTheParkourTotalForSearch(
    city?: string,
    lengthMin?: number,
    lengthMax?: number,
    timeMin?: number,
    timeMax?: number,
    difficulty?: string,
    noteMin?: number
  ) {
    const whereConditions: any = {};

    if (city) {
      whereConditions.city = Like(`%${city}%`);
    }
    whereConditions.time = Between(timeMin, timeMax);
    whereConditions.length = Between(lengthMin, lengthMax);
    if (difficulty) {
      whereConditions.difficulty = difficulty;
    }
    if (noteMin) {
      whereConditions.note = MoreThanOrEqual(noteMin);
    }

    const totalCount: number | null = await this.db.count({
      where: whereConditions,
    });

    return totalCount;
  }

  // ---

  async addOneNoteByParkourId(parkourId: number, note: number) {
    const parkour: ParkourEntity = await this.getParkourById(parkourId);

    const newNbVote = parkour.nbVote + 1;
    const newNote = (parkour.note * parkour.nbVote + note) / newNbVote;

    const data: ParkourUpdateNoteEntity = {
      nbVote: newNbVote,
      note: newNote,
    };

    const newInfos: ParkourEntity = this.db.merge(parkour, data);
    await this.db.save(newInfos);
  }

  async changeOneNoteByParkourId(
    ancienneNoteUser: number,
    parkourId: number,
    newNoteUser: number
  ) {
    const parkour: ParkourEntity = await this.getParkourById(parkourId);

    const newNoteParkour =
      (parkour.note * parkour.nbVote - ancienneNoteUser + newNoteUser) /
      parkour.nbVote;

    const data: ParkourUpdateNoteEntity = {
      nbVote: parkour.nbVote,
      note: newNoteParkour,
    };

    const newInfos: ParkourEntity = this.db.merge(parkour, data);
    await this.db.save(newInfos);
  }

  async deleteOneNoteByParkourId(ancienneNoteUser: number, parkourId: number) {
    const parkour: ParkourEntity = await this.getParkourById(parkourId);
    let newNoteParkour: number = 0;

    const newNbVote = parkour.nbVote - 1;
    if (newNbVote != 0) {
      newNoteParkour =
        (parkour.note * parkour.nbVote - ancienneNoteUser) / newNbVote;
    }

    const data: ParkourUpdateNoteEntity = {
      nbVote: newNbVote,
      note: newNoteParkour,
    };

    const newInfos: ParkourEntity = this.db.merge(parkour, data);
    await this.db.save(newInfos);
  }

  // ---

  async createParkour(data: ParkourCreateEntity) {
    let epreuves: EpreuveEntity[] = [];
    if (data.epreuves?.length) {
      epreuves = await new EpreuveService().getListEpreuveByIds(data.epreuves);
    }

    let connectedParkours: ParkourEntity[] = [];
    if (data.parkourConnect?.length) {
      connectedParkours = await new ParkourService().getListParkourByIds(
        data.parkourConnect
      );
    }

    const newParkour: ParkourEntity = this.db.create({
      ...data,
      epreuves,
      parkourConnect: connectedParkours,
    });
    await this.db.save(newParkour);

    if (data.images && data.images.length > 0) {
      for (const imageData of data.images) {
        const newImage = this.dbImage.create({
          ...imageData,
          parkour_id: newParkour,
        });
        await this.dbImage.save(newImage);
      }
    }

    return newParkour;
  }

  async modifyParkour(id: number, data: ParkourUpdateEntity) {
    const parkour: ParkourEntity = await this.getParkourById(id);

    for (const key of Object.keys(data) as Array<keyof ParkourUpdateEntity>) {
      if (
        data[key] !== null &&
        key !== "epreuves" &&
        key !== "images" &&
        key !== "deletedImageIds" &&
        key !== "parkourConnect"
      ) {
        (parkour as any)[key] = data[key];
      }
    }

    // si il y a qqch dans le tableau, les ajout et suppressiosn se font.
    // si le tableau est vide => tout est supprimé
    // Gérer les relations avec epreuves
    if (data.epreuves !== null && data.epreuves.length > 0) {
      const epreuveIds = data.epreuves;
      parkour.epreuves = await new EpreuveService().getListEpreuveByIds(
        epreuveIds
      );
    } else if (data.epreuves?.length == 0) {
      parkour.epreuves = [];
    }

    // Gérer les connexions entre Parkours
    if (data.parkourConnect !== null && data.parkourConnect.length > 0) {
      if (data.parkourConnect.length > 0) {
        const parkourConnectIds = data.parkourConnect;
        parkour.parkourConnect = [];
        parkour.parkourConnectInverse =
          await new ParkourService().getListParkourByIds(parkourConnectIds);
      } else if (data.epreuves?.length == 0) {
        parkour.parkourConnect = [];
        parkour.parkourConnectInverse = [];
      }
    }

    await this.db.save(parkour);

    // Gérer les images
    if (data.images || data.deletedImageIds) {
      // Supprimer les images si nécessaire
      if (data.deletedImageIds && data.deletedImageIds.length > 0) {
        await this.dbImage.delete(data.deletedImageIds);
      }

      // Ajouter les images
      if (data.images && data.images.length > 0) {
        for (const imageData of data.images) {
          // Création d'une nouvelle image
          const newImage = this.dbImage.create({
            ...imageData,
            parkour_id: parkour,
          });
          await this.dbImage.save(newImage);
        }
      }
    }

    return parkour;
  }

  async deleteParkour(id: number) {
    const parkour: ParkourEntity = await this.getParkourById(id);
    // pour sup les relations epreuves
    parkour.epreuves = [];
    await this.db.save(parkour);

    return await this.db.remove(parkour);
  }
}

export default ParkourService;
