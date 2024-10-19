import { BudgetRepository } from '@shared/repositories/budget.repository';
import { BudgetStore } from './budget.store';
import { Router } from '@angular/router';
import { Budget, BudgetId, createBudget } from '@shared/models/budget';
import { Injectable } from '@angular/core';
import { createSection, Section } from '@shared/models/section';
import { createRecord } from '@shared/models/record-item';
import { RecordStore } from './record.store';
import { SectionStore } from './section.store';
import { EMPTY, Observable, switchMap, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class BudgetService {
  constructor(
    private budgetRepository: BudgetRepository,
    private budgetStore: BudgetStore,
    private sectionStore: SectionStore,
    private recordStore: RecordStore,
    private router: Router,
  ) {
  }

  public init(): Observable<Budget[]> {
    return this.budgetRepository.getAll().pipe(
      tap(budgets => {
        this.budgetStore.set(budgets);
      })
    );
  }

  public fetchBudget(budgetId: BudgetId): Observable<void> {
    const existsBudget = this.budgetStore.getBudgetById(budgetId);
    if (existsBudget?.isFull) {
      return EMPTY;
    }

    return this.budgetRepository.find(budgetId).pipe(
      tap(({budget, sections, records}) => {
        if (existsBudget) {
          this.budgetStore.update({...budget, isFull: true});
        } else {
          this.budgetStore.add({...budget, isFull: true});
        }
        this.sectionStore.addSections(sections);
        this.recordStore.addRecords(records);
      }),
      switchMap(() => EMPTY)
    );
  }

  public createBudget(): Observable<void> {
    const budget = {...createBudget(), isFull: true} satisfies Budget;

    this.budgetStore.add(budget);

    const income = {
      ...createSection(budget.id),
      type: 'income',
      title: 'Income',
    } satisfies Section;
    this.sectionStore.add(income);

    const incomeFirstRecord = createRecord(income.id);
    this.recordStore.add(incomeFirstRecord);

    const expense = {
      ...createSection(budget.id),
      title: 'Expense',
    } satisfies Section;
    this.sectionStore.add(expense);

    const expenseFirstRecord = createRecord(expense.id);
    this.recordStore.add(expenseFirstRecord);


    return this.budgetRepository.create({
      budget,
      sections: [income, expense],
      records: [incomeFirstRecord, expenseFirstRecord],
    }).pipe(
      tap(() => this.router.navigate(['/budgets', budget.id]))
    );

  }

  public updateTitle(budgetId: string, title: string): Observable<void> {
    this.budgetStore.update({id: budgetId, title});
    return this.budgetRepository.update(budgetId, {title});
  }
}
