import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "./appConfig";
import { Response } from "./response";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  baseURL: String = "localhost:3000";
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

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //  'Authorization': 'Bearer ' + this.getUser().token
      })
    };

    return this.http.get<Response>(
      appConfig.logout,

      httpOptions
    );
  }
}
