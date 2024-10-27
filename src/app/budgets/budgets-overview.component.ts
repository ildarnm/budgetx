import { ChangeDetectionStrategy, Component, effect, input, OnDestroy } from '@angular/core';
import { BudgetStore } from './services/budget.store';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BudgetService } from './services/budget.service';
import { BudgetId } from "@shared/models/budget";
import { BudgetComponent } from "./components/budget.component";
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiOption } from "@taiga-ui/core";
import { TuiLet } from "@taiga-ui/cdk";
import { FooterComponent } from "./components/footer.component";

@Component({
  standalone: true,
  selector: 'x-budgets-overview',
  imports: [RouterLink, RouterOutlet, BudgetComponent, TuiIcon, TuiDataList, TuiOption, TuiButton, TuiLet, TuiDropdown, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <div class="flex h-screen">
          <aside class="bg-white p-6 w-72 border-r relative">
            <section>
              <h3 class="text-xs font-semibold text-gray-500 uppercase mb-2 mt-10">Budgets</h3>
              <ul>
                @for (budget of budgets(); track budget.id) {
                  <li class="budget-item flex items-center text-gray-800 py-1" >
                    <div [class.bg-blue-500]="budgetId() === budget.id" class=" w-5 h-5 mr-3 bg-gray-100"></div>
                    <a class="flex-1" [class.link-active]="budgetId() === budget.id" routerLink="/budgets/{{ budget.id }}">{{ budget.title }}</a>
<!--                    <button-->
<!--                      class="budget-menu-button"-->
<!--                      type="button"-->
<!--                      tuiDropdownOpen-->
<!--                      tuiDropdownAlign="right"-->
<!--                      [tuiDropdown]="content"-->
<!--                    >-->
<!--                      <tui-icon icon="@tui.ellipsis-vertical" class="w-4 h-4 text-gray-600"></tui-icon>-->
<!--                    </button>-->
<!--                    <ng-template #content>-->
<!--                      <tui-data-list role="menu">-->
<!--                        <button tuiOption>Delete</button>-->
<!--                      </tui-data-list>-->
<!--                    </ng-template>-->
                  </li>
                }
              </ul>
              <button (click)="addBudget()" class="bg-blue-500 w-16 h-16 rounded-full text-white text-3xl flex items-center justify-center shadow-lg absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <tui-icon
                  icon="@tui.plus"
                />
              </button>
            </section>
          </aside>
          <main class="flex-1 p-8 overflow-auto position-relative">
            <x-budget [budgetId]="budgetId()"/>
            <x-footer/>
          </main>
        </div>
  `,
  styles: [`
    .budget-menu-button {
      @apply hidden;
    }
    .budget-item:hover .budget-menu-button {
      @apply block;
    }
  `],
})
export class BudgetsOverviewComponent implements OnDestroy {
  public budgetId = input.required<BudgetId>();
  public budgets = this.budgetStore.budgets;
  private settingActiveBudgetIdEffect = effect(() => this.budgetStore.activeBudgetId.set(this.budgetId()), { allowSignalWrites: true });

  constructor(
    private budgetService: BudgetService,
    private budgetStore: BudgetStore,
  ) {}

  ngOnDestroy() {
    this.settingActiveBudgetIdEffect.destroy();
  }

  addBudget(): void {
    this.budgetService.createBudget().subscribe();
  }
}
