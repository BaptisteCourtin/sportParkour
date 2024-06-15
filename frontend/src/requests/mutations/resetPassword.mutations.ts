import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      id
      resetToken
      expirationDate
    }
  }
`;

// {
//   "email": "bap2910@gmail.com",
// }

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: ResetPasswordUpdateEntity!) {
    changePassword(data: $data) {
      message
      success
    }
  }
`;

// {
//   "data": {
//     "token": "539aa24d-8c19-44dc-a6a6-6329ddecd49d",
//     "password": "123456"
//   }
// }
