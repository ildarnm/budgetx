import { Injectable, signal } from '@angular/core';
import { Record } from '@shared/models/Record';
import { PartialModel } from '@shared/types';
import { SectionId } from '@shared/models/Section';

@Injectable({ providedIn: 'root' })
export class RecordStore {
  private records = signal<Record[]>([]);

  constructor() {}

  add(record: Record) {
    console.log('Add record', record);
    this.records.update((s) => [...s, record]);
  }

  getRecords(sectionId: SectionId): Record[] {
    return this.records().filter((s) => s.sectionId === sectionId);
  }

  update(record: PartialModel<Record>) {
    this.records.update((records) =>
      records.map((s) => (s.id === record.id ? { ...s, ...record } : s)),
    );
  }
}
