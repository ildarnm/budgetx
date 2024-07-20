import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Section, SectionType } from '@shared/models/Section';
import { TitleComponent } from './title.component';
import { BudgetComponent } from './record-list.component';
import { SectionService } from '../services/section.service';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'x-section',
  template: `
    <div
      style="border: 1px solid #fff; padding: 10px"
      [style.borderColor]="section().type === 'expense' ? 'red' : 'green'"
    >
      <div class="flex">
        <x-title
          [title]="section().title"
          (titleChanged)="updateTitle($event)"
        />
        <select [ngModel]="section().type" (ngModelChange)="updateType($event)">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <x-record-list [section]="section()" />
    </div>
  `,
  imports: [TitleComponent, BudgetComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  section = input.required<Section>();

  constructor(private sectionService: SectionService) {}

  public updateTitle(title: string) {
    this.sectionService.updateSection({ id: this.section().id, title });
  }

  public updateType(type: SectionType) {
    this.sectionService.updateSection({ id: this.section().id, type });
  }
}
