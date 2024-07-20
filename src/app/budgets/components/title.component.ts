import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'x-title',
  template: `
    <div style="margin-bottom: 10px">
      <input
        style="width: 100%; outline: none; border: none"
        autoFocus
        type="text"
        [value]="title()"
        (change)="setTitle($event)"
      />
    </div>
  `,
})
export class TitleComponent {
  title = input.required<string>();
  titleChanged = output<string>();

  public setTitle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.titleChanged.emit(target.value);
  }
}
