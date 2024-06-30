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
//     "images": [
//       {
//         "lien": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJzDLj5l4O_Cp9vH7LoUn6wP9fN2fuZVg10w&s",
//         "isCouverture": false
//       }
//     ]
//   }
// }

export const MODIFY_EPREUVE = gql`
  mutation ModifyEpreuve(
    $modifyEpreuveId: Float!
    $infos: EpreuveUpdateEntity!
  ) {
    modifyEpreuve(id: $modifyEpreuveId, infos: $infos) {
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
//     "images": [
//       {
//         "lien": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJzDLj5l4O_Cp9vH7LoUn6wP9fN2fuZVg10w&s",
//         "isCouverture": false
//       }
//     ]
//     "deletedImageIds": [28,27]
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
