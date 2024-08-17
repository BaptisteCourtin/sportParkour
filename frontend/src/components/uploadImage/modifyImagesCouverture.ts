export const modifyIsCouverture = async (
  modifyImageAny: any,
  myLastCouverture: number,
  isMyCouverture: number,
  dataAny: any
) => {
  try {
    // Une requête ici pour enlever le isCouverture si besoin
    if (myLastCouverture && isMyCouverture !== myLastCouverture) {
      await modifyImageAny({
        variables: { idImage: myLastCouverture },
      });
    }

    // Une requête ici pour ajouter le isCouverture si besoin
    if (dataAny.images && isMyCouverture !== myLastCouverture) {
      for (let i = 0; i < dataAny.images.length; i++) {
        // Si isCouv est sur une ancienne image => va changer
        // Si isCouv est sur une nouvelle image => va rien faire
        if (+dataAny.images[i].id === isMyCouverture) {
          await modifyImageAny({
            variables: { idImage: isMyCouverture },
          });
          break;
        }
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de la modification de l'image de couverture :",
      error
    );
  }
};
