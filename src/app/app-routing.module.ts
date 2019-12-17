import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "users/login", component: LoginComponent },
  { path: "users/signup", component: SignupComponent },
  { path: "user/dashboard", component: DashboardComponent },
  { path: "user/search", component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
