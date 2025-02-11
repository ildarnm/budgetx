import { Routes } from '@angular/router';
import { BudgetListPage } from './budgets/pages/budget-list-page.compomnent';
import { BudgetPage } from './budgets/pages/budget-page.component';

export const routes: Routes = [
  { path: '', component: BudgetListPage },
  {
    path: 'budgets/:budgetId',
    component: BudgetPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
