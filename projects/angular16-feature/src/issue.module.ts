import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { IssueSearchComponent } from "./issue-search.component.js";

@NgModule({
  declarations: [IssueSearchComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [IssueSearchComponent]
})
export class IssueModule {}
