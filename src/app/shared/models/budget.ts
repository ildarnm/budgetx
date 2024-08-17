import { Model } from './model';
import { v4 as uuidv4 } from 'uuid';

export type BudgetId = string;

export interface Budget extends Model<BudgetId> {
  title: string;
  isFull?: boolean;
}

export const createBudget = (): Budget => ({
  id: uuidv4(),
  title: 'New budget',
});
