import { gql } from "@apollo/client";

export const GET_PARKOUR_BY_ID = gql`
  query GetParkourById($getParkourByIdId: Float!) {
    getParkourById(id: $getParkourByIdId) {
      id
      title
      description
      time
      length
      difficulty
      city
      start
      note
      nbVote
      images {
        id
        lien
        isCouverture
      }
      epreuves {
        id
        title
      }
    }
  }
`;

// {
//   "getParkourByIdId": 7
// }

export const GET_PARKOUR_BY_TITLE = gql`
  query GetParkourByTitle($title: String!) {
    getParkourByTitle(title: $title) {
      id
      title
      description
      time
      length
      difficulty
      city
      start
      note
      nbVote
      images {
        id
        lien
        isCouverture
      }
      epreuves {
        id
        title
      }
    }
  }
`;

// {
//   "title": "nisi exercitationem quaerat"
// }

export const GET_ALL_PARKOUR = gql`
  query GetAllParkour {
    getAllParkour {
      id
      title
      description
      time
      length
      difficulty
      city
      start
      note
      nbVote
      images {
        id
        lien
        isCouverture
      }
      epreuves {
        id
        title
      }
    }
  }
`;
