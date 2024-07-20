import { Injectable } from '@angular/core';
import { Section, SectionId } from "@shared/models/Section";
import { createRecord, Record } from "@shared/models/Record";
import { RecordRepository } from "@shared/repositories/RecordRepository";
import { RecordStore } from "./record.store";
import { PartialModel } from "@shared/types";

@Injectable({providedIn: 'root'})
export class RecordService {

  constructor(private recordStore: RecordStore, private recordRepository: RecordRepository) {
  }

  public async create(sectionId: SectionId) {
      const record = createRecord(sectionId);
      this.recordStore.add(record);
      await this.recordRepository.create(record);
  }

  public async update(record: PartialModel<Record>) {
    this.recordStore.update(record);
    await this.recordRepository.update(record);
  }
}
