import { Routes } from '@angular/router';
import { BudgetsOverviewComponent } from "./budgets/budgets-overview.component";

export const routes: Routes = [
  {
    path: 'budgets/:budgetId',
    component: BudgetsOverviewComponent,
    title: 'Budgets overview',
  },
  {
    path: '',
    redirectTo: 'budgets/',
    pathMatch: 'full',
  },
];
