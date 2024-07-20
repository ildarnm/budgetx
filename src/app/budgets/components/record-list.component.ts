import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TitleComponent } from './title.component';
import { Section } from '@shared/models/Section';
import { RecordComponent } from './record.component';
import { RecordStore } from '../services/record.store';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'x-record-list',
  standalone: true,
  template: `
    @for (record of records(); track record.id) {
      <x-record [record]="record" />
    }
    <button class="btn mt-2" (click)="onAddRecord()">Add record</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TitleComponent, RecordComponent],
})
export class BudgetComponent {
  public section = input.required<Section>();

  public records = computed(() =>
    this.recordStore.getRecords(this.section().id),
  );

  constructor(
    private recordStore: RecordStore,
    private recordService: RecordService,
  ) {}

  onAddRecord() {
    this.recordService.create(this.section().id);
  }
}
