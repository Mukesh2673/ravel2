import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";

@Component({
  selector: "app-search-wrapper",
  templateUrl: "./search-wrapper.component.html",
  styleUrls: ["./search-wrapper.component.css"],
})
export class SearchWrapperComponent implements OnInit {
  paramObject!: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthserviceService
  ) {}

  ngOnInit() {   
  
  }
}
