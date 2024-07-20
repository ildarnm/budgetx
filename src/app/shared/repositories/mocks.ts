import { Budget } from "@shared/models/Budget";
import { Record } from "@shared/models/Record";
import { Section } from "@shared/models/Section";

export const budgets_db: Budget[] = [
  {
    id: "1",
    title: "Budget 1",
  },
  {
    id: "2",
    title: "Budget 2",
  },
];

export const records_db: Record[] = [];

export const sections_db: Section[] = [
  {
    id: '1',
    budgetId: '1',
    type: 'income',
    title: 'Income',
    items: [
      {
        id: '1',
        sectionId: '1',
        name: 'Item 1',
        amount: '100',
      },
      {
        id: '2',
        sectionId: '1',
        name: 'Item 2',
        amount: '200',
      }
    ]
  },
  {
    id: '2',
    budgetId: '1',
    type: 'expense',
    title: 'Expense',
    items: [
      {
        id: '3',
        sectionId: '2',
        name: 'Item 1',
        amount: '100',
      },
      {
        id: '4',
        sectionId: '2',
        name: 'Item 2',
        amount: '200',
      }
    ]
  }
];
