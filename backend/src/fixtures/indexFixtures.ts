import "reflect-metadata";
import dataSource from "../lib/datasource";
import { createUsers } from "./user.fixture";
import { createEpreuves } from "./epreuve.fixture";
import { createParkours } from "./parkour.fixture";

import { createJoinUserParkour } from "./joinUserParkour.fixture";

// const numberEpreuve = 5;
// const numberParkour = 5;
// const numberUser = 5;

const numberEpreuve = 22;
const numberParkour = 45;
const numberUser = 12;

// const numberEpreuve = 50;
// const numberParkour = 120;
// const numberUser = 420;

async function indexFixtures() {
  try {
    await dataSource.initialize();

    // Insérer les données de test pour chaque entité
    const epreuves = await createEpreuves(dataSource, numberEpreuve); // epreuves et imagesEpreuves

    const parkours = await createParkours(
      dataSource,
      numberParkour,
      epreuves,
      numberUser
    ); // crée aussi les joinParkourEpreuve
    const users = await createUsers(dataSource, numberUser); // crée les utilisateurs

    await createJoinUserParkour(dataSource, users, parkours); // crée les likes et notes

    console.log("Données de test insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données de test :", error);
  } finally {
    await dataSource.destroy();
  }
}

indexFixtures();
function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
