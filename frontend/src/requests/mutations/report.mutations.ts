import { gql } from "@apollo/client";

export const REPORT_NOTE = gql`
  mutation ReportNote(
    $commentaire: String!
    $parkourId: Float!
    $malfratId: String!
  ) {
    reportNote(
      commentaire: $commentaire
      parkour_id: $parkourId
      malfrat_id: $malfratId
    ) {
      message
      success
    }
  }
`;

// {
//   "commentaire": "ce comm va être report",
//   "parkourId": 3,
//   "malfratId": "955d4f93-2158-44d4-a5ea-cf49a3638b37"
// }
