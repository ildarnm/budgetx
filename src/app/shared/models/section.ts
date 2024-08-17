import { BudgetId } from './budget';
import { Model } from './model';
import { RecordItem } from './record-item';
import { v4 as uuidv4 } from 'uuid';

export type SectionId = string;
export type SectionType = 'expense' | 'income';

export interface Section extends Model<SectionId> {
  budgetId: BudgetId;
  title: string;
  type: SectionType;
}

export const createSection = (budgetId: BudgetId): Section => ({
  id: uuidv4(),
  budgetId,
  title: 'New section',
  type: 'expense',
});
