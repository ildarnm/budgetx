import { Injectable } from '@angular/core';
import { BudgetId } from '@shared/models/Budget';
import { SectionRepository } from '@shared/repositories/SectionRepository';
import { SectionStore } from './section.store';
import { Section, createSection, SectionType } from '@shared/models/Section';
import { PartialModel } from '@shared/types';

@Injectable({providedIn: "root"})
export class SectionService {
  constructor(
    private sectionRepository: SectionRepository,
    private sectionStore: SectionStore,
  ) {
  }

  createSection(budgetId: BudgetId, title = 'New section',  type: SectionType = 'expense'): Section {
    return { ...createSection(budgetId), type, title } satisfies Section;
  }

  async addSection(section:Section): Promise<void> {
    this.sectionStore.add(section);
    await this.sectionRepository.create(section);
  }

  async fetchSections(budgetId: BudgetId) {
    const sections = await this.sectionRepository.getSections(budgetId);
    this.sectionStore.addSections(sections);
  }

  async updateSection(section: PartialModel<Section>) {
    this.sectionStore.update(section);
    await this.sectionRepository.update(section);
  }
}
