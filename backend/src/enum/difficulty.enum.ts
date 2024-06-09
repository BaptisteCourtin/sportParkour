import { registerEnumType } from "type-graphql";

export enum Difficulty {
  facile = "EASY",
  moyen = "MEDIUM",
  difficile = "HARD",
}

registerEnumType(Difficulty, {
  name: "Difficulty", // Nom de votre énumération
  description: "Difficulty enum", // Description facultative
});
