import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'x-root',
  imports: [RouterOutlet, TuiRoot, ],
  template: `
    <tui-root>
      <router-outlet></router-outlet>
    </tui-root>`,
})
export class AppComponent {}
