import { RecordItem } from '../models/record-item';
import Repository from './repository';
import { delay } from '../delay';
import { Injectable, inject } from '@angular/core';
import { PartialModel } from '@shared/types';
import { recordsDB } from '@shared/repositories/mocks';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecordRepository extends Repository<RecordItem> {
  private http = inject(HttpClient);

  public create(record: RecordItem): Observable<RecordItem> {
    return this.http.post<RecordItem>('/api/records', record);
  }

  public async find(id: string): Promise<RecordItem> {
    return delay((resolve, reject) => {
      console.log('Find budget record', id);
      const r = recordsDB.find((s) => s.id === id);
      if (r) {
        return resolve(r);
      }

      return reject('Record not found');
    });
  }

  public update(record: PartialModel<RecordItem>): Observable<void> {
    return this.http.patch<void>(`/api/records/${record.id}`, record);
  }
}
