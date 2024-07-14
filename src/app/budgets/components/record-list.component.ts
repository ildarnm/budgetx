import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, } from '@angular/core';
import { TitleComponent } from './title.component';
import { Section } from "@shared/models/Section";
import { RecordComponent } from "./record.component";

@Component({
  selector: 'x-record-list',
  standalone: true,
  template: `
    @for (record of section().items; track record.name) {
      <x-record [record]="record" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TitleComponent, RecordComponent],
})
export class BudgetComponent {
  public section = input.required<Section>();

  constructor() {}
}
