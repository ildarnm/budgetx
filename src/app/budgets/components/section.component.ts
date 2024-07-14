import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Section } from "@shared/models/Section";
import { TitleComponent } from "./title.component";
import { BudgetComponent } from "./record-list.component";
import { SectionService } from '../services/section.service';
@Component({
  standalone: true,
  selector: 'x-section',
  template: `
    <div style="border: 1px solid #fff; padding: 10px"
         [style.borderColor]="section().type === 'expense' ? 'red' : 'green'">
      <x-title [title]="section().title" (titleChanged)="updateTitle($event)"/>
      <x-record-list [section]="section()" />
    </div>
  `,
  imports: [
    TitleComponent,
    BudgetComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  section = input.required<Section>();

  constructor(private sectionService: SectionService) {}

  public updateTitle(title: string) {
    this.sectionService.updateSection({ id: this.section().id, title });
  }
}
