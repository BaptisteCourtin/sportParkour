import { gql } from "@apollo/client";

export const GET_EPREUVE = gql`
  query GetEpreuve($getEpreuveId: Float!) {
    getEpreuve(id: $getEpreuveId) {
      description
      easyToDo
      hardToDo
      id
      mediumToDo
      title
    }
  }
`;
