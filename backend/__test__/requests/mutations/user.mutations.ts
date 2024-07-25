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
//   "modifyUserId": "a02ee680-bc7a-4291-ad25-8e307f976424"
// }

export const DELETE_USER = `#graphql
  mutation DeleteUser {
    deleteUser {
      message
      success
    }
  }
`;
