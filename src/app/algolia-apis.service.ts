import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "./appConfig";
import { AlgoliaResponse } from "../app/algolia-response";
@Injectable({
  providedIn: "root"
})
export class AlgoliaAPIsService {
  constructor(private http: HttpClient) {}

  searchbyQuery(searchText: String, showCompletedItems: String) {
    console.log(
      "------------------------searchText-------------------",
      searchText,
      showCompletedItems
    );
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //  'Authorization': 'Bearer ' + this.getUser().token
      })
    };
    console.log(appConfig.a1 + "?query=" + searchText);

    return this.http.get<any>(appConfig.a1 + "?query=" + searchText);
  }
}

// http://hn.algolia.com/api/v1/search
