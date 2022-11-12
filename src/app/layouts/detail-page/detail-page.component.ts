import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { GET_MERCHANT_BY_ID, GET_COMMUNITY_BY_ID, GET_HOUSING_BY_ID } from "../../utils/utils";
import { MouseEvent } from "@agm/core";

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  mouseMarkerOver?: string;
}

@Component({
  selector: "app-detail-page",
  templateUrl: "./detail-page.component.html",
  styleUrls: ["./detail-page.component.css"],
})
export class DetailPageComponent implements OnInit {
  paramObject: any;
  queryData!: any;
  activeTab = "home";
  marArr: any = [];
  isList: boolean = true;
  isbox = false;
  isMap = false;
  zoom: number = 2;
  lat: number = 51.673858;
  lng: number = 7.815982;
  detail: any;
  shimmer!: boolean;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthserviceService,
    private router: Router,

  ) {
    this.paramObject = this.route.snapshot.queryParams;
  }

  ngOnInit(): void {
    this.shimmer = true
    if (this.paramObject.keyword === "businessProfessionals") {
      this.getMerchantDetailsById();
    }
    if (this.paramObject.keyword === "ministries") {
      this.getCommunityDetailsById();
    }
    if (this.paramObject.keyword === "housing") {
      this.getHousingDetailsById();
    }
  }

  getMerchantDetailsById() {
    let params = {
      id: this.paramObject.id,
    };
    this.authService
      .getDetailsById(GET_MERCHANT_BY_ID, params)
      .subscribe((res: any) => {
        this.shimmer = false
        this.detail = res.data;
        this.marArr.push({
          lat: res.data.location.coordinates[0],
          lng: res.data.location.coordinates[1],
          label: 1,
          streetAddress: res.data.address?.streetAddress,
          city: res.data.address.city,
          state: res.data.address?.state,
          country: res.data.address?.country,
          googleAddress: res.data.address?.googleAddress,
          draggable: false,
        });
        this.isList = false;
        this.isbox = false;
        this.isMap = true;

        if (this.detail.photo != null) {
          const [baseUrl, imgUrl] = this.detail.photo.split('uploads');
          this.detail.photo = `https://services.ravel.faith/uploads/${imgUrl}`
        }
      });
  }

  getCommunityDetailsById() {
    let params = {
      id: this.paramObject.id,
    };
    this.authService
      .getDetailsById(GET_COMMUNITY_BY_ID, params)
      .subscribe((res: any) => {
        this.shimmer = false
        this.detail = res.data;
        this.marArr.push({
          lat: res.data.location.coordinates[0],
          lng: res.data.location.coordinates[1],
          label: 1,
          streetAddress: res.data.address?.streetAddress,
          city: res.data.address.city,
          state: res.data.address?.state,
          country: res.data.address?.country,
          googleAddress: res.data.address?.googleAddress,
          draggable: false,
        });
        this.isList = false;
        this.isbox = false;
        this.isMap = true;

        if (this.detail.photo != null) {
          const [baseUrl, imgUrl] = this.detail.photo.split('uploads');
          this.detail.photo = `https://services.ravel.faith/uploads/${imgUrl}`
        }
      });
  }

  getHousingDetailsById() {
    let params = {
      id: this.paramObject.id,
    };
    this.authService
      .getDetailsById(GET_HOUSING_BY_ID, params)
      .subscribe((res: any) => {
        this.shimmer = false
        this.detail = res.data;
        this.marArr.push({
          lat: res.data.location.coordinates[0],
          lng: res.data.location.coordinates[1],
          label: 1,
          streetAddress: res.data.address?.streetAddress,
          city: res.data.address.city,
          state: res.data.address?.state,
          country: res.data.address?.country,
          googleAddress: res.data.address?.googleAddress,
          draggable: false,
        });
        this.isList = false;
        this.isbox = false;
        this.isMap = true;

        let photo = this.detail.images.length > 0 ? this.detail.images[0] : null;
        if (photo != null) {
          const [baseUrl, imgUrl] = photo.split('uploads');
          this.detail.photo = `https://services.ravel.faith/uploads/${imgUrl}`
        } else {
          this.detail.photo = null
        }
      });
  }


  contact(id: any) {

    if (this.paramObject?.keyword === "businessProfessionals") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "businessProfessionals",
          id: id,
        },
      });
    }

    if (this.paramObject?.keyword === "ministries") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "ministries",
          id: id,
        },
      });
    }

    if (this.paramObject.keyword === "housing") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "housing",
          id: id,
        },
      });
    }
  }


  clickgoogleMap() {
    this.isList = false;
    this.isbox = false;
    this.isMap = true;
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
  }
  markers: marker[] = this.marArr;
  clickedMarker(label: any, index: number) {
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  toggleTab(tab: any) {
    this.activeTab = tab;
  }
}
