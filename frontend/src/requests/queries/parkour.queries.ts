import { gql } from "@apollo/client";

export const GET_PARKOUR = gql`
  query GetParkour($getParkourId: Float!) {
    getParkour(id: $getParkourId) {
      id
      description
      title
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
      }
      epreuves {
        id
        title
      }
    }
  }
`;

// {
//   "getParkourId": 10
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
      }
      epreuves {
        id
        title
      }
    }
  }
`;
