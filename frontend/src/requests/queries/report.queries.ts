import { gql } from "@apollo/client";

export const GET_USER_BY_ID_FOR_REPORT_PAGE = gql`
  query GetUserByIdForPageReport($userId: String!) {
    getUserByIdForPageReport(userId: $userId) {
      id
      name
      firstname
      email
      nbReportValide
      nbReportAjoute
      notesParkours {
        commentaire
        parkour {
          id
          title
        }
      }
      reports {
        id
        commentaireEnFaute
        createdAt
        status
        parkour {
          id
          title
        }
        reporter {
          id
          name
          firstname
          nbReportAjoute
        }
      }
    }
  }
`;

// {
//   "userId": "955d4f93-2158-44d4-a5ea-cf49a3638b37",
// }

export const GET_REPORTS_BY_SEARCH = gql`
  query GetReportsBySearch($status: String!) {
    getReportsBySearch(status: $status) {
      id
      commentaireEnFaute
      createdAt
      status
      reporter {
        id
        name
        firstname
        nbReportAjoute
      }
      malfrat {
        id
        name
        firstname
        nbReportValide
      }
      parkour {
        id
        title
      }
    }
  }
`;

// {
//   "status": "nonVu"
// }

export const GET_USERS_WITH_REPORTS = gql`
  query GetUsersWithReports {
    getUsersWithReports {
      id
      name
      firstname
      nbReportValide
      nbReportAjoute
    }
  }
`;
