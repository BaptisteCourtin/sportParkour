import router from "next/router";

import { FaArrowLeft } from "react-icons/fa6";

const goBack = () => {
  return (
    <button className="goBack" onClick={() => router.back()}>
      <FaArrowLeft /> Retour
    </button>
  );
};

export default goBack;
