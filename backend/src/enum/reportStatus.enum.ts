import { registerEnumType } from "type-graphql";

export enum ReportStatus {
  NON_VU = "nonVu",
  VU_ET_LAISSE = "vuEtLaisse",
  VU_ET_LAISSE_MODIF = "vuEtLaisseModif",
  VU_ET_SUPPRIME = "vuEtSupprime",
}

registerEnumType(ReportStatus, {
  name: "ReportStatus", // Nom de votre énumération
  description: "ReportStatus enum", // Description facultative
});
