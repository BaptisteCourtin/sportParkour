const displayImagesInBase = ({
  listImagesAlreadyIn,
  setIsMyCouverture,
  isMyCouverture,
  setIdsImagesToSupp,
  idsImagesToSupp,
}) => {
  function handleSuppOneImage(event: any, thisId: number) {
    event.preventDefault();

    if (idsImagesToSupp.includes(thisId)) {
      setIdsImagesToSupp((prevIdsImagesToSupp) => {
        return prevIdsImagesToSupp.filter((id) => id !== thisId);
      });
    } else {
      setIdsImagesToSupp((prevIdsImagesToSupp) => [
        ...prevIdsImagesToSupp,
        thisId,
      ]);
    }
  }

  return (
    <ul className="imageAlredyInBase">
      {listImagesAlreadyIn &&
        listImagesAlreadyIn.map((img) => (
          <li
            key={img.id}
            className={`${
              idsImagesToSupp.includes(parseInt(img.id)) ? "toDelete" : ""
            } 
						${isMyCouverture == +img.id ? "isCouv" : ""}`}
          >
            <img src={img.lien} alt="Image de présentation" />
            <button
              className="toCouv"
              onClick={() => setIsMyCouverture(+img.id)}
            >
              {isMyCouverture == +img.id
                ? "Image de couverture"
                : "Définir comme image de couverture"}
            </button>
            <span
              className="remove_img"
              onClick={(e) => handleSuppOneImage(e, Number(img.id))}
            >
              {idsImagesToSupp.includes(parseInt(img.id))
                ? "Ne pas supprimer cette image"
                : "Supprimer cette image"}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default displayImagesInBase;
