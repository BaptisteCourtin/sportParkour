import { gql } from "@apollo/client";

export const CREATE_EPREUVE = gql`
  mutation CreateEpreuve($infos: EpreuveCreateEntity!) {
    createEpreuve(infos: $infos) {
      id
      title
    }
  }
`;

// {
//   "infos": {
//     "title": "test",
//     "description": null,
//     "easyToDo": null,
//     "mediumToDo": null,
//     "hardToDo": null,
//     "videoLink": null
//   }
// }

export const MODIFY_EPREUVE = gql`
  mutation ModifyEpreuve(
    $infos: EpreuveUpdateEntity!
    $modifyEpreuveId: Float!
  ) {
    modifyEpreuve(infos: $infos, id: $modifyEpreuveId) {
      id
      title
    }
  }
`;

// {
//   "modifyEpreuveId": 0
//   "infos": {
//     "title": null,
//     "description": null,
//     "easyToDo": null,
//     "mediumToDo": null,
//     "hardToDo": null,
//     "videoLink": null
//   },
// }

export const DELETE_EPREUVE = gql`
  mutation DeleteEpreuve($deleteEpreuveId: Float!) {
    deleteEpreuve(id: $deleteEpreuveId) {
      message
      success
    }
  }
`;

// {
//   "deleteEpreuveId": 10
// }
