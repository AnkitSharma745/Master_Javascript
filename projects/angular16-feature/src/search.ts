import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from "rxjs";
import type { Issue } from "../../../labs/contracts.js";

export type SearchState =
  | { kind: "loading" }
  | { kind: "success"; rows: readonly Issue[] }
  | { kind: "error"; message: string };

export function buildSearch(
  terms: Observable<string>, lookup: (term: string) => Observable<readonly Issue[]>, debounceMs = 200
): Observable<SearchState> {
  return terms.pipe(
    map(term => term.trim()),
    debounceTime(debounceMs),
    distinctUntilChanged(),
    switchMap(term => lookup(term).pipe(
      map((rows): SearchState => ({ kind: "success", rows })),
      catchError(() => of<SearchState>({ kind: "error", message: "Search failed; try again" })),
      startWith<SearchState>({ kind: "loading" })
    ))
  );
}
