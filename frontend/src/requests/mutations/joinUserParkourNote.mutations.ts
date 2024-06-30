import { gql } from "@apollo/client";

export const CREATE_NOTE_JOIN_USER_PARKOUR = gql`
  mutation CreateJoinUserParkourNote($infos: JoinUserParkourNoteCreateEntity!) {
    createJoinUserParkourNote(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "parkour_id": 46,
//     "note": 3,
//     "commentaire": "fazfa"
//   }
// }

export const DELETE_NOTE_JOIN_USER_PARKOUR = gql`
  mutation DeleteJoinUserParkourNote($parkourId: Float!) {
    deleteJoinUserParkourNote(parkourId: $parkourId) {
      message
      success
    }
  }
`;

// {
//   "parkourId": 50
// }
