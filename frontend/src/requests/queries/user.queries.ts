import { gql } from "@apollo/client";

export const GET_USER_BY_TOKEN = gql`
  query GetUserByToken {
    getUserByToken {
      id
      name
      firstname
      email
      city
      codePostal
      phone
      imageProfil
      nbReportValide
    }
  }
`;

export const IS_ADMIN = gql`
  query IsAdmin {
    isAdmin
  }
`;

export const IS_CLIENT = gql`
  query IsClient {
    isClient
  }
`;
