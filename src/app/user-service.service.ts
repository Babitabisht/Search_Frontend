import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "./appConfig";
import { Response } from "./response";
import { tokenNotExpired } from "angular2-jwt";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  baseURL: String = "localhost:3000";
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  login(email: String, password: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //  'Authorization': 'Bearer ' + this.getUser().token
      })
    };

    return this.http.post<Response>(
      appConfig.login,
      { email, password },
      httpOptions
    );
  }

  signUp(
    username: String,
    email: String,
    password: String,
    confirmPassword: String
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //  'Authorization': 'Bearer ' + this.getUser().token
      })
    };

    return this.http.post<Response>(
      appConfig.signup,
      {
        username,
        email,
        password,
        confirmPassword
      },
      httpOptions
    );
  }

  record(item: String) {
    this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };
    console.log("---------item-------------", item);

    return this.http.post<Response>(
      appConfig.recordSearchItem,
      { item: item, user: this.user },
      httpOptions
    );
  }

  getHistory() {
    this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };

    console.log(
      "--------this.user.username",
      this.user.username,
      this.user.email
    );
    return this.http.post<Response>(
      appConfig.getHistory,
      { username: this.user.username, email: this.user.email },
      httpOptions
    );
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    const token = localStorage.getItem("id_token");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.authToken = token;
  }
}
