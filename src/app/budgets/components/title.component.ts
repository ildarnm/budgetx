import { Component, input, output, signal } from '@angular/core';
import { TuiSvgModule } from "@taiga-ui/core";
@Component({
  standalone: true,
  imports: [TuiSvgModule],
  selector: 'x-title',
  template: `
    <div class="mb-10px flex">
      @if (!editable()) {
      <div>{{ title() }}</div>
        <button
          appearance="flat"
          tuiButton
          type="button"
          (click)="setEditable(!editable())"
          class="tui-space_right-3 tui-space_bottom-3"
        >
          <tui-svg src="tuiIconEdit3"></tui-svg>

        </button>
      } @else {
      <input
        style="width: 100%; outline: none; border: none"
        autoFocus
        (blur)="onBlur()"
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
