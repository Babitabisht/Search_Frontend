import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { AlertComponent } from "./alert/alert.component";
import { QueryParamModule } from "@ngqp/core";
import { SearchComponent } from "./search/search.component";
import { JwPaginationComponent } from "jw-angular-pagination";
import { AuthGuard } from "./guards/auth.guard";
@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AlertComponent,
    SearchComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QueryParamModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
