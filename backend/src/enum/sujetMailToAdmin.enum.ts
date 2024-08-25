import { registerEnumType } from "type-graphql";

export enum SujetMailToAdmin {
  EPREUVE = "par rapport à une épreuve",
  PARKOUR = "par rapport à un parkour",
  CLIENT = "par rapport à moi",
  SITE = "par rapport au site",
}

registerEnumType(SujetMailToAdmin, {
  name: "SujetMailToAdmin", // Nom de votre énumération
  description: "SujetMailToAdmin enum", // Description facultative
});
