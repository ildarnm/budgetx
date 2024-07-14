import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./budgets/budgets-overview.component').then(
        (m) => m.BudgetsOverviewComponent
      ),
    title: 'Budgets overview',
    children: [
      {
        path: 'budgets/:budgetId',
        loadComponent: () =>
          import('./budgets/components/budget.component').then(
            (m) => m.BudgetComponent
          ),
      },
    ],
  },
];
