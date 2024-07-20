import { BudgetRepository } from '@shared/repositories/BudgetRepository';
import { BudgetStore } from './budget.store';
import { Router } from '@angular/router';
import { createBudget } from '@shared/models/Budget';
import { SectionService } from './section.service';
import { Injectable } from '@angular/core';
import { createSection, Section } from '@shared/models/Section';
import { createRecord } from "@shared/models/Record";
import { RecordService } from "./record.service";
import { RecordStore } from "./record.store";
import { SectionStore } from "./section.store";

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(
    private budgetRepository: BudgetRepository,
    private budgetStore: BudgetStore,
    private sectionService: SectionService,
    private sectionStore: SectionStore,
    private recordStore: RecordStore,
    private router: Router
  ) {}

  async fetchBudgets(): Promise<void> {
    const budgets = await this.budgetRepository.getBudgetsList();

    this.budgetStore.set(budgets);

    const [firstBudget] = budgets;
    await this.router.navigate(['/budgets', firstBudget.id]);
  }

  async createBudget() {
    let budget = createBudget();

    this.budgetStore.add(budget);

    const income = { ...createSection(budget.id), type: "income", title: 'Income' } satisfies Section;
    this.sectionStore.add(income);

    const incomeFirstRecord = createRecord(income.id);
    this.recordStore.add(incomeFirstRecord);

    const expense = { ...createSection(budget.id), type: "expense", title: 'Expense' } satisfies Section;
    this.sectionStore.add(expense);
    const expenseFirstRecord = createRecord(expense.id);
    this.recordStore.add(expenseFirstRecord);

    this.budgetRepository.create({ budget, sections: [income,  expense], records: [incomeFirstRecord, expenseFirstRecord]})

    await this.router.navigate(['/budgets', budget.id]);
  }

  async updateTitle(budgetId: string, title: string) {
    await this.budgetRepository.update({ id: budgetId, title });
    this.budgetStore.update({ id: budgetId, title });
  }
}
