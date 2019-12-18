import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { takeUntil, switchMap } from "rxjs/operators";
import { QueryParamGroup, QueryParamBuilder } from "@ngqp/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlgoliaAPIsService } from "../algolia-apis.service";
import { AlgoliaResponse } from "../algolia-response";
import { UserServiceService } from "../user-service.service";
import { Router } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  public pageOfItems;
  public paramGroup: QueryParamGroup;
  public hitsResult: AlgoliaResponse[] = [];
  public showMessage: Boolean = false;
  public searchedValue;
  public navNaming;
  public showNavNaming: boolean = true;
  items = [];
  constructor(
    private http: HttpClient,
    private algoService: AlgoliaAPIsService,
    private qpb: QueryParamBuilder,
    private userService: UserServiceService,
    private router: Router,
    private guard: AuthGuard
  ) {
    this.paramGroup = qpb.group({
      searchText: qpb.stringParam("query", {
        debounceTime: 250
      }),
      type: qpb.stringParam("type", {
        debounceTime: 250
      }),

      page: qpb.numberParam("page"),

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
            value.type,
            value.page
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
      });

    this.items = Array(150)
      .fill(0)
      .map((x, i) => ({ id: i + 1 }));

    if (this.guard.canActivate) {
      this.navNaming = JSON.parse(localStorage.getItem("user")).username;
      this.showNavNaming = false;
    } else {
      this.navNaming = "";
      this.showNavNaming = true;
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/");
  }

  searching($event) {
    this.userService.record($event.target.value).subscribe(data => {});
  }
}
