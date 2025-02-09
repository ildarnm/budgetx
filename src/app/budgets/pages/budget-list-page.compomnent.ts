import { Component } from '@angular/core';

@Component({
  selector: 'x-budget-list-page',
  template: `
    <div>
      <h1>Budget List</h1>
      <!-- additional content here -->
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
  `]
})
export class BudgetListPageCompomnent {
  constructor() {}
}
