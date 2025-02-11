import { Component, effect, ElementRef, input, OnDestroy, output, signal, viewChild } from '@angular/core';
import { TuiIcon } from "@taiga-ui/core";
@Component({
  standalone: true,
  imports: [TuiIcon],
  selector: 'x-title',
  template: `
    <div class="mb-10px flex items-center">
      @if (!editable()) {
          <h1
            [class.text-3xl]="size() === 'h1'"
            [class.text-xl]="size() === 'h3'">{{ title() }}</h1>
        <button
          class="flex items-center py-1 px-2 rounded-full w-7 h-7 bg-gray-100 ml-2"
          (click)="setEditable(!editable())">
          <tui-icon class="w-3 h-3" icon="@tui.pen"></tui-icon>
        </button>
      } @else {
        <input
          #input
          [class.text-3xl]="size() === 'h1'"
          [class.text-xl]="size() === 'h3'"
          class="bg-transparent"
          style="width: 100%; outline: none; border: none"
          (blur)="onBlur()"
          type="text"
          [value]="title()"
          (change)="setTitle($event)"
        />
      }
    </div>
  `,
})
export class TitleComponent implements OnDestroy {
  title = input.required<string>();
  size = input<'h1' | 'h3'>('h1');
  titleChanged = output<string>();
  inputRef = viewChild<ElementRef<HTMLInputElement>>('input');
  editable = signal(false);
  focusInput = effect(() => {
    const inputRef = this.inputRef();
    if (this.editable() && inputRef) {
      inputRef.nativeElement.focus();
      inputRef.nativeElement.select();
    }
  })

  public ngOnDestroy() {
    this.focusInput.destroy();
  }

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
