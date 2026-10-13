import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { startWith } from "rxjs";
import type { Issue } from "../../../labs/contracts.js";
import { IssueApi } from "./issue-api.js";
import { buildSearch } from "./search.js";

@Component({
  selector: "learning-issue-search",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label for="issue-search">Search issue titles</label>
    <input id="issue-search" type="search" maxlength="120" [formControl]="query">
    <ng-container *ngIf="view$ | async as view">
      <p role="status" *ngIf="view.kind === 'loading'">Loading…</p>
      <p role="alert" *ngIf="view.kind === 'error'">{{ view.message }}</p>
      <ng-container *ngIf="view.kind === 'success'">
        <p role="status" *ngIf="view.rows.length === 0">No matching issues.</p>
        <ul><li *ngFor="let row of view.rows; trackBy: trackId">{{ row.title }} — {{ row.status }}</li></ul>
      </ng-container>
    </ng-container>
  `
})
export class IssueSearchComponent {
  private readonly api = inject(IssueApi);
  readonly query = new FormControl("", { nonNullable: true });
  readonly view$ = buildSearch(this.query.valueChanges.pipe(startWith(this.query.value)),
    term => this.api.search(term));
  trackId(index: number, issue: Issue): string { return issue.id; }
}
