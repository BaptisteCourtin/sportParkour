import { gql } from "@apollo/client";

export const GET_EPREUVE = gql`
  query GetEpreuve($getEpreuveId: Float!) {
    getEpreuve(id: $getEpreuveId) {
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

export const GET_ALL_EPREUVE = gql`
  query GetListEpreuve {
    getListEpreuve {
      id
      title
    }
  }
`;
