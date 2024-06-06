import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";

const headerPhone = () => {
  return (
    <div className="headerPhone">
      <i></i>
      <div className="buttonHeaderPhone">
        <Link href="/" className="return">
          <FaArrowLeft />
        </Link>
        <FaGear className="gear" />
      </div>
    </div>
  );
};

export default headerPhone;
