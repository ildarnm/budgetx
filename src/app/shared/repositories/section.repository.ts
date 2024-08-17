import { Section } from '../models/section';
import Repository from './repository';
import { delay } from '../delay';
import { Injectable } from '@angular/core';
import { PartialModel } from '@shared/types';
import { sections_db } from '@shared/repositories/mocks';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SectionRepository extends Repository<Section> {
  constructor(private httpClient: HttpClient) {
    super();
  }


  public async getSections(budgetId: string): Promise<Section[]> {
    return delay((resolve) => {
      console.log('Get budget all sections', budgetId);
      resolve(sections_db.filter((s) => s.budgetId === budgetId));
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
      const section = sections_db.find((s) => s.id === sectionId);
      if (section) {
        return resolve(section);
      }

      return reject('Section not found');
    });
  }

  public update(section: PartialModel<Section>): Observable<Section> {
    return this.httpClient.patch<Section>(`/api/sections/${section.id}`, section);
  }
}
