import { BudgetId } from './Budget';
import { Model } from './Model';
import { RecordModel } from './Record';
import { v4 as uuidv4 } from 'uuid';

export type SectionId = string;
export type SectionType = 'expense' | 'income';

export interface Section extends Model<SectionId> {
  budgetId: BudgetId;
  title: string;
  type: SectionType;
  items: RecordModel[];
}

export const createSection = (budgetId: BudgetId): Section => ({
  id: uuidv4(),
  budgetId,
  title: 'New section',
  type: 'expense',
  items: [],
});
