import "reflect-metadata";
import dataSource from "../lib/datasource";
import { createUsers } from "./user.fixture";
import { createEpreuves } from "./epreuve.fixture";
import { createParkours } from "./parkour.fixture";

import { createImageEpreuve } from "./imageEpreuve.fixture";
import { createImageParkour } from "./imageParkour.fixture";
import { createJoinUserParkour } from "./joinUserParkour.fixture";

async function indexFixtures() {
  try {
    await dataSource.initialize();

    // Insérer les données de test pour chaque entité
    const epreuves = await createEpreuves(dataSource, 15);
    const parkours = await createParkours(dataSource, 10, epreuves); // cré aussi les joinParkourEpreuve
    const users = await createUsers(dataSource, 5); // Crée 5 utilisateurs

    await createImageEpreuve(dataSource, 8, epreuves);
    await createImageParkour(dataSource, 8, parkours);
    await createJoinUserParkour(dataSource, 8, users, parkours);

    console.log("Données de test insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données de test :", error);
  } finally {
    await dataSource.destroy();
  }
}

indexFixtures();
