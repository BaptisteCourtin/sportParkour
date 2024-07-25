export const GET_EPREUVE_BY_ID = `#graphql
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

export const GET_ALL_EPREUVE = `#graphql
  query GetAllEpreuve {
    getAllEpreuve {
      id
      title
      images {
        id
        lien
      }
    }
  }
`;

export const GET_TOP20_EPREUVE_BY_TITLE = `#graphql
  query GetTop20EpreuveByTitle($title: String) {
    getTop20EpreuveByTitle(title: $title) {
      id
      title
    }
  }
`;

// {
//   "title": "dita"
// }
