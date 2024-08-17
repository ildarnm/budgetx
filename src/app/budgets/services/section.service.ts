import { Injectable } from '@angular/core';
import { BudgetId } from '@shared/models/budget';
import { SectionRepository } from '@shared/repositories/section.repository';
import { SectionStore } from './section.store';
import { Section, createSection, SectionType } from '@shared/models/section';
import { PartialModel } from '@shared/types';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SectionService {
  constructor(
    private sectionRepository: SectionRepository,
    private sectionStore: SectionStore,
  ) {}

  createSection(
    budgetId: BudgetId,
    title = 'New section',
    type: SectionType = 'expense',
  ): Section {
    return { ...createSection(budgetId), type, title } satisfies Section;
  }

  async addSection(section: Section): Promise<void> {
    this.sectionStore.add(section);
    await this.sectionRepository.create(section);
  }

  async fetchSections(budgetId: BudgetId) {
    const sections = await this.sectionRepository.getSections(budgetId);
    this.sectionStore.addSections(sections);
  }

  public updateSection(section: PartialModel<Section>): Observable<Section> {
    this.sectionStore.update(section);
    return this.sectionRepository.update(section);
  }
}
