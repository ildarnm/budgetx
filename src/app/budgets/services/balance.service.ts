import { computed, inject, Injectable } from '@angular/core';
import { BudgetStore } from './budget.store';
import { SectionStore } from "./section.store";
import { RecordStore } from "./record.store";
import { RecordItem } from '@shared/models/record-item';

@Injectable({providedIn: 'root'})
export class BalanceService {
  private budgetStore = inject(BudgetStore);
  private sectionStore = inject(SectionStore);
  private recordStore = inject(RecordStore);

  public balance = computed<number>(() => {
    const activeBudgetId = this.budgetStore.activeBudgetId();
    if (!activeBudgetId) {
      return 0;
    }

    const activeBudgetSections = this.sectionStore.getSections(activeBudgetId);
    const incomeSectionsRecordsSum = activeBudgetSections
      .filter((s) => s.type === 'income')
      .reduce((records, currentSection) => {
      return [...records, ...this.recordStore.getRecords(currentSection.id)];
    },  [] as RecordItem[])
      .reduce((records, currentRecord) => {
        return records + currentRecord.value;
      }, 0);

    const expenseSectionsRecordsSum = activeBudgetSections
      .filter((s) => s.type === 'expense')
      .reduce((records, currentSection) => {
        return [...records, ...this.recordStore.getRecords(currentSection.id)];
      },  [] as RecordItem[])
      .reduce((records, currentRecord) => {
        return records + currentRecord.value;
      }, 0);

    return incomeSectionsRecords.reduce((acc, currentRecord) => {
      return acc + currentRecord.value;
    },
  });

  constructor() {
  }
}
