import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "src/app/services/authservice.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-video-village",
  templateUrl: "./video-village.component.html",
  styleUrls: ["./video-village.component.css"],
})
export class VideoVillageComponent implements OnInit {
  videoList: any;
  isvideolist : boolean = true;
  constructor(
    private authService: AuthserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.VideoList();
    this.isLoggedIn();
  }
  isLoggedIn() {return this.authService.isLoggedIn();}
    
  VideoList() {
    if (this.isLoggedIn()) {
      this.authService.uservideoVillage().subscribe(
        (response: any) => {
          this.isvideolist = false;
          this.videoList = response.items;
        },
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      this.authService.videoVillage().subscribe(
        (response: any) => {
          this.videoList = response.items;
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }
}
