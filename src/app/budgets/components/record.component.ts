import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { RecordItem } from '@shared/models/record-item';
import { RecordService } from '../services/record.service';
import { RecordStore } from "../services/record.store";

@Component({
  selector: 'x-record',
  standalone: true,
  template: ` <input
    #name
    [value]="record().name"
    (change)="updateName($event)"
    placeholder="Name"
    type="text"
  />
  <input
    [value]="record().value"
    (change)="updateValue($event)"
    placeholder="Value"
    type="text"
  />`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class RecordComponent implements OnInit {
  record = input.required<RecordItem>();
  nameInputRef = viewChild<ElementRef<HTMLInputElement>>('name');

  constructor(private recordService: RecordService, private recordStore: RecordStore) {
    effect(() => {
      if (this.recordStore.activeRecordId() === this.record().id) {
        this.nameInputRef()?.nativeElement.focus();
      }
    });
  }

  ngOnInit() {

  }


  updateName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recordService.update({id: this.record().id, name: target.value});
  }

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recordService.update({id: this.record().id, value: target.value});
  }
}
