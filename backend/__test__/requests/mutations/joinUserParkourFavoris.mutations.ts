// fait aussi la modif
export const CREATE_FAV_JOIN_USER_PARKOUR = `#graphql
  mutation CreateJoinUserParkourFavoris($parkourId: Float!) {
    createJoinUserParkourFavoris(parkourId: $parkourId) {
      message
      success
    }
  }
`;

// {
//   "parkourId": 4
// }

export const DELETE_FAV_JOIN_USER_PARKOUR = `#graphql
  mutation DeleteJoinUserParkourFavoris($parkourId: Float!) {
    deleteJoinUserParkourFavoris(parkourId: $parkourId) {
      message
      success
    }
  }
`;

// {
//   "parkourId": 4
// }
