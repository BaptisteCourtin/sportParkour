export const GET_USER_BY_TOKEN = `#graphql
  query GetUserByToken {
    getUserByToken {
      id
      name
      firstname
      email
      city
      codePostal
      phone
      imageProfil
    }
  }
`;

export const IS_ADMIN = `#graphql
  query IsAdmin {
    isAdmin
  }
`;

export const IS_CLIENT = `#graphql
  query IsClient {
    isClient
  }
`;
