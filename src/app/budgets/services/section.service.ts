import { Injectable } from '@angular/core';
import { BudgetId } from '@shared/models/Budget';
import { SectionRepository } from '@shared/repositories/SectionRepository';
import { SectionStore } from './section.store';
import { Section } from '@shared/models/Section';
import { PartialModel } from '@shared/types';

@Injectable({ providedIn: "root" })
export class SectionService {
constructor(
  private sectionRepository: SectionRepository,
  private sectionStore: SectionStore,
) {}


  async createSections(sections: Section[]) {
    await this.sectionRepository.createSections(sections);
    this.sectionStore.add(sections);
  }

  async fetchSections(budgetId: BudgetId) {
    const sections = await this.sectionRepository.getSections(budgetId);
    this.sectionStore.add(sections);
  }

  async updateSection(section: PartialModel<Section>) {
    await this.sectionRepository.update(section);
    this.sectionStore.update(section);
  }
}