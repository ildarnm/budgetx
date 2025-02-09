import { Component, inject } from '@angular/core';
import { BalanceService } from "../services/balance.service";

@Component({
  selector: 'x-footer',
  standalone: true,
  imports: [],
  template: `
    <!-- Fixed down footer -->
    <div class="bottom-0 left-0 right-0 flex justify-center items-center w-full">
      <div class="flex items-center justify-end w-full h-full p-8">
        <span><span class="text-sm mr-1">Balance</span> <span class="text-xl">{{ balanceService.balance() }}</span></span>
      </div>
  `,
})
export class FooterComponent {
  public balanceService = inject(BalanceService)
}
