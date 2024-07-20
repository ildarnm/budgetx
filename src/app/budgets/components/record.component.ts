import { Component, input } from '@angular/core';
import { Record } from "@shared/models/Record";
import { RecordService } from "../services/record.service";

@Component({
  selector: 'x-record',
  standalone: true,
  template: `
    <input [value]="record().name" (change)="updateName($event)" placeholder="Name" type="text">
    <input [value]="record().amount" (change)="updateValue($event)" placeholder="Value" type="text">`,
  styles: [`
    :host {
      display: block;
    }
  `]
})

export class RecordComponent {
  record = input.required<Record>()

  constructor(
    private recordService: RecordService,
  ) {
  }

  updateName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recordService.update({...this.record(), name: target.value});
  }

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recordService.update({...this.record(), amount: (target.value ?? '0') });
  }
}
