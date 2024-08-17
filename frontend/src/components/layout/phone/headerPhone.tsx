import router from "next/router";

import { FaArrowLeft } from "react-icons/fa6";

import DarkLightPhone from "@/components/layout/phone/darkLightPhone";

// header phone avec retour + dark/light
const headerPhone = () => {
  return (
    <div className="headerPhone elementsNavigation">
      <i></i>
      <div className="buttonHeaderPhone">
        <FaArrowLeft
          data-testid="fa-arrow-left"
          className="return"
          onClick={() => router.back()}
        />
        <DarkLightPhone />
      </div>
    </div>
  );
};

export default headerPhone;
