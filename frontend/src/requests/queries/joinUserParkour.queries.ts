import { gql } from "@apollo/client";

export const GET_FAV_BY_TOKEN_AND_ID_PARKOUR = gql`
  query GetUserFavByTokenAndIdParkour($parkourId: Float!) {
    getUserFavByTokenAndIdParkour(parkourId: $parkourId) {
      note
      favoris
    }
  }
`;

// {
//   "parkourId": 3
// }

export const GET_FAV_BY_TOKEN = gql`
  query GetAllUserFavByToken {
    getAllUserFavByToken {
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
