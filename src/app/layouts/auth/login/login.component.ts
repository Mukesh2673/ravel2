import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthserviceService } from "src/app/services/authservice.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submitted = false;
  isChecked: any;
  deviceId: any;

  constructor(public router: Router, private authService: AuthserviceService) {}

  ngOnInit() {
    this.deviceId = localStorage.getItem("deviceid");
  }
  checkCheckBoxvalue(event: any) {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      localStorage.setItem("checked", "true");
    } else {
      localStorage.removeItem("checked");
    }
  }
  socialLogin(obj: any) {
    this.authService.loginWithSocailMedia(obj).subscribe(
      (response: any) => {
        this.router.navigate(["/"]);
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }

  public facebookLogin() {
    this.isChecked = localStorage.getItem("checked");
    if (!this.isChecked) {
      this.authService.successMessage(environment.checkboxMessage, "error");

      return;
    }
    this.authService.doFacebookLogin().then(
      (data) => {
        this.authService.GetToken().then(
          (userToken) => {
            let info = {
              email: data.additionalUserInfo.profile.email,
              name: data.additionalUserInfo.profile.name,
            };
            localStorage.setItem("user", JSON.stringify(info));
            let obj = {
              deviceType: "web",
              deviceId: this.deviceId,
              version: "1.0",
              role: "Community",
              socialType: "facebook",
              token: userToken,
            };

            this.socialLogin(obj);
          },
          (error) => {
            if (error) {
              this.authService.successMessage(error.error.message, "error");
            }
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  googleLogin() {
    this.isChecked = localStorage.getItem("checked");
    if (!this.isChecked) {
      this.authService.successMessage(environment.checkboxMessage, "error");

      return;
    }

    this.authService.doGoogleLogin().then(
      (data) => {
        console.log("dataaaa", data);
        this.authService.GetToken().then(
          (userToken) => {
            let info = {
              email: data.additionalUserInfo.profile.email,
              name: data.additionalUserInfo.profile.name,
            };
            localStorage.setItem("user", JSON.stringify(info));
            let obj = {
              deviceType: "web",
              deviceId: this.deviceId || "1",
              version: "1.0",
              role: "Community",
              socialType: "google",
              token: userToken,
            };
            this.socialLogin(obj);
          },
          (error) => {
            if (error) {
              this.authService.successMessage(error.error.message, "error");
            }
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirect() {
    this.isChecked = localStorage.getItem("checked");
    if (!this.isChecked) {
      this.authService.successMessage(environment.checkboxMessage, "error");
      return;
    }
    this.router.navigate(["sign-in"]);
  }

  fellowshipLogin() {
    window.open("https://services.ravel.faith/fellowship/#/login", "_blank");
  }

  merchantLogin() {
    window.open(
      "https://services.ravel.faith/merchant-profile/login",
      "_blank"
    );
  }
}
