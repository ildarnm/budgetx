import { TuiRootModule } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'x-root',
  imports: [RouterOutlet, TuiRootModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
