import { Section } from "../models/Section";
import Repository from "./Repository";
import { delay } from "../delay";
import { Injectable } from "@angular/core";
import { PartialModel } from "@shared/types";
import { sections_db } from "@shared/repositories/mocks";

@Injectable({ providedIn: 'root' })
export class SectionRepository extends Repository<Section> {
  public async getSections(budgetId: string): Promise<Section[]> {
    return delay((resolve) => {
      console.log('Get budget all sections', budgetId);
      resolve(sections_db.filter(s => s.budgetId === budgetId));
    });
  }

  public async create(section: Section): Promise<Section> {
    return delay((resolve) => {
      console.log('Create budget section', section);
      sections_db.push(section);
      resolve(section);
    });
  }

  public async find(sectionId: string): Promise<Section> {
    return delay((resolve, reject) => {
      console.log('Find budget section', sectionId);
      const section = sections_db.find(s => s.id === sectionId);
      if(section) {
        return resolve(section);
      }

      return reject('Section not found');
    });
  }

  public async update(section: PartialModel<Section>): Promise<Section> {
    return delay((resolve, reject) => {
      console.log('Update budget section', section);
      const existSection = sections_db.find(s => s.id === section.id);
      if(existSection) {
        Object.assign(existSection, section);
        return resolve(existSection);
      }

      return reject('Section not found');
    });
  }
}
