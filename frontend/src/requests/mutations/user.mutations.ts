import { gql } from "@apollo/client";

export const MODIFY_USER = gql`
  mutation ModifyUser($infos: UserUpdateEntity!, $modifyUserId: String!) {
    modifyUser(infos: $infos, id: $modifyUserId) {
      id
      name
      firstname
      email
      city
      codePostal
      phone
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

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      message
      success
    }
  }
`;

// {
//   "deleteUserId": null
// }
