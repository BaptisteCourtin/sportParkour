import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      firstname
      email
      city
      codePostal
      phone
      parkours {
        user_id
        parkour_id
        favoris
        note
        parkours {
          id
          title
        }
      }
    }
  }
`;

// {
//   "email": "bap2910@gmail.com"
// }
