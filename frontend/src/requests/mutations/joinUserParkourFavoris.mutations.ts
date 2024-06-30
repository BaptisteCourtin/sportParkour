import { gql } from "@apollo/client";

// fait aussi la modif
export const CREATE_FAV_JOIN_USER_PARKOUR = gql`
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

export const DELETE_FAV_JOIN_USER_PARKOUR = gql`
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
