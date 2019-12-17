import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { takeUntil, switchMap } from "rxjs/operators";
import { QueryParamGroup, QueryParamBuilder } from "@ngqp/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlgoliaAPIsService } from "../algolia-apis.service";
import { AlgoliaResponse } from "../algolia-response";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  // public todoItems: TodoItem[] = [];
  public paramGroup: QueryParamGroup;
  public hitsResult: AlgoliaResponse[] = [];
  public showMessage: Boolean = false;

  constructor(
    private http: HttpClient,
    private algoService: AlgoliaAPIsService,
    private qpb: QueryParamBuilder
  ) {
    this.paramGroup = qpb.group({
      searchText: qpb.stringParam("query", {
        debounceTime: 250
      }),
      showCompletedItems: qpb.booleanParam("status", {
        serialize: completed => (completed ? "completed" : null),
        deserialize: value => value === "completed"
      })
    });
  }

  ngOnInit() {
    this.hitsResult.length = 0;
    this.paramGroup.valueChanges
      .pipe(
        switchMap(value =>
          this.algoService.searchbyQuery(
            value.searchText,
            value.showCompletedItems
          )
        )
      )
      .subscribe(results => {
        this.hitsResult.length = 0;
        if (results.hits.length > 0) {
          this.hitsResult = results.hits;
          this.showMessage = false;
        } else {
          this.showMessage = true;
        }

        console.log("---results----", results.hits);
      });
  }
}
