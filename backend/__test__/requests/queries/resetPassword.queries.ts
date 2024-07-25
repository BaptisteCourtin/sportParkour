export const CHECK_RESET_TOKEN = `#graphql
  query checkResetTokenValidity($token: String!) {
    checkResetTokenValidity(token: $token) {
      message
      success
    }
  }
`;

// {
//   "token": "539aa24d-8c19-44dc-a6a6-6329ddecd49d"
// }
