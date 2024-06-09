import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import router from "next/router";

const headerPhone = () => {
  return (
    <div className="headerPhone elementsNavigation">
      <i></i>
      <div className="buttonHeaderPhone">
        <FaArrowLeft className="return" onClick={() => router.back()} />
        <FaGear className="gear" />
      </div>
    </div>
  );
};

export default headerPhone;
