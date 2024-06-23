import { gql } from "@apollo/client";

export const GET_FAV_BY_TOKEN_AND_ID_PARKOUR = gql`
  query GetUserFavByTokenAndParkourId($parkourId: Float!) {
    getUserFavByTokenAndParkourId(parkourId: $parkourId)
  }
`;

// {
//   "parkourId": 3
// }

export const GET_ALL_FAV_BY_TOKEN = gql`
  query GetAllUserFavByToken {
    getAllUserFavByToken {
      parkour {
        id
        title
        time
        length
        difficulty
        city
        note
        nbVote
        images {
          id
          lien
        }
        epreuves {
          id
          title
        }
      }
    }
  }
`;
