export const MODIFY_IMAGE_EPREUVE = `#graphql
  mutation ModifyImageCouvertureEpreuve($idImage: Float!) {
    modifyImageCouvertureEpreuve(idImage: $idImage) {
      message
      success
    }
  }
`;

// {
//   "idImage": 1
// }

export const MODIFY_IMAGE_PARKOUR = `#graphql
  mutation ModifyImageCouvertureParkour($idImage: Float!) {
    modifyImageCouvertureParkour(idImage: $idImage) {
      message
      success
    }
  }
`;

// {
//   "idImage": 1
// }
