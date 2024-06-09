import { gql } from "@apollo/client";

// fait aussi la modif
export const CREATE_FAV_JOIN_USER_PARKOUR = gql`
  mutation FavJoinUserParkour($infos: JoinUserParkourFavEntity!) {
    favJoinUserParkour(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "parkour_id": 3,
//     "favoris": false
//   }
// }

export const CREATE_NOTE_JOIN_USER_PARKOUR = gql`
  mutation NoteJoinUserParkour($infos: JoinUserParkourNoteEntity!) {
    noteJoinUserParkour(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "parkour_id": 3,
//     "note": 1.5
//   }
// }
