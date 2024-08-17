import { inject, Signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export function injectRouteParam<T>(param: string): Signal<T | undefined> {
  const route = inject(ActivatedRoute);
  return toSignal(route.params.pipe(map((params) => params[param]), filter(p => !!p)), { requireSync: true });
}
