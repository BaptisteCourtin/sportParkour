import { registerEnumType } from "type-graphql";

export enum Difficulty {
  EASY = "facile",
  MEDIUM = "moyen",
  HARD = "difficile",
}

registerEnumType(Difficulty, {
  name: "Difficulty", // Nom de votre énumération
  description: "Difficulty enum", // Description facultative
});
