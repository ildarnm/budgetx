import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Section, SectionType } from '@shared/models/section';
import { TitleComponent } from './title.component';
import { BudgetComponent } from './record-list.component';
import { SectionService } from '../services/section.service';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDataList, TuiDropdown, TuiDropdownOpen, TuiIcon, TuiOption } from "@taiga-ui/core";
import { TuiLet } from "@taiga-ui/cdk";
@Component({
  standalone: true,
  selector: 'x-section',
  template: `
    <div class="bg-gray-50 rounded-lg p-4 mb-6"
    [class.bg-gray-50]="section().type === 'expense'"
    [class.bg-blue-50]="section().type === 'income'">
      <div class="flex">
        <x-title
          size="h3"
          [title]="section().title"
          (titleChanged)="updateTitle($event)"
        />
        <select class="bg-transparent" [ngModel]="section().type" (ngModelChange)="updateType($event)">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <div class="flex-1"></div>
        <button
          class="budget-menu-button"
          type="button"
          tuiDropdownOpen
          tuiDropdownAlign="right"
          [tuiDropdown]="content"
        >
          <tui-icon icon="@tui.ellipsis-vertical" class="w-4 h-4 text-gray-600"></tui-icon>
        </button>
        <ng-template #content>
          <tui-data-list role="menu">
            <button (click)="deleteSection()" tuiOption>Delete</button>
          </tui-data-list>
        </ng-template>
      </div>
      <x-record-list class="block mt-4" [section]="section()" />
    </div>
  `,
  imports: [TitleComponent, BudgetComponent, FormsModule, TuiIcon, TuiDataList, TuiOption, TuiButton, TuiLet, TuiDropdown],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  section = input.required<Section>();

  constructor(private sectionService: SectionService) {}

  public updateTitle(title: string) {
    this.sectionService.updateSection({ id: this.section().id, title }).subscribe();
  }

  public updateType(type: SectionType) {
    this.sectionService.updateSection({ id: this.section().id, type }).subscribe();
  }

  public deleteSection() {
    this.sectionService.deleteSection(this.section().id).subscribe();
  }
}
