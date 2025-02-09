import { Component, computed, effect, ElementRef, inject, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { RecordItem } from '@shared/models/record-item';
import { RecordService } from '../services/record.service';
import { RecordStore } from "../services/record.store";
import { SectionService } from '../services/section.service';
import { Decimal } from "decimal.js";

@Component({
  selector: 'x-record',
  standalone: true,
  template: ` <input
    #name
    class=" p-2 bg-transparent w-full outline-blue-500"
    [value]="recordName()"
    (change)="updateName($event)"
    (blur)="onBlur()"
    placeholder="Name"
    type="text"
  />`,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class RecordComponent implements OnDestroy {
  private recordService = inject(RecordService);
  private recordStore = inject(RecordStore);

  record = input.required<RecordItem>();
  nameInputRef = viewChild<ElementRef<HTMLInputElement>>('name');
  setFocusToActiveRecord = effect(() => {
    if (this.recordStore.activeRecordId() === this.record().id) {
      this.nameInputRef()?.nativeElement.focus();
    }
  });

  recordName = computed(() => {
    const value = new Decimal(this.record().value);
    return value.toNumber() > 0 ? this.record().name + ' ' + this.record().value : this.record().name
  })

  ngOnDestroy() {
    this.setFocusToActiveRecord.destroy();
  }

  onBlur() {
    if (!this.record().name && !this.record().value) {
      this.recordService.delete(this.record().id).subscribe();
    }
  }


  updateName(event: Event): void {
    const valueParts = (event.target as HTMLInputElement).value.trim().split(' ');
    let value = valueParts[valueParts.length - 1];
    if (Decimal.isDecimal(value)) {
      valueParts.pop();
    } else {
      value = '0';
    }
    const name = valueParts.join(' ').trim();
    this.recordService.update({id: this.record().id, name, value }).subscribe();
  }
}
