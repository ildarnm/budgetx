import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, OnInit } from '@angular/core';
import { BudgetStore } from '../services/budget.store';
import { TitleComponent } from './title.component';
import { SectionListComponent } from './section-list.component';
import { BudgetId } from '@shared/models/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'x-budget',
  standalone: true,
  template: `
    @if (activeBudget(); as budget) {
      <x-title [title]="budget.title" (titleChanged)="updateTitle($event)"/>
      <x-section-list [budgetId]="budget.id"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TitleComponent, SectionListComponent],
})
export class BudgetComponent {
  budgetId = input.required<BudgetId>();
  public activeBudget = this.budgetStore.activeBudget;

  constructor(
    private budgetStore: BudgetStore,
    private budgetService: BudgetService,
  ) {
    effect(() => {
      const budgetId = this.budgetStore.activeBudgetId();
      if (!budgetId) {
        return;
      }
      this.budgetService.fetchBudget(budgetId).subscribe();
    });
  }

  public updateTitle(title: string) {
    const budgetId = this.budgetStore.activeBudgetId();
    if (!budgetId) {
      return;
    }
    this.budgetService.updateTitle(budgetId, title).subscribe();
  }
}
