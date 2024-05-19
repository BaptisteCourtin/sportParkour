import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      firstname
      email
      adress
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
