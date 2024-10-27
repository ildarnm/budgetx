import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { RecordItem } from '@shared/models/record-item';
import { RecordService } from '../services/record.service';
import { RecordStore } from "../services/record.store";

@Component({
  selector: 'x-record',
  standalone: true,
  template: ` <input
    #name
    class="b-gray-400 p-2 bg-transparent basis-2/3 border-2 outline-blue-500"
    [value]="record().name"
    (change)="updateName($event)"
    placeholder="Name"
    type="text"
  />
  <input
    class="bg-transparent p-2 basis-1/3 border-2 border-l-0 outline-blue-500"
    [value]="record().value"
    (change)="updateValue($event)"
    placeholder="Value"
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
    this.recordService.update({id: this.record().id, name: target.value}).subscribe();
  }

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recordService.update({id: this.record().id, value: target.value}).subscribe();
  }
}
