export const INSCRIPTION = `#graphql
  mutation Inscription($infos: UserInputRegisterEntity!) {
    inscription(infos: $infos) {
      message
      success
    }
  }
`;

// {
//   "infos": {
//     "password": "oui",
//     "name": "oui",
//     "firstname": "non",
//     "email": "oui@oui.com",
//     "city": null,
//     "codePostal": null,
//     "phone": null
//   }
// }
