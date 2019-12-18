import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../user-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public history;
  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.userService.getHistory().subscribe(data => {
      console.log("-------in init of history-------", data);
      this.history = data.message;
    });
  }
}
