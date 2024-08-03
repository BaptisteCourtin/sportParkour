export const MODIFY_USER = `#graphql
  mutation ModifyUser($infos: UserUpdateEntity!) {
    modifyUser(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "name": "test",
//     "firstname": null,
//     "email": null,
//     "city": null,
//     "codePostal": null,
//     "phone": null
//   },
// }

export const DELETE_USER = `#graphql
  mutation DeleteUser {
    deleteUser {
      message
      success
    }
  }
`;
