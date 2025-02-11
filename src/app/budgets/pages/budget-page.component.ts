import { ChangeDetectionStrategy, Component, effect, input, OnDestroy } from '@angular/core';
import { BudgetStore } from '../services/budget.store';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { BudgetId } from "@shared/models/budget";
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiOption } from "@taiga-ui/core";
import { TitleComponent } from "../components/title.component";
import { SectionListComponent } from "../components/section-list.component";
import { TuiLet } from "@taiga-ui/cdk";
import { FooterComponent } from "../components/footer.component";

@Component({
  standalone: true,
  selector: 'x-budget-page',
  imports: [RouterLink, RouterOutlet, TuiIcon, TuiDataList, TuiOption, TuiButton, TuiLet, TuiDropdown, FooterComponent, TitleComponent, SectionListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <div class="flex h-screen">
          <main class="flex-1 p-8 overflow-auto position-relative">
            @if (activeBudget(); as budget) {
              <div class="flex items-center mb-10">
                <button (click)="back()" class="p-2" aria-label="Go Back">
                  <tui-icon icon="@tui.arrow-left" class="w-6 h-6"></tui-icon>
                </button>
                <x-title [title]="budget.title" (titleChanged)="updateTitle($event)"/>
              </div>
              <x-section-list class="ml-2" [budgetId]="budget.id"/>
            }
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
export class BudgetPage implements OnDestroy {
  public budgetId = input.required<BudgetId>();
  public budgets = this.budgetStore.budgets;
  public activeBudget = this.budgetStore.activeBudget;
  private fetchActiveBudgetEffect = effect(() => this.budgetService.fetchBudget(this.budgetId()).subscribe());
  private settingActiveBudgetIdEffect = effect(() => this.budgetStore.activeBudgetId.set(this.budgetId()), { allowSignalWrites: true });

  constructor(
    private budgetStore: BudgetStore,
    private budgetService: BudgetService,
  ) {}

  public updateTitle(title: string) {
    const budgetId = this.budgetStore.activeBudgetId();
    if (!budgetId) {
      return;
    }
    this.budgetService.updateTitle(budgetId, title).subscribe();
    this.fetchActiveBudgetEffect.destroy();
  }

  public back(): void {
    window.history.back();
  }

  ngOnDestroy() {
    this.settingActiveBudgetIdEffect.destroy();
  }
}
