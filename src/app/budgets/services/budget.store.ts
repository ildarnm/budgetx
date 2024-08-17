import { computed, inject, Injectable, signal } from '@angular/core';
import { Budget, BudgetId } from '@shared/models/budget';
import { PartialModel } from '@shared/types';
import { ActivatedRoute } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class BudgetStore {
  public activeBudgetId = signal<BudgetId | undefined>(undefined);
  public activeBudget = computed(() => {
    const budgetId = this.activeBudgetId();
    if (!budgetId) {
      return;
    }
    return this.getBudgetById(budgetId);
  });
  budgets = signal<Budget[]>([]);

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
