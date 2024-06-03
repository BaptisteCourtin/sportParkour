import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";

const faq = () => {
  const [isUserOk, setIsUserOk] = useState("");

  return (
    <main className="pagesInfos">
      <h1>Questions fréquemment posées</h1>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3>Q : Comment vous contacter ?</h3>
          </AccordionSummary>
          <AccordionDetails>Ne le fait pas</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <h3>Q : Vous aimez le sport ?</h3>
          </AccordionSummary>
          <AccordionDetails>Non, mais l'argent oui.</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h3>Q : ça va ?</h3>
          </AccordionSummary>
          <AccordionDetails>Moi ouais.</AccordionDetails>
          <AccordionActions>
            <div>
              <Button
                onClick={() => setIsUserOk("oui")}
                className={isUserOk == "oui" ? "userChoose" : ""}
              >
                moi aussi ça va 👍
              </Button>
              <Button
                onClick={() => setIsUserOk("non")}
                className={isUserOk == "non" ? "userChoose" : ""}
              >
                moi non, mais tout le monde s'en fout
              </Button>
            </div>
            {isUserOk == "oui" ? (
              <p>C'est bien</p>
            ) : isUserOk == "non" ? (
              <p>T'as raison</p>
            ) : null}
          </AccordionActions>
        </Accordion>
      </div>
    </main>
  );
};

export default faq;
