import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Alert, AlertType } from "src/app/alert";
import { AlertService } from "../alert.service";

@Component({
  selector: "alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  id: string;
  alerts: Alert[] = [];
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .getAlert(this.id)
      .subscribe((alert: Alert) => {
        if (!alert.message) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }

        // add alert to array
        this.alerts.push(alert);
      });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return "alert alert-success";
      case AlertType.Error:
        return "alert alert-danger";
      case AlertType.Info:
        return "alert alert-info";
      case AlertType.Warning:
        return "alert alert-warning";
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
