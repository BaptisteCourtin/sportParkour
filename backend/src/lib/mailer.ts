const nodemailer = require("nodemailer");
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

export default class Mailer {
  userEmail: string;
  subject: string;
  resetLink: string;

  constructor(userEmail: string, subject: string, resetLink: string) {
    this.userEmail = userEmail;
    this.subject = subject;
    this.resetLink = resetLink;
  }

  async sender() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.G_EMAIL,
        pass: process.env.G_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.G_EMAIL,
      to: this.userEmail,
      subject: this.subject,
      html: `<h3>Réinitialisation de mot de passe</h3>
              <p>Voici votre lien pour réinitialiser votre mot de passe</p>
              <a href=${this.resetLink} target="_blank">Cliquez ici</a>
              <p>Si le lien ne marche pas : ${this.resetLink} </p>
              `,
    });
  }
}
