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

export const GET_ALL_PARKOUR_FOR_MAP = gql`
  query GetAllParkourForMap {
    getAllParkourForMap {
      id
      title
      start
    }
  }
`;

export const GET_TOP20_PARKOUR_BY_SEARCH_TITLE = gql`
  query GetListTop20ParkourByTitle($title: String) {
    getTop20ParkourByTitle(title: $title) {
      id
      title
    }
  }
`;

// {
//   "title": "dita"
// }

export const GET_TOP20_PARKOUR_BY_SEARCH = gql`
  query GetTop20ParkourBySearch(
    $startPage: Float!
    $noteMin: Float
    $difficulty: String
    $lengthMax: Float
    $lengthMin: Float
    $timeMax: Float
    $timeMin: Float
    $city: String
  ) {
    getTop20ParkourBySearch(
      startPage: $startPage
      noteMin: $noteMin
      difficulty: $difficulty
      lengthMax: $lengthMax
      lengthMin: $lengthMin
      timeMax: $timeMax
      timeMin: $timeMin
      city: $city
    ) {
      id
      title
      time
      length
      difficulty
      city
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
//   "startPage": 0,
//   "noteMin": null,
//   "difficulty": null,
//   "lengthMax": null,
//   "lengthMin": null,
//   "timeMax": null,
//   "timeMin": null,
//   "city": null
// }
