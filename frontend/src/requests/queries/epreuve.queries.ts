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
      }
    }
  }
`;

// {
//   "getEpreuveByIdId": 12
// }

export const GET_LIST_EPREUVE_BY_SEARCH = gql`
  query GetListEpreuveByTitle($title: String) {
    getListEpreuveByTitle(title: $title) {
      id
      title
    }
  }
`;

// {
//   "title": "dita"
// }

export const GET_LIST_EPREUVE = gql`
  query GetListEpreuve {
    getListEpreuve {
      id
      title
    }
  }
`;
