import { gql } from "@apollo/client";

export const CREATE_PARKOUR = gql`
  mutation CreateParkour($infos: ParkourCreateEntity!) {
    createParkour(infos: $infos) {
      id
      title
    }
  }
`;

// {
//   "infos": {
//     "title": "test",
//     "description": null,
//     "time": null,
//     "length": null,
//     "difficulty": null,
//     "city": null,
//     "start": "0.0",
//     "epreuves": [6,8,22],
//     "images": [
//       {
//         "lien": "aaa",
//         "isCouverture": false
//       }
//     ],
//     "parkourConnect": [1,5]
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
    }
  }
`;

// {
//   "modifyParkourId": 3
//   "infos": {
//     "title": "abc",
//     "description": null,
//     "time": null,
//     "length": null,
//     "difficulty": null,
//     "city": null,
//     "start": null,
//     "epreuves": [6,8,22],
//     "images": [
//       {
//         "lien": "aaa",
//         "isCouverture": false
//       }
//     ],
//     "parkourConnect": [1,5]
//   },
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
