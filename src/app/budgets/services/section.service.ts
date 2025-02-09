import { Injectable } from '@angular/core';
import { BudgetId } from '@shared/models/budget';
import { SectionRepository } from '@shared/repositories/section.repository';
import { SectionStore } from './section.store';
import { Section, createSection, SectionType, SectionId } from '@shared/models/section';
import { PartialModel } from '@shared/types';
import { Observable } from "rxjs";
import { createRecord } from "@shared/models/record-item";
import { RecordStore } from "./record.store";

@Injectable({providedIn: 'root'})
export class SectionService {
  constructor(
    private sectionRepository: SectionRepository,
    private sectionStore: SectionStore,
    private recordStore: RecordStore,
  ) {
  }

  public createSection(
    budgetId: BudgetId,
  ): Observable<void> {

    const section = {
      ...createSection(budgetId),
      title: 'Expense',
    } satisfies Section;
    this.sectionStore.add(section);

    const expenseFirstRecord = createRecord(section.id);
    this.recordStore.add(expenseFirstRecord);
    this.recordStore.setActiveRecordId(expenseFirstRecord.id);
    return this.sectionRepository.create({ section, records: [expenseFirstRecord] });
  }

  public updateSection(section: PartialModel<Section>): Observable<Section> {
    this.sectionStore.update(section);
    return this.sectionRepository.update(section);
  }

  public deleteSection(sectionId: SectionId): Observable<void> {
    this.sectionStore.delete(sectionId);
    return this.sectionRepository.delete(sectionId);
  }
}
