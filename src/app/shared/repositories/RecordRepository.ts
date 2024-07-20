import { Record } from "../models/Record";
import Repository from "./Repository";
import { delay } from "../delay";
import { Injectable } from "@angular/core";
import { PartialModel } from "@shared/types";
import { records_db } from "@shared/repositories/mocks";


@Injectable({providedIn: 'root'})
export class RecordRepository extends Repository<Record> {

  public async create(record: Record): Promise<Record> {
    return delay((resolve) => {
      console.log('Create budget record', record);
      records_db.push(record);
      resolve(record);
    });
  }

  public async find(id: string): Promise<Record> {
    return delay((resolve, reject) => {
      console.log('Find budget record', id);
      const r = records_db.find(s => s.id === id);
      if (r) {
        return resolve(r);
      }

      return reject('Record not found');
    });
  }

  public async update(record: PartialModel<Record>): Promise<Record> {
    return delay((resolve, reject) => {
      console.log('Update budget record', record);
      const existRecord = records_db.find(s => s.id === record.id);
      if (existRecord) {
        Object.assign(existRecord, record);
        return resolve(existRecord);
      }

      return reject('Record not found');
    });
  }
}
