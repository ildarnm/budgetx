import { Injectable } from '@angular/core';
import { SectionId } from '@shared/models/section';
import { createRecord, RecordItem } from '@shared/models/record-item';
import { RecordRepository } from '@shared/repositories/record.repository';
import { RecordStore } from './record.store';
import { PartialModel } from '@shared/types';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(
    private recordStore: RecordStore,
    private recordRepository: RecordRepository,
  ) {}

  public async create(sectionId: SectionId) {
    const record = createRecord(sectionId);
    this.recordStore.add(record);
    this.recordStore.setActiveRecordId(record.id);
    await this.recordRepository.create(record);
  }

  public async update(record: PartialModel<RecordItem>): Promise<void> {
    this.recordStore.update(record);
    await this.recordRepository.update(record);
  }
}
