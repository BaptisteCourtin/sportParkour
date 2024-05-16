import React from "react";

const cardParkour = () => {
  // on reçoit les infos
  // mettre un icon pour dire de cliquer sur la ville

  return (
    <article className="cardParkour">
      <h3>TITRE DU PARCOURS</h3>
      <img
        src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
        alt=""
      />
      <div className="infos">
        <div className="difficulty">
          <p>120 min</p>
          <p>14 km</p>
          <p>easy</p>
        </div>
        <a href="https://www.google.fr/maps/place/48.824,2.249">
          ISSY LES MOULINEAUX
        </a>
        <p>5 épreuves</p>
      </div>
    </article>
  );
};

export default cardParkour;
