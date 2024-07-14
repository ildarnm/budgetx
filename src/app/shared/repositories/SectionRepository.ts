import { Section } from "../models/Section";
import Repository from "./Repository";
import { delay } from "../delay";
import { Injectable } from "@angular/core";
import { PartialModel } from "@shared/types";

const sections: Section[] = [
  {
    id: '1',
    budgetId: '1',
    type: 'income',
    title: 'Income',
    items: [
      {
        name: 'Item 1',
        amount: '100',
      },
      {
        name: 'Item 2',
        amount: '200',
      }
    ]
  },
  {
    id: '2',
    budgetId: '1',
    type: 'expense',
    title: 'Expense',
    items: [
      {
        name: 'Item 1',
        amount: '100',
      },
      {
        name: 'Item 2',
        amount: '200',
      }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class SectionRepository extends Repository<Section> {
  public async getSections(budgetId: string): Promise<Section[]> {
    return delay((resolve) => {
      console.log('Get budget all sections', budgetId);
      resolve(sections.filter(s => s.budgetId === budgetId));
    });
  }

  public async create(section: Section): Promise<Section> {
    return delay((resolve) => {
      console.log('Create budget section', section);
      sections.push(section);
      resolve(section);
    });
  }

  public async createSections(newSections: Section[]): Promise<Section[]> {
    return delay((resolve) => {
      console.log('Create budget sections', newSections);
      newSections.forEach(s => sections.push(s));
      resolve(newSections);
    });
  }

  public async find(sectionId: string): Promise<Section> {
    return delay((resolve, reject) => {
      console.log('Find budget section', sectionId);
      const section = sections.find(s => s.id === sectionId);
      if(section) {
        return resolve(section);
      }

      return reject('Section not found');
    });
  }

  public async update(section: PartialModel<Section>): Promise<Section> {
    return delay((resolve, reject) => {
      console.log('Update budget section', section);
      const existSection = sections.find(s => s.id === section.id);
      if(existSection) {
        Object.assign(existSection, section);
        return resolve(existSection);
      }

      return reject('Section not found');
    });
  }
}
