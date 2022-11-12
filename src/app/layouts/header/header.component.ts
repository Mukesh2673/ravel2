import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public val:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.val = localStorage.getItem("marketplace")

  }

  toMarketPlace(){
      document.getElementById("toMarketPlace")?.scrollIntoView();
    }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(["login"]);
  }

  logout() {
    console.log("logout call");
    localStorage.removeItem("token");
    localStorage.removeItem("checked");
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }
}
