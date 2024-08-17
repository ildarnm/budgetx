import { Budget } from '@shared/models/budget';
import { RecordItem } from '@shared/models/record-item';
import { Section } from '@shared/models/section';

export const budgets_db: Budget[] = [
  {
    id: '1',
    title: 'Budget 1',
  },
  {
    id: '2',
    title: 'Budget 2',
  },
];

export const records_db: RecordItem[] = [];

export const sections_db: Section[] = [
  {
    id: '1',
    budgetId: '1',
    type: 'income',
    title: 'Income',
  },
  {
    id: '2',
    budgetId: '1',
    type: 'expense',
    title: 'Expense',
  },
];
