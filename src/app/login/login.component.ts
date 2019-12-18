import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserServiceService } from "../user-service.service";
import { AlertService } from "../alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, , Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe(data => {

        if (data.success) {
          localStorage.setItem("id_token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.router.navigateByUrl("user/search");
        } else {
          this.alertService.error(data.message);
        }
      });
  }
}
