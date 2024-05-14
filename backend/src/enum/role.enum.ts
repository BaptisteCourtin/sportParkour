import { registerEnumType } from "type-graphql";

export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

registerEnumType(Role, {
  name: "Role", // Nom de votre énumération
  description: "Role enum", // Description facultative
});
