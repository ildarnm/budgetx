import { Model } from '@shared/models/model';
import { SectionId } from '@shared/models/section';
import { v4 as uuidv4 } from 'uuid';

export type RecordId = string;

export interface RecordItem extends Model<RecordId> {
  sectionId: SectionId;
  name: string;
  value: string;
}

export const createRecord = (sectionId: SectionId): RecordItem => ({
  id: uuidv4(),
  sectionId,
  name: '',
  value: '0',
});
