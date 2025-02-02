import { CreateRecordDto } from './create-record.dto';
import { CreateSectionDto } from './create-section.dto';

export interface CreateNormalizedSectionDto {
  section: CreateSectionDto;
  records: CreateRecordDto[];
}
