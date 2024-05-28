import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./budgets/budgets.component').then(m => m.BudgetsComponent),
  }
];
