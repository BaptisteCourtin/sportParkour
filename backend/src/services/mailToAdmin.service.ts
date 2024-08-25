import { Repository } from "typeorm";
import datasource from "../lib/datasource";

import MailToAdminEntity, {
  MailToAdminCreateEntity,
} from "../entities/mailToAdmin.entity";

class MailToAdminService {
  db: Repository<MailToAdminEntity>;

  constructor() {
    this.db = datasource.getRepository(MailToAdminEntity);
  }

  async getMailToAdminById(id: number) {
    const mailToAdmin: MailToAdminEntity | null = await this.db.findOne({
      where: { id: id },
    });
    if (!mailToAdmin) {
      throw new Error("Cette épreuve n'existe pas");
    }
    return mailToAdmin;
  }

  async getAllMailToAdmin() {
    const listMailToAdmins: MailToAdminEntity[] | null = await this.db.find();

    return listMailToAdmins;
  }

  // ---

  async createMailToAdmin(data: MailToAdminCreateEntity) {
    const newMailToAdmin: MailToAdminCreateEntity = this.db.create(data);
    await this.db.save(newMailToAdmin);

    return newMailToAdmin;
  }

  async deleteMailToAdmin(id: number) {
    const mailToAdmin: MailToAdminEntity = await this.getMailToAdminById(id);
    return await this.db.remove(mailToAdmin);
  }
}

export default MailToAdminService;
