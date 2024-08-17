import { GetBudgetDto } from "@shared/repositories/dto/get-budget.dto";
import { GetSectionDto } from "@shared/repositories/dto/get-section.dto";
import { GetRecordDto } from "@shared/repositories/dto/get-record.dto";

export interface GetNormalizedBudgetDto {
  budget: GetBudgetDto;
  sections: GetSectionDto[];
  records: GetRecordDto[];
}
