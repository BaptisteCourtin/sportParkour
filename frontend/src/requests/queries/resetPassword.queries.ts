import { gql } from "@apollo/client";

export const CHECK_RESET_TOKEN = gql`
  query CheckResetToken($token: String!) {
    checkResetToken(token: $token) {
      message
      success
    }
  }
`;

// {
//   "token": "539aa24d-8c19-44dc-a6a6-6329ddecd49d"
// }
