import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($getUserId: String!) {
    getUser(id: $getUserId) {
      adress
      email
      firstname
      id
      name
      phone
      role
      parkours {
        id
        title
      }
    }
  }
`;
