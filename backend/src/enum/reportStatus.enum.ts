import { registerEnumType } from "type-graphql";

export enum ReportStatus {
  NON_VU = "nonVu",
  SUPPRIME = "supprime",
}

registerEnumType(ReportStatus, {
  name: "ReportStatus", // Nom de votre énumération
  description: "ReportStatus enum", // Description facultative
});
