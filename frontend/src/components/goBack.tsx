import router from "next/router";

import { FaArrowLeft } from "react-icons/fa6";

const goToHome = () => {
  return (
    <button className="goBack" onClick={() => router.back()}>
      <FaArrowLeft /> Retour
    </button>
  );
};

export default goToHome;
