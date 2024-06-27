import { MoreThanOrEqual, Repository } from "typeorm";
import datasource from "../lib/datasource";

import UserEntity from "../entities/user.entity";
import UserService from "./user.service";
import { ReportStatus } from "../enum/reportStatus.enum";
import { ReportEntity } from "../entities/reportEntity.entity";

class ReportService {
  db: Repository<ReportEntity>;
  dbUser: Repository<UserEntity>;

  constructor() {
    this.db = datasource.getRepository(ReportEntity);
    this.dbUser = datasource.getRepository(UserEntity);
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

  async getUsersWithReports() {
    const users: UserEntity[] | null = await this.dbUser.find({
      where: { nbReportValide: MoreThanOrEqual(1) },
    });

    return users;
  }

  // pour delete / modify one
  async getReportByReportId(reportId: number) {
    const report: ReportEntity | null = await this.db.findOne({
      where: {
        id: reportId,
      },
    });

    if (!report) {
      throw new Error("Pas de report (bizarre)");
    }

    return report;
  }

  async isReportExist(
    malfratId: string,
    parkourId: number,
    commentaire: string
  ) {
    const report: ReportEntity | null = await this.db.findOne({
      where: {
        malfrat_id: malfratId,
        parkour_id: parkourId,
        commentaireEnFaute: commentaire,
      },
    });

    if (report) {
      return true;
    }

    return false;
  }

  // ---

  // création du report
  async reportNoteByUserIdAndParkourId(
    malfratId: string,
    parkourId: number,
    reporterId: string,
    commentaire: string
  ) {
    const data = {
      malfrat_id: malfratId,
      parkour_id: parkourId,
      reporter_id: reporterId,
      commentaireEnFaute: commentaire,
    };
    const newReport = this.db.create(data);
    await this.db.save(newReport);
    return newReport;
  }

  // quand l'admin delete directement un comm
  async createDeleteReport(
    malfratId: string,
    parkourId: number,
    reporterId: string,
    commentaire: string
  ) {
    const data = {
      malfrat_id: malfratId,
      parkour_id: parkourId,
      reporter_id: reporterId,
      commentaireEnFaute: commentaire,
      status: ReportStatus.SUPPRIME,
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

  // ---

  async deleteReportByReportId(reportId: number) {
    const report = await new ReportService().getReportByReportId(reportId);

    await this.db.remove(report);
  }

  async modifyStatusReport(reportId: number, status: ReportStatus) {
    const report = await new ReportService().getReportByReportId(reportId);
    report.status = status;

    return await this.db.save(report);
  }

  async addOneReportValideForUser(user_id: string) {
    const user = await new UserService().getUserById(user_id);
    user.nbReportValide += 1;

    await this.dbUser.save(user);
    return user;
  }
}
export default ReportService;
