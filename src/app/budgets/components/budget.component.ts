import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { BudgetStore } from '../services/budget.store';
import { TitleComponent } from './title.component';
import { SectionListComponent } from './section-list.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BudgetId } from '@shared/models/Budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'x-budget',
  standalone: true,
  template: `
    @if (budget(); as budget) {
      <x-title [title]="budget.title" (titleChanged)="updateTitle($event)" />
      <x-section-list [budgetId]="budget.id" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TitleComponent, SectionListComponent],
})
export class BudgetComponent {
  private budgetId = toSignal<BudgetId>(
    this.route.params.pipe(map(({ budgetId }) => budgetId)),
  );
  public budget = computed(() => {
    const budgetId = this.budgetId();
    if (!budgetId) {
      return;
    }
    return this.budgetStore.getBudgetById(budgetId);
  });

  constructor(
    private budgetStore: BudgetStore,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
  ) {}

  public updateTitle(title: string) {
    const budgetId = this.budgetId();
    if (!budgetId) {
      return;
    }
    this.budgetService.updateTitle(budgetId, title);
  }
}
