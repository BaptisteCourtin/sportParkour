import { gql } from "@apollo/client";

export const AUTHENTIFICATION = gql`
  query Authentification($infos: UserInputAuthEntity!) {
    authentification(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "password": "oui",
//     "email": "oui@oui.com"
//   }
// }

export const LOGOUT = gql`
  query Logout {
    logout {
      message
      success
    }
  }
`;
