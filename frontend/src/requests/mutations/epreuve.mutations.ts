import { gql } from "@apollo/client";

export const CREATE_EPREUVE = gql`
  mutation Mutation($infos: EpreuveCreateEntity!) {
    createEpreuve(infos: $infos) {
      videoLink
      hardToDo
      mediumToDo
      easyToDo
      description
      title
      id
      images {
        id
        lien
      }
    }
  }
`;

// {
//   "infos": {
//     "title": "null",
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
      description
      easyToDo
      mediumToDo
      hardToDo
      videoLink
      images {
        id
        lien
      }
    }
  }
`;

// {
//   "infos": {
//     "title": null,
//     "description": null,
//     "easyToDo": null,
//     "mediumToDo": null,
//     "hardToDo": null,
//     "videoLink": null
//   },
//   "modifyEpreuveId": 0
// }

export const DELETE_EPREUVE = gql`
  mutation Mutation($deleteEpreuveId: Float!) {
    deleteEpreuve(id: $deleteEpreuveId) {
      message
      success
    }
  }
`;

// {
//   "deleteEpreuveId": 10
// }
