import React, { useState } from "react";

const faq = () => {
  const [isUserOk, setIsUserOk] = useState("");

  return (
    <main className="pagesInfos">
      <h1>Questions fréquemment posées</h1>
      <div>
        <h3>Q : Comment vous contacter ?</h3>
        <p>Ne le fait pas</p>
      </div>
      <div>
        <h3>Q : Vous aimez le sport ?</h3>
        <p>Non, mais l'argent oui.</p>
      </div>
      <div>
        <h3>Q : ça va ?</h3>
        <p>Moi ouais.</p>
        <button onClick={() => setIsUserOk("oui")}>moi aussi ça va 👍</button>
        <button onClick={() => setIsUserOk("non")}>
          moi non, mais tout le monde s'en fout
        </button>
        {isUserOk == "oui" ? (
          <p>C'est bien</p>
        ) : isUserOk == "non" ? (
          <p>T'as raison</p>
        ) : null}
      </div>
    </main>
  );
};

export default faq;
