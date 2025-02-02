import { CreateBudgetDto } from './create-budget.dto';
import { CreateRecordDto } from './create-record.dto';
import { CreateSectionDto } from './create-section.dto';

export interface CreateNormalizedBudgetDto {
  budget: CreateBudgetDto;
  sections: CreateSectionDto[];
  records: CreateRecordDto[];
}
