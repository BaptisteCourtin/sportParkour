import { gql } from "@apollo/client";

// fait aussi la modif
export const CREATE_FAV_JOIN_USER_PARKOUR = gql`
  mutation CreateFavJoinUserParkour($infos: JoinUserParkourCreateEntity!) {
    createFavJoinUserParkour(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "parkour_id": 3,
//     "note": 1.5 | null,
//     "favoris": false
//   }
// }

export const CREATE_NOTE_JOIN_USER_PARKOUR = gql`
  mutation CreateNoteJoinUserParkour($infos: JoinUserParkourCreateEntity!) {
    createNoteJoinUserParkour(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "parkour_id": 3,
//     "note": 1.5 | null,
//     "favoris": false
//   }
// }
