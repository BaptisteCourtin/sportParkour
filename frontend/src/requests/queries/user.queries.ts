import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: String!) {
    getUserById(id: $getUserByIdId) {
      id
      password
      name
      firstname
      email
      city
      codePostal
      phone
      role
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
//   "getUserByIdId": "41842629-d707-4e75-ade3-1e559ef21cc0"
// }
