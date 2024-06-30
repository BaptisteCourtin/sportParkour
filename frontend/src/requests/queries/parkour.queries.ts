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
      notesParkours {
        note
        commentaire
        user {
          id
          name
          firstname
          imageProfil
        }
      }
      epreuves {
        id
        title
        images {
          id
          lien
          isCouverture
        }
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

export const GET_TOP20_PARKOUR_BY_TITLE = gql`
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
    $triParField: String!
    $triParSort: String!
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
      triParField: $triParField
      triParSort: $triParSort
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
      }
      epreuves {
        id
      }
    }
  }
`;

// {
//   "triParField": "note",
//   "triParSort": "ASC",
//   "startPage": 0,
//   "noteMin": null,
//   "difficulty": null,
//   "lengthMax": null,
//   "lengthMin": null,
//   "timeMax": null,
//   "timeMin": null,
//   "city": null
// }

export const GET_THE_PARKOUR_TOTAL = gql`
  query GetTheParkourTotalForSearch(
    $noteMin: Float
    $difficulty: String
    $lengthMax: Float
    $lengthMin: Float
    $timeMax: Float
    $timeMin: Float
    $city: String
  ) {
    getTheParkourTotalForSearch(
      noteMin: $noteMin
      difficulty: $difficulty
      lengthMax: $lengthMax
      lengthMin: $lengthMin
      timeMax: $timeMax
      timeMin: $timeMin
      city: $city
    )
  }
`;

// {
//   "noteMin": null,
//   "difficulty": null,
//   "lengthMax": null,
//   "lengthMin": null,
//   "timeMax": null,
//   "timeMin": null,
//   "city": null
// }
