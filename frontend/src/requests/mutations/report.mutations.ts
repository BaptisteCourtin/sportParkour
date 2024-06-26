import { gql } from "@apollo/client";

export const REPORT_NOTE = gql`
  mutation ReportNote(
    $malfratId: String!
    $parkourId: Float!
    $commentaire: String!
  ) {
    reportNote(
      malfratId: $malfratId
      parkourId: $parkourId
      commentaire: $commentaire
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

export const LET_NOTE = gql`
  mutation LetNote($reportId: Float!) {
    letNote(reportId: $reportId) {
      message
      success
    }
  }
`;

// {
//   "reportId": 4
// }

export const DELETE_NOTE_AND_REPORT = gql`
  mutation DeleteNoteAndAddOneReportValide(
    $commentaire: String!
    $reportId: Float!
    $parkourId: Float!
    $malfratId: String!
  ) {
    deleteNoteAndAddOneReportValide(
      commentaire: $commentaire
      reportId: $reportId
      parkourId: $parkourId
      malfratId: $malfratId
    ) {
      message
      success
    }
  }
`;

// {
//   "reportId": 4,
//   "parkourId": 41,
//   "malfratId": "8a7f6162-84ac-4279-95f6-f8e53a2069b5"
// }

export const DELETE_NOTE_AND_CREATE_REPORT = gql`
  mutation DeleteNoteAndAddOneReportValideAndCreateReport(
    $commentaire: String!
    $malfratId: String!
    $parkourId: Float!
  ) {
    deleteNoteAndAddOneReportValideAndCreateReport(
      commentaire: $commentaire
      malfratId: $malfratId
      parkourId: $parkourId
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

export const DELETE_USER_BY_ADMIN = gql`
  mutation DeleteUserByAdmin($malfratId: String!) {
    deleteUserByAdmin(malfratId: $malfratId) {
      message
      success
    }
  }
`;

// {
//   "malfratId": "8a7f6162-84ac-4279-95f6-f8e53a2069b5"
// }
