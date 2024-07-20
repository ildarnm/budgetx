import { Model } from '@shared/models/Model';
import { SectionId } from '@shared/models/Section';
import { v4 as uuidv4 } from 'uuid';

export type RecordId = string;

export interface Record extends Model<RecordId> {
  sectionId: SectionId;
  name: string;
  amount: string | undefined;
}

export const createRecord = (sectionId: SectionId): Record => ({
  id: uuidv4(),
  sectionId,
  name: '',
  amount: '0',
});
