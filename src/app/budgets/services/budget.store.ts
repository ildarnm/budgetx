import { Injectable, signal } from "@angular/core";
import {
  BudgetId,
  Budget
} from "@shared/models/Budget";
import { PartialModel } from "@shared/types";

@Injectable({ providedIn: "root" })
export class BudgetStore {
  
  budgets = signal<Budget[]>([]);

  constructor() {}

  getBudgetById(id: BudgetId): Budget | undefined {
    if (!id) {
      return undefined;
    }
    return this.budgets().find((b) => b.id === id);
  }

  set(budgets: Budget[]) {
    this.budgets.set(budgets);
  }

  add(budget: Budget) {
    this.budgets.update((budgets) => [...budgets, budget]);
  }

  update(budget: PartialModel<Budget>) {
    this.budgets.update((budgets) =>
      budgets.map((b) => (b.id === budget.id ? { ...b, ...budget } : b)),
    );
  }
}
