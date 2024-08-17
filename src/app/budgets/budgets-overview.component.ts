import { ChangeDetectionStrategy, Component, effect, input, OnDestroy } from '@angular/core';
import { BudgetStore } from './services/budget.store';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BudgetService } from './services/budget.service';
import { BudgetId } from "@shared/models/budget";
import { BudgetComponent } from "./components/budget.component";
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiFade,
  TuiTabs
} from "@taiga-ui/kit";
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiSurface, TuiTitle } from "@taiga-ui/core";
import { TuiRepeatTimes } from "@taiga-ui/cdk";
import {TuiCardLarge, TuiHeader, TuiNavigation} from '@taiga-ui/layout';

@Component({
  standalone: true,
  selector: 'x-budgets-overview',
  imports: [RouterLink, RouterOutlet, BudgetComponent, TuiAvatar, TuiTabs, TuiBadge, TuiIcon,
    TuiNavigation,
    TuiButton,
    TuiIcon,
    TuiChevron,
    TuiDropdown,
    TuiFade,
    TuiDataList,
    TuiBadgeNotification,
    TuiAvatar,
    TuiAppearance,
    TuiBadge,
    TuiTabs,
    TuiRepeatTimes,
    TuiCardLarge,
    TuiHeader,
    TuiSurface,
    TuiTitle,
    TuiDataListDropdownManager,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    <div class="grid grid-cols-5 h-full">-->
    <!--      <aside class="bg-blue-900 min-h-screen p-10 text-blue-50">-->
    <!--        <section>-->
    <!--          <h1>Budget List</h1>-->
    <!--          <ul>-->
    <!--            @for (budget of budgets(); track budget.id) {-->
    <!--              <li>-->
    <!--                <a routerLink="/budgets/{{ budget.id }}">{{ budget.title }}</a>-->
    <!--              </li>-->
    <!--            }-->
    <!--          </ul>-->
    <!--          <button class="btn btn-blue" (click)="addBudget()">Add budget</button>-->
    <!--        </section>-->
    <!--      </aside>-->
    <!--      <main class="bg-blue-50 p-14 col-span-4">-->
    <!--        <x-budget [budgetId]="budgetId()"></x-budget>-->
    <!--      </main>-->
    <!--    </div>-->
    <header tuiNavigationHeader>
      <button
        appearance="secondary"
        iconStart="@tui.layout-grid"
        tuiIconButton
      >
        Menu
      </button>
      <span tuiNavigationLogo>
        <tui-icon icon="@tui.home"/>
        <span tuiFade>A very very long product name</span>
    </span>
      <tui-avatar src="AI"/>
    </header>
    <div [style.display]="'flex'">
      <aside
        [style.height.rem]="27"
      >
        <header>
          <button
            iconStart="@tui.home"
            tuiAsideItem
          >
            <span tuiFade>A very very long product name</span>
          </button>
        </header>
        <button
          iconStart="@tui.search"
          tuiAsideItem
        >
          Search
        </button>
        <a
          iconStart="@tui.users"
          tuiAsideItem
          [routerLink]=""
        >
          Groups
        </a>
        <tui-aside-group>
          <button
            iconStart="@tui.settings"
            tuiAsideItem
            tuiChevron
          >
            Settings
            <ng-template>
              <button tuiAsideItem>Account</button>
              <button tuiAsideItem>Notifications</button>
              <button tuiAsideItem>Privacy</button>
            </ng-template>
          </button>
        </tui-aside-group>
        <button
          iconStart="@tui.heart"
          tuiAsideItem
        >
          <span tuiFade>By default ellipsis is used but you can use fade too</span>
        </button>
        <hr/>
        <button
          iconStart="@tui.plus"
          tuiAsideItem
        >
          Add
        </button>
        <footer>
          <button
            iconStart="@tui.star"
            tuiAsideItem
          >
            Favorites
          </button>
        </footer>
      </aside>
      <main tuiNavigationMain>
        <nav
          tuiNavigationNav
          [style.position]="'sticky'"
        >
          <a routerLink=".">
            <tui-icon icon="@tui.chevron-left"/>
            Back
          </a>
          /
          <span tuiNavigationLogo>
                <span tuiFade>Groups</span>
                <tui-badge iconStart="@tui.lock">Status</tui-badge>
            </span>
          <hr/>
          <tui-tabs tuiFade>
            <button tuiTab>Default view</button>
            <button tuiTab>Details</button>
            <button tuiTab>Followers</button>
          </tui-tabs>
          <button
            appearance="secondary"
            tuiButton
          >
            Secondary
          </button>
          <button tuiButton>Primary</button>
        </nav>
        <div
          *tuiRepeatTimes="let index of 10"
          tuiCardLarge
          tuiHeader
          tuiSurface="elevated"
        >
          <h2 tuiTitle>
            Some random content
            <span tuiSubtitle>A subtitle</span>
          </h2>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class BudgetsOverviewComponent implements OnDestroy {
  public budgetId = input.required<BudgetId>();
  public budgets = this.budgetStore.budgets;
  private settingActiveBudgetIdEffect = effect(() => this.budgetStore.activeBudgetId.set(this.budgetId()), { allowSignalWrites: true });

  constructor(
    private budgetService: BudgetService,
    private budgetStore: BudgetStore,
  ) {}

  ngOnDestroy() {
    this.settingActiveBudgetIdEffect.destroy();
  }

  addBudget(): void {
    this.budgetService.createBudget().subscribe();
  }
}
