import { Component, computed, input, OnInit } from '@angular/core';
import { BudgetId } from "@shared/models/Budget";
import { SectionStore } from "../services/section.store";
import { SectionComponent } from "./section.component";
import { SectionService } from '../services/section.service';

@Component({
  selector: 'x-section-list',
  standalone: true,
  imports: [
    SectionComponent
  ],
  template:`
    @for (section of sections(); track section.id) {
      <x-section [section]="section" />
    }
    <button class="btn mt-2" (click)="onAddSection()">Add section</button>
  `,
})
export class SectionListComponent implements OnInit {
  budgetId = input.required<BudgetId>();
  public sections = computed(() => this.sectionStore.getSections(this.budgetId()));

  constructor(private sectionStore: SectionStore, private sectionService: SectionService) {}

  ngOnInit() {
    this.sectionService.fetchSections(this.budgetId());
  }

  onAddSection(): void {
    this.sectionService.createSection(this.budgetId());
  }
}
