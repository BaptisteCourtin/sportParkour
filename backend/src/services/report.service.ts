import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import JoinUserParkourNoteEntity from "../entities/joinUserParkourNote.entity";
import UserEntity, { UserUpdateEntity } from "../entities/user.entity";
import UserService from "./user.service";

class ReportService {
  dbUser: Repository<UserEntity>;
  dbJoinNote: Repository<JoinUserParkourNoteEntity>;

  constructor() {
    this.dbUser = datasource.getRepository(UserEntity);
    this.dbJoinNote = datasource.getRepository(JoinUserParkourNoteEntity);
  }

  async addOneReportForUser(user_id: string) {
    const user = await new UserService().getUserById(user_id);

    const newNbReport = user.nbReport + 1;

    const data: UserUpdateEntity = {
      nbReport: newNbReport,
    };

    const newInfos = this.dbUser.merge(user, data);
    await this.dbUser.save(newInfos);

    return newNbReport;
  }
}
export default ReportService;
