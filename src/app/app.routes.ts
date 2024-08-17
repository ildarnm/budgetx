import { Routes } from '@angular/router';
import { BudgetsOverviewComponent } from "./budgets/budgets-overview.component";
import { inject } from "@angular/core";
import { BudgetStore } from "./budgets/services/budget.store";

export const routes: Routes = [
  {
    path: 'budgets/:budgetId',
    component: BudgetsOverviewComponent,
    title: 'Budgets overview',
  },
  {
    path: '**',
    redirectTo: () => {
      const budgets = inject(BudgetStore).budgets();
      return `budgets/${budgets[0].id}`;
    },
  },
];
