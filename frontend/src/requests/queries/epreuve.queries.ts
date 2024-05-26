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

export const GET_LIST_EPREUVES = gql`
  query GetListEpreuves {
    getListEpreuve {
      id
      title
    }
  }
`;

export const GET_LIST_EPREUVES_BY_SEARCH = gql`
  query GetListEpreuvesBySearch($search: String) {
    getListBySearch(search: $search) {
      id
      title
    }
  }
`;
