import { gql } from "@apollo/client";

export const GET_EMAIL_TO_ADMIN_BY_ID = gql`
  query GetMailToAdminById($getMailToAdminByIdId: Float!) {
    getMailToAdminById(id: $getMailToAdminByIdId) {
      id
      sujet
      name
      firstname
      emailUser
      messageToAdmin
    }
  }
`;

// {
//   "getMailToAdminByIdId": 1
// }

export const GET_ALL_EMAIL_TO_ADMIN = gql`
  query GetAllMailToAdmin {
    getAllMailToAdmin {
      id
      sujet
      name
      firstname
      emailUser
      messageToAdmin
    }
  }
`;
