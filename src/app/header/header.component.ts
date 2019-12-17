import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../user-service.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    console.log("logging out");
    this.userService.logout().subscribe(data => {
      if (data.success) this.router.navigateByUrl("users/login");
    });
  }
}
