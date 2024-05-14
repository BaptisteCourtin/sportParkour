import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($getUserId: String!) {
    getUser(id: $getUserId) {
      adress
      email
      firstname
      id
      name
      password
      phone
      role
    }
  }
`;
