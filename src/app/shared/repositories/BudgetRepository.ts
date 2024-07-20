import { BudgetId, Budget } from '../models/Budget';
import Repository from './Repository';
import { delay } from '../delay';
import { Injectable } from '@angular/core';
import { Section } from '@shared/models/Section';
import { Record } from '@shared/models/Record';
import {
  budgets_db,
  records_db,
  sections_db,
} from '@shared/repositories/mocks';

type PartialUpdateBudget = Partial<Budget> & { id: BudgetId };

export interface createBudgetPayload {
  budget: Budget;
  sections: Section[];
  records: Record[];
}

@Injectable({ providedIn: 'root' })
export class BudgetRepository extends Repository<Budget> {
  public async getBudgetsList(): Promise<Budget[]> {
    return delay((resolve) => {
      console.log('Get all budgets');
      resolve(budgets_db);
    });
  }

  public async create({
    budget,
    sections,
    records,
  }: createBudgetPayload): Promise<Budget> {
    return delay((resolve) => {
      console.log('Create budget', budget);

      budgets_db.push(budget);
      sections.forEach((s) => sections_db.push(s));
      records.forEach((s) => records_db.push(s));
      resolve(budget);
    });
  }

  public async find(budgetId: string | undefined): Promise<Budget> {
    return delay((resolve, reject) => {
      console.log('Find budget', budgetId);
      const budget = budgets_db.find((b) => b.id === budgetId);
      if (budget) {
        return resolve(budget);
      }

      reject('Budget not found');
    });
  }

  public async update(budget: PartialUpdateBudget): Promise<Budget> {
    return delay((resolve, reject) => {
      console.log('Update budget', budget);
      const existBudget = budgets_db.find((b) => b.id === budget.id);
      if (existBudget) {
        Object.assign(existBudget, budget);
        return resolve(existBudget);
      }

      reject('Budget not found');
    });
  }
}
