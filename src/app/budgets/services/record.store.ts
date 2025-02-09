import { Injectable, Signal, signal } from '@angular/core';
import { RecordItem, RecordId } from '@shared/models/record-item';
import { PartialModel } from '@shared/types';
import { SectionId } from '@shared/models/section';

@Injectable({ providedIn: 'root' })
export class RecordStore {
  private records = signal<RecordItem[]>([]);
  private _activeRecordId = signal<RecordId | undefined>(undefined);

  get activeRecordId(): Signal<RecordId | undefined> {
    return this._activeRecordId.asReadonly();
  }

  constructor() {}

  add(record: RecordItem) {
    console.log('Add record', record);
    this.records.update((s) => [...s, record]);
  }

  addRecords(records: RecordItem[]) {
    console.log('Add records', records);
    this.records.update((s) => [...s, ...records]);
  }

  getRecordById(recordId: RecordId): RecordItem | undefined {
    return this.records().find((s) => s.id === recordId);
  }

  getRecords(sectionId: SectionId): RecordItem[] {
    return this.records().filter((s) => s.sectionId === sectionId);
  }

  update(record: PartialModel<RecordItem>) {
    this.records.update((records) =>
      records.map((s) => (s.id === record.id ? { ...s, ...record } : s)),
    );
  }

  delete(recordId: RecordId) {
    this.records.update((records) =>
      records.filter((s) => s.id !== recordId),
    );
  }

  setActiveRecordId(activeRecordId: RecordId) {
    this._activeRecordId.set(activeRecordId);
  }
}
