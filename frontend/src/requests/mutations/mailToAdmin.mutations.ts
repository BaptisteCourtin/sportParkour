import { gql } from "@apollo/client";

export const CREATE_MAIL_TO_ADMIN = gql`
  mutation CreateMailToAdmin($infos: MailToAdminCreateEntity!) {
    createMailToAdmin(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "sujet": "EPREUVE",
//     "name": "test",
//     "firstname": "test2",
//     "emailUser": "oui@oui.fr",
//     "messageToAdmin": "aaaaaaaaaaaaaaaaaaa"
//   }
// }

export const DELETE_MAIL_TO_ADMIN = gql`
  mutation DeleteMailToAdmin($deleteMailToAdminId: Float!) {
    deleteMailToAdmin(id: $deleteMailToAdminId) {
      message
      success
    }
  }
`;

// {
//   "deleteMailToAdminId": 6
// }
