import { Injectable } from '@angular/core';
import { SectionId } from '@shared/models/section';
import { createRecord, RecordItem } from '@shared/models/record-item';
import { RecordRepository } from '@shared/repositories/record.repository';
import { RecordStore } from './record.store';
import { PartialModel } from '@shared/types';
import { NEVER, Observable, of } from 'rxjs';
import { SectionStore } from "./section.store";

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(
    private sectionStore: SectionStore,
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

  public delete(recordId: string): Observable<void> {
    const record = this.recordStore.getRecordById(recordId);
    if (!record) return NEVER;
    const allRecordsOfSection = this.recordStore.getRecords(record.sectionId);

    const isTheLastRecord = allRecordsOfSection.length === 1;
    if (isTheLastRecord) {
      return NEVER;
    }

    this.recordStore.delete(recordId);
    return this.recordRepository.delete(recordId);
  }
}
