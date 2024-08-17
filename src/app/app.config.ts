import { provideAnimations } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { BudgetService } from "./budgets/services/budget.service";
import { lastValueFrom } from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const budgetService = inject(BudgetService);
        return () => lastValueFrom(budgetService.init());
      },
      multi: true,
    },
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    NG_EVENT_PLUGINS,
    provideHttpClient(),
  ],
};
