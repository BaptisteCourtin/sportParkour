export const GET_NOTE_BY_TOKEN_AND_ID_PARKOUR = `#graphql
  query GetUserNoteByTokenAndParkourId($parkourId: Float!) {
    getUserNoteByTokenAndParkourId(parkourId: $parkourId) {
      note
      commentaire
    }
  }
`;

// {
//   "parkourId": 3
// }

export const GET__ALL_NOTE_BY_TOKEN = `#graphql
  query GetAllUserNoteByToken {
    getAllUserNoteByToken {
      note
      commentaire
      parkour {
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
          title
        }
      }
    }
  }
`;
