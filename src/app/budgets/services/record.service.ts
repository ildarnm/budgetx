import { Injectable } from '@angular/core';
import { SectionId } from '@shared/models/section';
import { createRecord, RecordItem } from '@shared/models/record-item';
import { RecordRepository } from '@shared/repositories/record.repository';
import { RecordStore } from './record.store';
import { PartialModel } from '@shared/types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(
    private recordStore: RecordStore,
    private recordRepository: RecordRepository,
  ) {}

  public create(sectionId: SectionId): Observable<RecordItem> {
    const record = createRecord(sectionId);
    this.recordStore.add(record);
    this.recordStore.setActiveRecordId(record.id);
    return this.recordRepository.create(record);
  }

  public update(record: PartialModel<RecordItem>): Observable<void> {
    this.recordStore.update(record);
    return this.recordRepository.update(record);
  }
}
