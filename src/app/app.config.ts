import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

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
    importProvidersFrom(TuiRootModule),
    provideHttpClient(),
  ],
};
