import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { AgmCoreModule } from "@agm/core";
import { BrowserModule } from "@angular/platform-browser";
import { MouseEvent } from "@agm/core";
import { Pipe, PipeTransform } from "@angular/core";
import {
  SELECT_BUSINESS_TYPE,
  GET_BUSINESS_TYPE,
  GET_BUSINESS_LIST,
  PAGE_SIZE,
  GET_FAITHS,
  SEARCH_TYPES,
  GET_HOUSING
} from "../../utils/utils";

@Pipe({ name: "appFilter" })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  public pageSize;
  public pageNo: any;
  public totalItems: any;
  public events = 1;
  search: any;
  isbox: boolean = false;
  isList: boolean = true;
  isMap: boolean = false;
  islisting: boolean = true;
  searchList: any;
  maprr: any;
  marArr: any = [];
  latlong: any;
  testimage = "https://picsum.photos/900/450";
  states: Array<any> = [];
  cities: Array<any> = [];
  businessType: any = [];
  selectedCountry: String = "--Choose--";
  selectType: any = "";
  selectCategoryType: any = "";
  selectSubCategory: any = "";
  typeArr: any = [];
  subBusinessItem: any = [];
  apiStatus = false;
  catagoryArr = [];
  currentURL = "";
  specilization1: boolean = false;
  specilization2: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private authService: AuthserviceService,
    private route: Router
  ) {
    this.businessType = SELECT_BUSINESS_TYPE;
    this.pageSize = 5;
    this.currentURL = window.location.href;
  }

  ngOnInit(): void {
    localStorage.setItem("marketplace", "1");
    this.isLoggedIn();
    this.router.queryParams.subscribe((params) => {
      this.search = {
        keyword: params.keywords,
        address: params.address,
      };
    });
    this.SearchList(this.search);
  }

  ngOnDestroy() {
    localStorage.removeItem("marketplace");
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  selectBusiness(event: any) {
    this.specilization1 = false;
    this.specilization2 = false;
    if (this.selectType === "Business & Professionals") {
      this.specilization1 = true;
      return this.getBusinessType();
    } else if (this.selectType === "Ministries") {
      // this.specilization1 = true;
      // this.specilization2 = false;
      return this.getFaith();
    }
  }
  changeCategory(event: any) {
    this.selectCategoryType;
    if (this.typeArr.length != 0) {
      this.specilization2 = true;
      this.typeArr.forEach((type: any) => {
        if (
          type._id === this.selectCategoryType &&
          SEARCH_TYPES.business === this.selectType
        ) {
          this.selectSubCategory = "";
          return (this.subBusinessItem = type.name);
        } else if (
          type._id === this.selectCategoryType &&
          SEARCH_TYPES.ministries === this.selectType
        ) {
          this.specilization2 = false;
          return (this.subBusinessItem = type.subcategory);
        }
      });
    }
    // if (
    //   this.typeArr.length != 0 &&
    //   SEARCH_TYPES.ministries === this.selectType
    // ) {
    //   this.specilization2 = false;
    //   this.typeArr.forEach((type: any) => {
    //     console.log(type.subcategory, "///", this.selectType);
    //     if (type._id === this.selectCategoryType) {
    //       this.selectSubCategory = "";
    //       return (this.subBusinessItem = type.subcategory);
    //     }
    //   });
    // }
  }

  changeSubCategory(event: any) {
    this.selectSubCategory = event.target.value;
  }

  getBusinessType() {
    if (this.apiStatus) return;
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService.getRequest(GET_BUSINESS_TYPE, params).subscribe(
      (res: any) => {
        this.apiStatus = true;
        this.typeArr = res.items;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFaith() {
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService.getRequest(GET_FAITHS, params).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.specilization1 = true;
        this.typeArr = res.items;
        this.totalItems = res.total;
      }
    });
  }

  getHousing(){
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService.getRequest(GET_HOUSING, params).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.typeArr = res.items;
        this.totalItems = res.total;
      }
    });
  }

  onTableDataChange(event: any) {
    this.pageNo = event;
    let skip = this.pageSize * (event - 1);
    if (SEARCH_TYPES.business === this.selectType)
      return this.searchMerchant(this.pageNo, skip);
    if (SEARCH_TYPES.ministries === this.selectType)
      return this.searchCommunity(this.pageNo, skip);

      // if (SEARCH_TYPES.housing === this.selectType)
      // return this.searchCommunity(this.pageNo, skip);
      // if (SEARCH_TYPES.employment === this.selectType)
      // return this.searchCommunity(this.pageNo, skip);
  }
  
  onTableSizeChange(event: any) {
    this.pageNo = event;
    let skip = this.pageSize * (event - 1);
    // this.searchMerchant(this.pageNo, skip);
    if (SEARCH_TYPES.business === this.selectType)
      return this.searchMerchant(this.pageNo, skip);
    if (SEARCH_TYPES.ministries === this.selectType)
      return this.searchCommunity(this.pageNo, skip);

      // if (SEARCH_TYPES.housing === this.selectType)
      // return this.searchMerchant(this.pageNo, skip);
      // if (SEARCH_TYPES.employment === this.selectType)
      // return this.searchMerchant(this.pageNo, skip);
  }

  searchMerchant(pageno: any, skip: any) {
    let params = {
      businessId: this.selectCategoryType,
      tagId: this.selectSubCategory ? this.selectSubCategory : "",
      skip: skip,
      limit: PAGE_SIZE,
    };
    this.islisting = true;
    this.authService
      .getMerchantRequest(GET_BUSINESS_LIST, params)
      .subscribe((res: any) => {
        if (res?.is_success == true) {
          this.islisting = false;
          this.searchList = res.items;
          let mapArr = [];

          this.searchList.forEach((res: any, index: any) => {
            this.marArr.push({
              lat: res.location.coordinates[0],
              lng: res.location.coordinates[1],
              label: index + 1,
              draggable: false,
            });
          });
          this.totalItems = res.total;
        }
      });
  }

  searchCommunity(pageno: any, skip: any) {
    let data = {
      faith: this.selectCategoryType,
      subFaith: this.selectSubCategory,
      skip: skip,
      limit: PAGE_SIZE,
    };
    this.islisting = true;
    this.authService.getCommunityRequest(data).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.islisting = false;
        this.searchList = res.items;
        this.searchList.forEach((res: any, index: any) => {
          this.marArr.push({
            lat: res.location.coordinates[0],
            lng: res.location.coordinates[1],
            label: index + 1,
            draggable: false,
          });
        });
        this.totalItems = res.total;
      }
    });
  }

  resultBasisOnType(props: any) {
    if (SEARCH_TYPES.business === this.selectType) return props.category;
    if (SEARCH_TYPES.ministries === this.selectType) return props.name;
    // if (SEARCH_TYPES.housing === this.selectType) return props.name;
    // if (SEARCH_TYPES.employment === this.selectType) return props.name;
  }

  resultBasisOnCategory(props: any) {
    if (SEARCH_TYPES.business === this.selectType) return props.tag;
    if (SEARCH_TYPES.ministries === this.selectType) return props.name;
    // if (SEARCH_TYPES.housing === this.selectType) return props.name;
    // if (SEARCH_TYPES.employment === this.selectType) return props.name;
  }

  SearchList(search: any) {
    if (this.isLoggedIn()) {
      this.authService.getCommunityRequest({ data: search }).subscribe(
        (response: any) => {
          this.islisting = false;
          this.searchList = response.items;
          this.totalItems = response.total;
          this.searchList.forEach((element: any, index: any) => {
            this.marArr.push({
              lat: element.address.location.coordinates[0],
              lng: element.address.location.coordinates[1],
              label: index + 1,
              draggable: false,
            });
          });
        },
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      this.authService.SearchResult(search).subscribe(
        (response: any) => {
          this.islisting = false;
          this.searchList = response.items;
          this.totalItems = response.total;
          this.searchList.forEach((element: any, index: any) => {
            this.marArr.push({
              lat: element.location.coordinates[0],
              lng: element.location.coordinates[1],
              label: index + 1,
              draggable: false,
            });
          });
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }

  clickBox() {
    this.isList = false;
    this.isbox = true;
    this.isMap = false;
  }
  clicklisting() {
    this.isList = true;
    this.isbox = false;
    this.isMap = false;
  }
  clickgoogleMap() {
    this.isList = false;
    this.isbox = false;
    this.isMap = true;
  }

  //google map
  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: any, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }
  markers: marker[] = this.marArr;
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
