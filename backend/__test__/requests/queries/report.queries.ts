export const GET_USER_BY_ID_FOR_REPORT_PAGE = `#graphql
  query GetUserByIdForPageReport($userId: String!) {
    getUserByIdForPageReport(userId: $userId) {
      id
      name
      firstname
      email
      nbReportValide
      nbReportAjoute
      imageProfil
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
      }
    }
  }
`;

// {
//   "userId": "955d4f93-2158-44d4-a5ea-cf49a3638b37",
// }

export const GET_REPORTS_BY_SEARCH = `#graphql
  query GetReportsBySearch($status: String!) {
    getReportsBySearch(status: $status) {
      id
      commentaireEnFaute
      createdAt
      status
      malfrat {
        id
        name
        firstname
        nbReportValide
        imageProfil
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

export const GET_USERS_WITH_REPORTS = `#graphql
  query GetUsersWithReports {
    getUsersWithReports {
      id
      name
      firstname
      nbReportValide
      nbReportAjoute
      imageProfil
    }
  }
`;
