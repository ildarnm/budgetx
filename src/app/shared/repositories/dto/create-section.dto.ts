import { SectionType } from "@shared/models/section";

export interface CreateSectionDto {
  id: string;
  title: string;
  type: SectionType;
  budgetId: string;
}
