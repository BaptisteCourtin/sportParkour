import { gql } from "@apollo/client";

export const MODIFY_IMAGE_EPREUVE = gql`
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

export const MODIFY_IMAGE_PARKOUR = gql`
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
