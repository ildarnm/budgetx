import { Component, OnInit } from "@angular/core";
import { BudgetStore } from "./services/budget.store";
import { RouterLink, RouterOutlet } from "@angular/router";
import { BudgetService } from "./services/budget.service";

@Component({
  standalone: true,
  selector: "x-budgets-overview",
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
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
  imports: [RouterLink, RouterOutlet],
})
export class BudgetsOverviewComponent implements OnInit {
  budgets = this.budgetStore.budgets;

  constructor(private budgetStore: BudgetStore, private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budgetService.fetchBudgets();
  }

  addBudget(): void {
    this.budgetService.addBudget();
  }
}
