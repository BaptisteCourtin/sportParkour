import { gql } from "@apollo/client";

export const GET_FAV_BY_EMAIL = gql`
  query GetUserFavByToken {
    getUserFavByToken {
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
