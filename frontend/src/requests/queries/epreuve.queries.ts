import { gql } from "@apollo/client";

export const GET_EPREUVE_BY_ID = gql`
  query GetEpreuveById($getEpreuveByIdId: Float!) {
    getEpreuveById(id: $getEpreuveByIdId) {
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
        isCouverture
      }
    }
  }
`;

// {
//   "getEpreuveByIdId": 12
// }

export const GET_LIST_EPREUVE = gql`
  query GetListEpreuve {
    getListEpreuve {
      id
      title
    }
  }
`;

export const GET_TOP20_EPREUVE_BY_SEARCH = gql`
  query GetListTop20EpreuveByTitle($title: String) {
    getListTop20EpreuveByTitle(title: $title) {
      id
      title
    }
  }
`;

// {
//   "title": "dita"
// }
