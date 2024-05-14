import { gql } from "@apollo/client";

export const GET_PARKOUR = gql`
  query GetParkour($getParkourId: Float!) {
    getParkour(id: $getParkourId) {
      city
      description
      id
      start
      time
      title
      epreuves {
        id
        title
      }
    }
  }
`;
