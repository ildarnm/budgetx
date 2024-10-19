import { Section, SectionId } from '../models/section';
import Repository from './repository';
import { delay } from '../delay';
import { Injectable } from '@angular/core';
import { PartialModel } from '@shared/types';
import { sections_db } from '@shared/repositories/mocks';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateNormalizedSectionDto } from "@shared/repositories/dto/create-normalized-section.dto";

@Injectable({ providedIn: 'root' })
export class SectionRepository extends Repository<Section> {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public create(createNormalizedSectionDto: CreateNormalizedSectionDto): Observable<void> {
    return this.httpClient.post<void>(`/api/sections`, createNormalizedSectionDto);
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

  public delete(sectionId: SectionId): Observable<void> {
    return this.httpClient.delete<void>(`/api/sections/${sectionId}`);
  }
}
