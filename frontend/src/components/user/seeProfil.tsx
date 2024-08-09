import React from "react";
import { FaUser } from "react-icons/fa6";

const seeProfil = ({ dataProfil }) => {
  return (
    <div className="containerInfosProfil">
      <div className="container-imageProfil">
        {dataProfil.imageProfil ? (
          <img
            className="photoProfil"
            src={dataProfil.imageProfil}
            alt="avatar"
          />
        ) : (
          <FaUser className="photoProfil" />
        )}
      </div>

      <div className="infoProfil">
        <div>
          <p>Email</p>
          <span>{dataProfil.email}</span>
        </div>
        <div className="ville">
          <div>
            <p>Ville</p>
            <span>{dataProfil.city ? dataProfil.city : "non renseigné"}</span>
          </div>
          <div>
            <p>Code postal</p>
            <span>
              {dataProfil.codePostal ? dataProfil.codePostal : "non renseigné"}
            </span>
          </div>
        </div>

        <div>
          <p>Téléphone</p>
          <span>{dataProfil.phone ? dataProfil.phone : "non renseigné"}</span>
        </div>
      </div>
    </div>
  );
};

export default seeProfil;
