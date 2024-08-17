import { SectionType } from "@shared/models/section";

export interface GetSectionDto {
  id: string;
  title: string;
  budgetId: string;
  type: SectionType;
}
