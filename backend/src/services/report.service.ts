import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourNoteEntity from "../entities/joinUserParkourNote.entity";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import UserService from "./user.service";
import { ReportStatus } from "../enum/reportStatus.enum";
import { ReportEntity } from "../entities/reportEntity.entity";

class ReportService {
  db: Repository<ReportEntity>;
  dbUser: Repository<UserEntity>;
  dbJoinNote: Repository<JoinUserParkourNoteEntity>;

  constructor() {
    this.db = datasource.getRepository(ReportEntity);
    this.dbUser = datasource.getRepository(UserEntity);
    this.dbJoinNote = datasource.getRepository(JoinUserParkourNoteEntity);
  }

  // pour report idUser
  async getUserByIdForPageReport(userId: string) {
    const user: UserEntity | null = await this.dbUser.findOne({
      where: { id: userId },
      relations: [
        "notesParkours.parkour",
        "reports.reporter",
        "reports.parkour",
      ],
    });

    return user;
  }

  async getReportsBySearch(status: ReportStatus) {
    const reports: ReportEntity[] | null = await this.db.find({
      where: { status: status },
      relations: ["reporter", "malfrat", "parkour"],
    });

    return reports;
  }

  // ---

  async reportNoteByUserIdAndParkourId(
    malfrat_id: string,
    parkour_id: number,
    reporter_id: string,
    commentaire: string
  ) {
    const data = {
      malfrat_id: malfrat_id,
      parkour_id: parkour_id,
      reporter_id: reporter_id,
      commentaireEnFaute: commentaire,
    };
    const newReport = this.db.create(data);
    await this.db.save(newReport);
    return newReport;
  }

  // ajoute un nbReportAjoute au reporteur
  async addOneNbReportAjouteByToken(reporterUser: UserEntity) {
    const editedUser = this.dbUser.create({ ...reporterUser });
    editedUser.nbReportAjoute += 1;

    return await this.dbUser.save(editedUser);
  }

  async deleteReportsByUserIdAndParkourId(user_id: string, parkour_id: number) {
    // ...
  }

  async addOneReportValideForUser(user_id: string) {
    // const user = await new UserService().getUserById(user_id);
    // const newNbReport = user.nbReportValide + 1;
    // const data: UserUpdateEntity = {
    //   nbReportValide: newNbReport,
    // };
    // const newInfos = this.dbUser.merge(user, data);
    // await this.dbUser.save(newInfos);
    // return newNbReport;
  }

  async keepOnlyOneReport(
    user_id: string,
    parkour_id: number,
    commentaire: string
  ) {
    // ...
  }

  async modifyStatusReport(
    user_id: string,
    parkour_id: number,
    status: ReportStatus
  ) {
    // ...
  }

  async supprimeAllReportsByUserId(user_id: string) {
    // ...
  }
}
export default ReportService;
