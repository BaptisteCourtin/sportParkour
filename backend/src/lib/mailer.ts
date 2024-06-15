import { Client, SendEmailV3_1, LibraryResponse } from "node-mailjet";
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

const mailjet = new Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
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
    // console.log(this.userEmail, this.subject, this.resetLink); // OK

    // console.log(mailjet);
    // e {
    //   version: '6.0.5',
    //   config: { host: 'api.mailjet.com', version: 'v3', output: 'json' },
    //   options: {},
    //   apiKey: '025ad3132d75152d0b76f5d25d0a7f1b',
    //   apiSecret: 'cc5928d9b6f71f9a69db2f8cd71df484'
    // }

    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: "kevin75du75@gmail.com",
            Name: "Baptiste",
          },
          To: [
            {
              Email: "kevin75du75@gmail.com",
              Name: "Baptiste",
            },
          ],
          Subject: "Greetings from Mailjet.",
          TextPart: "My first Mailjet email",
          HTMLPart:
            "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          CustomID: "AppGettingStartedTest",
        },
      ],
    };

    try {
      const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
        .post("send", { version: "v3.1" })
        .request(data);
    } catch (error) {
      console.log(error);
    }

    // const { Status } = result.body.Messages[0];
  }
}
