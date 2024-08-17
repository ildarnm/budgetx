import { Injectable, signal } from '@angular/core';
import { BudgetId } from '@shared/models/budget';
import { Section } from '@shared/models/section';
import { PartialModel } from '@shared/types';

@Injectable({providedIn: 'root'})
export class SectionStore {
  private sections = signal<Section[]>([]);

  constructor() {
  }

  add(section: Section) {
    console.log('Add section', section);
    this.sections.update((s) => [...s, section]);
  }

  addSections(sections: Section[]) {
    console.log('Add sections', sections);
    this.sections.update((s) => [...s, ...sections]);
  }

  getSections(budgetId: BudgetId): Section[] {
    return this.sections().filter((s) => s.budgetId === budgetId);
  }

  update(section: PartialModel<Section>) {
    this.sections.update((sections) =>
      sections.map((s) => (s.id === section.id ? {...s, ...section} : s)),
    );
  }
}
