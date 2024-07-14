import { BudgetId, Budget } from "../models/Budget";
import Repository from "./Repository";
import { delay } from "../delay";
import { Injectable } from "@angular/core";

type PartialUpdateBudget = Partial<Budget> & { id: BudgetId };

const budgets: Budget[] = [
  {
    id: "1",
    title: "Budget 1",
  },
  {
    id: "2",
    title: "Budget 2",
  },
];

@Injectable({ providedIn: "root" })
export class BudgetRepository extends Repository<Budget> {
  public async getBudgetsList(): Promise<Budget[]> {
    return delay((resolve) => {
      console.log("Get all budgets");
      resolve(budgets);
    });
  }

  public async create(budget: Budget): Promise<Budget> {
    return delay((resolve) => {
      console.log("Create budget", budget);

      budgets.push(budget);
      resolve(budget);
    });
  }

  public async find(budgetId: string | undefined): Promise<Budget> {
    return delay((resolve, reject) => {
      console.log("Find budget", budgetId);
      const budget = budgets.find((b) => b.id === budgetId);
      if (budget) {
        return resolve(budget);
      }

      reject("Budget not found");
    });
  }

  public async update(budget: PartialUpdateBudget): Promise<Budget> {
    return delay((resolve, reject) => {
      console.log("Update budget", budget);
      const existBudget = budgets.find((b) => b.id === budget.id);
      if (existBudget) {
        Object.assign(existBudget, budget);
        return resolve(existBudget);
      }

      reject("Budget not found");
    });
  }
}
