import { registerEnumType } from "type-graphql";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

registerEnumType(Difficulty, {
  name: "Difficulty", // Nom de votre énumération
  description: "Difficulty enum", // Description facultative
});
