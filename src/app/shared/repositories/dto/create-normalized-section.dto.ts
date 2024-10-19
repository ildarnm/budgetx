import { CreateBudgetDto } from "@shared/repositories/dto/create-budget.dto";
import { CreateSectionDto } from "@shared/repositories/dto/create-section.dto";
import { CreateRecordDto } from "@shared/repositories/dto/create-record.dto";

export interface CreateNormalizedSectionDto {
  section: CreateSectionDto;
  records: CreateRecordDto[];
}
