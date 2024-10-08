export const CREATE_PARKOUR = `#graphql
  mutation CreateParkour($infos: ParkourCreateEntity!) {
    createParkour(infos: $infos) {
      id
      title
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

export const MODIFY_PARKOUR = `#graphql
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
//     "note": null,
//     "nbVote": null,
//     "epreuves": []
//   },
// }

export const DELETE_PARKOUR = `#graphql
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
