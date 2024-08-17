import { gql } from "@apollo/client";

export const MODIFY_USER = gql`
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
//     "imageProfil": null
//   },
// }

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      message
      success
    }
  }
`;
