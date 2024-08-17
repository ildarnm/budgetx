import { Component, effect, inject, input, OnInit } from '@angular/core';
import { BudgetStore } from './services/budget.store';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BudgetService } from './services/budget.service';
import { injectRouteParam } from "@shared/inject-route-param";
import { BudgetId } from "@shared/models/budget";
import { BudgetComponent } from "./components/budget.component";

@Component({
  standalone: true,
  selector: 'x-budgets-overview',
  template: `
    <div class="grid grid-cols-5 h-full">
      <aside class="bg-blue-900 min-h-screen p-10 text-blue-50">
        <section>
          <h1>Budget List</h1>
          <ul>
            @for (budget of budgets(); track budget.id) {
              <li>
                <a routerLink="/budgets/{{ budget.id }}">{{ budget.title }}</a>
              </li>
            }
          </ul>
          <button class="btn btn-blue" (click)="addBudget()">Add budget</button>
        </section>
      </aside>
      <main class="bg-blue-50 p-14 col-span-4">
        <x-budget [budgetId]="budgetId()"></x-budget>
      </main>
    </div>
  `,
  styles: [],
  imports: [RouterLink, RouterOutlet, BudgetComponent],
})
export class BudgetsOverviewComponent {
  public budgetId = input.required<BudgetId>();

  budgets = this.budgetStore.budgets;

  constructor(
    private budgetService: BudgetService,
    private budgetStore: BudgetStore,
  ) {
    effect(() => {
      const budgetId = this.budgetId() ;
      this.budgetStore.activeBudgetId.set(budgetId ? budgetId : this.budgets()[0].id);
    }, { allowSignalWrites: true });
  }

  addBudget(): void {
    this.budgetService.createBudget().subscribe();
  }
}
