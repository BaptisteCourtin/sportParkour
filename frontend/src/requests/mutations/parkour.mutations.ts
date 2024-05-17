import { gql } from "@apollo/client";

export const CREATE_EPREUVE = gql`
  mutation CreateParkour($infos: ParkourCreateEntity!) {
    createParkour(infos: $infos) {
      id
      title
      description
      time
      length
      difficulty
      city
      start
      note
      nbVote
      epreuves {
        id
        title
      }
      images {
        id
        lien
      }
    }
  }
`;

// {
//   "infos": {
//     "title": "vebvre",
//     "description": "'btrbrtbv",
//     "time": null,
//     "length": null,
//     "difficulty": null,
//     "city": null,
//     "start": "reverver",
//     "note": null,
//     "nbVote": null,
//     "epreuves": [1,2,3,4,5]
//   }
// }
