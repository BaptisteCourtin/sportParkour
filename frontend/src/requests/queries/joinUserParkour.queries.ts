import { gql } from "@apollo/client";

export const GET_FAV_BY_EMAIL = gql`
  query GetUserFavByEmail($email: String!) {
    getUserFavByEmail(email: $email) {
      parkour_id
      note
      favoris
      parkours {
        id
        title
      }
    }
  }
`;

// {
//   "email": "bap2910@gmail.com"
// }
