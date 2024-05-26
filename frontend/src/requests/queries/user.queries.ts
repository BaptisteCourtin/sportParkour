import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      firstname
      email
      city
      codePostal
      phone
      parkours {
        note
        parkour_id
        favoris
        user_id
        parkours {
          id
          title
        }
      }
    }
  }
`;

// {
//   "getEpreuveId": 10
// }
