import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "./appConfig";
import { AlgoliaResponse } from "../app/algolia-response";
@Injectable({
  providedIn: "root"
})
export class AlgoliaAPIsService {
  constructor(private http: HttpClient) {}

  searchbyQuery(searchText: String, type: String, page: number) {
    if (page == undefined || page == null) {
      page = 0;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //  'Authorization': 'Bearer ' + this.getUser().token
      })
    };

    if (type == null) {
      return this.http.get<any>(appConfig.a1 + "?query=" + searchText);
    } else {
      return this.http.get<any>(
        appConfig.a1 +
          "?query=" +
          searchText +
          "&tags=" +
          type +
          "&page=" +
          page
      );
    }
  }
}

// http://hn.algolia.com/api/v1/search
