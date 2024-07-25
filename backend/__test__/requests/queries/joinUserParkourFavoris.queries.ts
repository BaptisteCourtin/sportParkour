export const GET_FAV_BY_TOKEN_AND_ID_PARKOUR = `#graphql
  query GetUserFavByTokenAndParkourId($parkourId: Float!) {
    getUserFavByTokenAndParkourId(parkourId: $parkourId)
  }
`;

// {
//   "parkourId": 3
// }

export const GET_ALL_FAV_BY_TOKEN = `#graphql
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
