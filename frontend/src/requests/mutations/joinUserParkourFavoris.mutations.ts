import { gql } from "@apollo/client";

// fait aussi la modif
export const CREATE_FAV_JOIN_USER_PARKOUR = gql`
  mutation CreateJoinUserParkourFavoris($idParkour: Float!) {
    createJoinUserParkourFavoris(idParkour: $idParkour) {
      message
      success
    }
  }
`;

// {
//   "idParkour": 4
// }

export const DELETE_FAV_JOIN_USER_PARKOUR = gql`
  mutation DeleteJoinUserParkourFavoris($idParkour: Float!) {
    deleteJoinUserParkourFavoris(idParkour: $idParkour) {
      message
      success
    }
  }
`;

// {
//   "idParkour": 4
// }
