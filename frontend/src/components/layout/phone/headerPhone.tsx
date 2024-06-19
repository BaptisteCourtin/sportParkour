import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import router from "next/router";
import DarkLightPhone from "./darkLightPhone";

const headerPhone = () => {
  return (
    <div className="headerPhone elementsNavigation">
      <i></i>
      <div className="buttonHeaderPhone">
        <FaArrowLeft className="return" onClick={() => router.back()} />
        <DarkLightPhone />
      </div>
    </div>
  );
};

export default headerPhone;
