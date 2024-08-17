import { useEffect, useState } from "react";
import Modal from "react-modal";

import Carousel from "react-material-ui-carousel";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const myCarousel = ({ dataImages }) => {
  const [imagesListInOrder, setImagesListInOrder] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const imagesListInOrder = dataImages
      .slice()
      .sort((a, b) => (a.isCouverture > b.isCouverture ? -1 : 1));

    setImagesListInOrder(imagesListInOrder);
  }, []);

  // Fonction pour ouvrir la modale
  const handleImageClick = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % imagesListInOrder.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + imagesListInOrder.length) %
        imagesListInOrder.length
    );
  };

  return (
    <div className="myCarousel">
      <Carousel
        className="carrouselImages"
        NextIcon={<FaAngleRight />}
        PrevIcon={<FaAngleLeft />}
        autoPlay={false}
        indicators={true}
        swipe={true}
        cycleNavigation={true}
        navButtonsAlwaysVisible={dataImages.length > 1 ? true : false}
        navButtonsAlwaysInvisible={dataImages.length > 1 ? false : true}
        fullHeightHover={false}
        animation="slide"
      >
        {imagesListInOrder.map((image, index) => (
          <div className="imageContainer">
            <img
              src={image.lien as string}
              alt=""
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </Carousel>

      {/* Modal pour afficher l'image agrandie */}
      <Modal
        className="modalForCarousel"
        isOpen={isModalOpen}
        onRequestClose={closeModal} // Ferme la modale en cliquant en dehors
        contentLabel="Image agrandie"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            overflow: "unset",
            background: "none",
            padding: "none",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "90%",
          },
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999,
          },
        }}
      >
        {imagesListInOrder[currentImageIndex] && (
          <div className="carouselAggrandi">
            {dataImages.length > 1 ? (
              <button onClick={showPreviousImage}>
                <FaAngleLeft />
              </button>
            ) : null}

            <img
              src={imagesListInOrder[currentImageIndex].lien}
              alt="Agrandie"
              onClick={closeModal}
            />

            {dataImages.length > 1 ? (
              <button onClick={showNextImage}>
                <FaAngleRight />
              </button>
            ) : null}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default myCarousel;
