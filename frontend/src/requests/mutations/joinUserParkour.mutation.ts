import { gql } from "@apollo/client";

// fait aussi la modif
export const CREATE_JOIN_USER_PARKOUR = gql`
  mutation CreateJoinUserParkour($infos: JoinUserParkourCreateEntity!) {
    createJoinUserParkour(infos: $infos) {
      user_id
      parkour_id
      note
      favoris
    }
  }
`;

// {
//   "infos": {
//     "user_id": "41842629-d707-4e75-ade3-1e559ef21cc0",
//     "parkour_id": 3,
//     "note": 1.5,
//     "favoris": false
//   }
// }
