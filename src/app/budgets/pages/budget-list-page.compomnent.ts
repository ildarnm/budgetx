import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiIcon } from "@taiga-ui/core";
import { BudgetStore } from "../services/budget.store";
import { BudgetService } from "../services/budget.service";

@Component({
  selector: 'x-budget-list-page',
  standalone: true,
  imports: [RouterLink, TuiIcon],
  template: `
      <div class="bg-white p-8 pt-3 relative">
        <div class="header flex justify-end">
          <button (click)="addBudget()" class="flex items-center rounded-full ng-star-inserted">
            <tui-icon icon="@tui.plus" class="w-8 h-8"></tui-icon>
          </button>
        </div>
        <section>
          <h3 class="text-xs font-semibold text-gray-500 uppercase mb-2 mt-6">Budgets</h3>
          <ul>
            @for (budget of budgets(); track budget.id) {
              <li class="budget-item flex items-center text-gray-800 py-1">
                <div [class.bg-blue-500]="budgetId() === budget.id" class="w-5 h-5 mr-3 bg-gray-100"></div>
                <a class="flex-1 text-3xl" [class.link-active]="budgetId() === budget.id" routerLink="/budgets/{{ budget.id }}">{{ budget.title }}</a>
              </li>
            }
          </ul>
        </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BudgetListPage {
  private budgetStore = inject(BudgetStore);
  private budgetService = inject(BudgetService);

  public budgets = this.budgetStore.budgets;

  budgetId() {
    return '';
  }
  addBudget(): void {
    this.budgetService.createBudget().subscribe();
  }
}
