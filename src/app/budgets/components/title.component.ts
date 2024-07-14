import { Component, input, output, signal } from '@angular/core';
@Component({
  standalone: true,
  selector: 'x-title',
  template: `
    <div style="margin-bottom: '10px'">
      @if (!editable) {
      <div (click)="setEditable(!editable)">{{ title() }}</div>
      } @else {
      <input
        style="width: 100%, outline: 'none', border: 'none'"
        autoFocus
        (blur)="{onBlur}"
        type="text"
        [value]="title()"
        (change)="setTitle($event)"
      />
      }
    </div>
  `,
})
export class TitleComponent {
  title = input.required<string>();
  titleChanged = output<string>();
  editable = signal(false);

  public setEditable(editable: boolean) {
    this.editable.set(editable);
  }

  public setTitle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.titleChanged.emit(target.value);
  }

  public onBlur() {
    this.editable.set(false);
  }
}
