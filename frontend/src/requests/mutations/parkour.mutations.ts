import { gql } from "@apollo/client";

export const CREATE_PARKOUR = gql`
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
`;

// {
//   "infos": {
//     "title": "abc",
//     "description": null,
//     "time": null,
//     "length": null,
//     "difficulty": null,
//     "city": null,
//     "start": "0",
//     "note": null,
//     "nbVote": null,
//     "epreuves": []
//   }
// }

export const MODIFY_PARKOUR = gql`
  mutation ModifyParkour(
    $infos: ParkourUpdateEntity!
    $modifyParkourId: Float!
  ) {
    modifyParkour(infos: $infos, id: $modifyParkourId) {
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
`;

// {
//   "infos": {
//     "title": "abc",
//     "description": null,
//     "time": null,
//     "length": null,
//     "difficulty": null,
//     "city": null,
//     "start": null,
//     "note": null,
//     "nbVote": null,
//     "epreuves": []
//   },
// "modifyParkourId": 3
// }

export const DELETE_PARKOUR = gql`
  mutation DeleteParkour($deleteParkourId: Float!) {
    deleteParkour(id: $deleteParkourId) {
      message
      success
    }
  }
`;

// {
//   "deleteParkourId": 10
// }
