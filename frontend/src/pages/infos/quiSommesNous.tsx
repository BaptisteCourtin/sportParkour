import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";

const quiSommesNous = () => {
  return (
    <main className="pagesInfos">
      <h1>QUI SOMMES NOUS</h1>
      <h2>et infos sur le site</h2>

      <a href="https://portfolio-baptiste-courtin.netlify.app/" target="_blank">
        Créateur du site : Baptiste Courtin
      </a>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3>Q : Il sert à quoi ce site ?</h3>
          </AccordionSummary>
          <AccordionDetails>
            Tu peux trouver des parcours sportifs, avec des épreuves dedans. Et
            si le cœur t'en dit, tu peux les faire. En courant ou en marchant.
            Tu peux aussi te servir de l'appli pour trouver des balades sympas.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <h3>Q : Pourquoi avoir créé ce site ?</h3>
          </AccordionSummary>
          <AccordionDetails>
            Pour passer ma certification de concepteur développeur web. Je
            n'aimais pas le projet fait en cours, du coup, j'ai fait le mien (il
            est mieux).
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h3>Q : Va-t-il y avoir des mises à jour ?</h3>
          </AccordionSummary>
          <AccordionDetails>
            Bah, là, ce n'est pas prévu, mais j'ai des idées.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h3>
              Q : Où peut-on suivre le créateur du site ? (il est sympa le gars)
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            Alors ! Très bonne question !
            <br />
            <br />
            <a href="https://github.com/BaptisteCourtin">
              Github : https://github.com/BaptisteCourtin
            </a>
            <br />
            <a href="https://www.linkedin.com/in/baptistecourtin/">
              LinkedIn : https://www.linkedin.com/in/baptistecourtin/
            </a>
            <br />
            <br />
            (Embauchez-moi s'il vous plaît)
          </AccordionDetails>
        </Accordion>
      </div>
    </main>
  );
};

export default quiSommesNous;
