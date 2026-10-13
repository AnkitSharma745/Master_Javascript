import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { parseIssues } from "../../../labs/contracts.js";

@Injectable({ providedIn: "root" })
export class IssueApi {
  constructor(private readonly http: HttpClient) {}
  search(term: string) {
    return this.http.get<unknown>("/api/issues", { params: { q: term } }).pipe(map(parseIssues));
  }
}
