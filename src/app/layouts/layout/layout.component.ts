import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { AuthserviceService } from "src/app/services/authservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  SEARCH_VALIDATION_MESSAGE,
  SELECT_BUSINESS_TYPE,
  GET_ALL_MERCHANT
} from "../../utils/utils";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit {
  keyword = "name";
  data = [
    {
      id: 1,
      name: "Business & Professionals",
    },
    {
      id: 2,
      name: "House",
    },
    {
      id: 3,
      name: "Employment",
    },
    {
      id: 4,
      name: "Ministries",
    },
  ];

  selectEvent(item) {
    this.selectType=item.name;
  }

  onChangeSearch(val: string) {
    this.selectType=val;
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
  businessType!: any;
  selectType = "";
  searchInputAddress = "";
  cookieValue: any;
  latestEvent: any;
  searchValidateMessage = "";
  items = [];
  perpetualList: any;
  sliderRes: any;
  extraimg = [];
  defaultBounds: any = {
    lat: "",
    lng: "",
  };
  ImagebaseUrl = "https://services.ravel.faith/";
  customOptions: any = {
    loop: true,
    margin: 10,
    width: 100,
    autoplay: true,
    dots: false,
    responsiveClass: true,
    //navText: ['Previous', 'Next'],
    //navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right></i>"' ],
    //navText: ['<img src="./assets/icon/back.png">', '<img src="./assets/icon/next.png">'],
    navText: [
      '<span class="arrowbtn-left"><img src="./assets/icon/back.png"></span>',
      '<span class="arrowbtn-right"><img src="./assets/icon/next.png"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  customOption: any = {
    loop: true,
    margin: 10,
    autoplay: true,
    dots: false,
    responsiveClass: true,
    navElement: [
      '<span class="arrowbtn-left"><img src="./assets/icon/back.png"></span>',
      '<span class="arrowbtn-right"><img src="./assets/icon/next.png"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  constructor(
    private authService: AuthserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.businessType = SELECT_BUSINESS_TYPE;
  }

  ngOnInit(): void {
    this.sliderList();
    this.isLoggedIn();

    // this.getperpetualList();
    // this.getEventRecord();
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#164969",
        },
        button: {
          background: "#ffe000",
          text: "#164969",
        },
      },
      theme: "classic",
      content: {
        message:
          "This website uses cookies to ensure you get the best experience on our website",
        dismiss: "Got it!",
        link: "learn more",
        href: "",
      },
    });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  selectBusiness(e: any) {
    console.log(e.target.value, ">>>", this.selectType);
    if (this.selectType === "Business & Professionals") {
      // return this.getBusinessType();
    }
  }

  getBusiness() {
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService
      .getRequest(GET_ALL_MERCHANT, params)
      .subscribe((res: any) => {
        console.log(res, "get all merchant");
        // if (res?.is_success == true) {
        //   this.specializationMain = true;
        //   this.typeArr = res.items;
        // }
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.defaultBounds = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.getEventRecord();
            this.getperpetualList();
          }
        },
        (error) => alert("Location access denied")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  toScroll() {
    document.getElementById("toScroll")?.scrollIntoView();
  }
  toDiscount() {
    document.getElementById("toDiscount")?.scrollIntoView();
  }

  getEventRecord() {
    // const arrbb = [
    //   {name:'naresh1',image:"https://www.gstatic.com/webp/gallery3/2.png",description:"desc1",email:"naresh1@gmail.com"},
    //   {name:'naresh2',image:"https://www.gstatic.com/webp/gallery3/3.png",description:"desc2",email:"naresh2@gmail.com"},
    //   {name:'naresh3',image:"https://www.gstatic.com/webp/gallery3/5.png",description:"desc3",email:"naresh3@gmail.com"}
    // ]

    if (this.isLoggedIn()) {
      this.authService.eventbyUser().subscribe(
        (response: any) => {
          this.latestEvent = response;
        },
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      this.authService
        .getEventdata(this.defaultBounds.lat, this.defaultBounds.lng)
        .subscribe(
          (response: any) => {
            this.latestEvent = response;
          },
          (error) => {
            console.log("error", error);
          }
        );
    }
  }

  getperpetualList() {
    this.authService
      .getperpetualList(this.defaultBounds.lat, this.defaultBounds.lng)
      .subscribe(
        (response: any) => {
          let items: any = response.items;
          this.perpetualList = items.filter(
            (item: any) => item.perpetualAdd.description != null
          );
        },
        (error) => {
          console.log("error", error);
        }
      );
  }

  //slider result
  sliderList() {
    console.log("iam slider list");
    this.authService.slidervideo().subscribe(
      (response: any) => {
        this.sliderRes = response.items;
        console.log("slider video Result", response);
        // let items: any = response.items;
        // this.perpetualList = items.filter(
        //   (item: any) => item.perpetualAdd.description != null
        // );
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  //end

  restaurants(data: any) {
    switch (data) {
      case "RESTAURANT":
        this.router.navigate(["category"], {
          queryParams: { message: "restaurant" },
        });
        console.log("RESTAURANT");
        break;
      case "SHOP":
        this.router.navigate(["category"], {
          queryParams: { message: "shop" },
        });
        console.log("shop");
        break;
      case "ATTRACTIONS":
        this.router.navigate(["category"], {
          queryParams: { message: "attraction" },
        });
        console.log("ATTRACTIONS");
        break;
      case "FITNESS":
        this.router.navigate(["category"], {
          queryParams: { message: "fitness" },
        });
        console.log("FITNESS");
        break;
      case "BEAUTY":
        this.router.navigate(["category"], {
          queryParams: { message: "beauty" },
        });
        console.log("BEAUTY");
        break;
      case "WARD":
        this.router.navigate(["category"]);
        console.log("WARD");
        break;
      case "GUIDED":
        this.router.navigate(["category"]);
        console.log("GUIDED");
        break;
      case "NEWS":
        this.router.navigate(["category"]);
        console.log("NEWS");
        break;
      case "LIVEFEED":
        this.router.navigate(["category"]);
        console.log("LIVEFEED");
        break;
      case "STUDYTOOL":
        this.router.navigate(["category"]);
        console.log("STUDYTOOL");
        break;
      case "FEATUREDPRODUCT":
        this.router.navigate(["category"]);
        console.log("FEATUREDPRODUCT");
        break;
      case "NEWSENTER":
        this.router.navigate(["category"]);
        console.log("NEWSENTER");
        break;
      case "FILM":
        this.router.navigate(["category"]);
        console.log("FILM");
        break;
      case "WORLDNEWS":
        this.router.navigate(["category"]);
        console.log("WORLDNEWS");
        break;
      case "VILLAGE":
        this.router.navigate(["video-village"]);
        console.log("VIDEOVILLAGE");
        break;
      case "DONATION":
        this.router.navigate(["category"]);
        console.log("DONATION");
        break;
      case "VOLUNTEER":
        this.router.navigate(["category"]);
        console.log("VOLUNTEER");
        break;
      case "SELFASSESMENT":
        this.router.navigate(["category"]);
        console.log("SELFASSESMENT");
        break;
      case "NEEDTO":
        this.router.navigate(["category"]);
        console.log("NEEDTO");
        break;
      case "APOLOGETICS":
        this.router.navigate(["category"]);
        console.log("APOLOGETICS");
        break;
      default:
        console.log("No select");
        break;
    }
  }

  removeMessage() {
    this.searchValidateMessage = "";
  }

  search() {
    if (this.selectType === "") {
      this.searchValidateMessage = SEARCH_VALIDATION_MESSAGE;
      return;
    }
    if (this.searchInputAddress === "") {
      this.getLocation();
      setTimeout(() => {
        if (this.defaultBounds.lat != "") {
          this.searchInputAddress = JSON.stringify(this.defaultBounds);
          this.router.navigate(["/search"], {
            queryParams: {
              keywords: this.selectType,
              location: this.searchInputAddress,
              p: 1,
            },
          });
        }
      }, 1000);
    }
    if (this.selectType !== "" && this.searchInputAddress !== "") {
      console.log('searcgh');
      this.router.navigate(["/search"], {
        queryParams: {
          keywords: this.selectType,
          address: this.searchInputAddress,
          p: 1,
        },
      });
    }
  }
  searchTab(clickdKeyWords: any) {
    this.selectType = clickdKeyWords;
    this.search();
  
    
 
    
  }
}


