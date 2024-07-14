import { BudgetRepository } from '@shared/repositories/BudgetRepository';
import { BudgetStore } from './budget.store';
import { Router } from '@angular/router';
import { createBudget } from '@shared/models/Budget';
import { SectionService } from './section.service';
import { Injectable } from '@angular/core';
import { createSection, Section } from '@shared/models/Section';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(
    private budgetRepository: BudgetRepository,
    private budgetStore: BudgetStore,
    private sectionService: SectionService,
    private router: Router
  ) {}

  async fetchBudgets(): Promise<void> {
    const budgets = await this.budgetRepository.getBudgetsList();

    this.budgetStore.set(budgets);

    const [firstBudget] = budgets;
    await this.router.navigate(['/budgets', firstBudget.id]);
  }

  async addBudget() {
    let budget = createBudget();
    const income = { ...createSection(budget.id), title: 'Income' } satisfies Section; 
    const expense = { ...createSection(budget.id), title: 'Expense' } satisfies Section;

    this.budgetStore.add(budget);
    await Promise.all([ this.budgetRepository.create(budget), this.sectionService.createSections([income, expense]) ]);
    await this.router.navigate(['/budgets', budget.id]);
  }

  async updateTitle(budgetId: string, title: string) {
    await this.budgetRepository.update({ id: budgetId, title });
    this.budgetStore.update({ id: budgetId, title });
  }
}
