export const AUTHENTIFICATION = `#graphql
  query Authentification($infos: UserInputAuthEntity!) {
    authentification(infos: $infos) {
      message
      success
    }
  }
`;

export const LOGOUT = `#graphql
  query Logout {
    logout {
      message
      success
    }
  }
`;
