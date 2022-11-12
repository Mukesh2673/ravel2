import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import {
  GET_BUSINESS_LIST,
  PAGE_SIZE,
  SEARCH_TYPES,
  GET_HOUSING,
  SELECT_BUSINESS_TYPE,
  HOUSING_TYPE,
  HOUSING_PROPERTY_TYPE,
  GET_EMPLOYMENT,
  SEARCH_KEYWORKD
} from "../../../../utils/utils";
import { MouseEvent } from "@agm/core";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";
import { createImportSpecifier } from "typescript";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  mouseMarkerOver?: string;
}

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],
})
export class SearchResultComponent implements OnInit, OnDestroy, AfterViewInit {
  searchList: any;
  searchType: any;
  totalItems: any;
  islisting: boolean = true;
  selectHousingSellStatus: any;
  pageNo: any;
  Location: any = ""
  pageSize: number = PAGE_SIZE;
  selectCategoryType: any;
  selectType: any;
  private yourSubscription!: Subscription;

  selectSubCategory: any;
  marArr: any = [];
  countArr: any = [1, 2, 3, 4, 5, 6];
  isList: boolean = true;
  typeId: any;
  subTypeId: any;
  isbox = false;
  isMap = false;
  zoom: number = 2;
  lat: number = 51.673858;
  lng: number = 7.815982;
  searchLocation: any = "";
  responseData: any;
  skip: any;
  keyword: any;
  housingType!: any;
  housingPropertyType!: any;
  businessType!: any;
  getBusiness!: any;
  queryData: any;
  paramObject: any;
  selectSort: any = "";
  listFrom: any;
  listTo: any;
  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.islisting = true;
    this.businessType = SELECT_BUSINESS_TYPE;
    this.housingType = HOUSING_TYPE;
    this.housingPropertyType = HOUSING_PROPERTY_TYPE;
    this.paramObject = this.route.snapshot.queryParams;
    this.queryData = this.paramObject;
    this.selectSort = this.paramObject.sort || '';
    this.searchList = [];
    this.keyword = this.paramObject.keywords;
    this.typeId = this.paramObject.businessId;
    function isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    if ((this.keyword && this.keyword === "Business & Professionals") || this.paramObject.businessId || this.queryData?.hasOwnProperty("businessId")) {
      this.pageNo = this.paramObject.p;
      this.skip = this.pageSize * (this.pageNo - 1);
      if (this.paramObject.location) {
        let location = JSON.parse(this.paramObject.location);
        location = {
          lat: location.lat,
          lng: location.lng
        }

        this.searchMerchant(location);
      }
      if (this.paramObject.address) {
        let address = { address: this.paramObject.address }
        this.searchMerchant(address);

      }
    }
    if ((this.keyword && this.keyword === "Ministries") || this.paramObject.faith || this.queryData?.hasOwnProperty("faith")) {
      this.pageNo = this.paramObject.p;
      this.skip = this.pageSize * (this.pageNo - 1);
      if (this.paramObject.location) {
        let location = JSON.parse(this.paramObject.location);
        location = {
          lat: location.lat,
          lng: location.lng
        }
        this.searchCommunity(location);
      }
      if (this.paramObject.address) {
        let address = { address: this.paramObject.address }
        this.searchCommunity(address);
      }

    }

    if ((this.keyword && this.keyword === "House") || this.paramObject.housingType || this.queryData?.hasOwnProperty("housingType")) {
      this.pageNo = this.paramObject.p;
      this.skip = this.pageSize * (this.pageNo - 1);
      let location = this.paramObject.address
      if (isJson(location)) {
        location = JSON.parse(this.paramObject.address);
        location = {
          lat: location.lat,
          lng: location.lng
        }
      }
      else {
        location = { location: this.paramObject.address }
      }
      this.searchHousing(location);
    }

    if ((this.keyword && this.keyword === "employment") || this.paramObject.employment || this.queryData?.hasOwnProperty("employment")) {
      this.pageNo = this.paramObject.p;
      this.skip = this.pageSize * (this.pageNo - 1);
      let location = this.paramObject.address
      if (isJson(location)) {
        location = JSON.parse(this.paramObject.address);
        location = {
          lat: location.lat,
          lng: location.lng
        }
      }
      else {
        location = { location: this.paramObject.address }
      }
      this.searchEmployment();
    }
    /*     {"location":{"coordinates":[34.2475967,-118.6057265],"type":"Point"}, */
    this.subTypeId = this.paramObject.tagId;
    this.pageNo = this.paramObject.p;

    this.authService.businessTypes.subscribe((item: any) => {
      this.getBusiness = item;
    });
  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.authService.InputBusinessData.subscribe(
      (res: any) => {
        if (res.inputSearch === 'House') {
          return this.searchHousing();
        }
        else if (res.inputSearch === 'Employment') {
          return this.searchEmployment();
        }
        else if (res.inputSearch === 'Ministries') {
          return this.searchCommunity();
        }
        else if (res.inputSearch === 'Business & Professionals') {
          return this.searchMerchant();
        }
        else {
          this.searchList = [];
        }
      })
    this.yourSubscription = this.authService.SharingData.subscribe(
      (res: any) => {
        this.pageNo = res.p;
        this.responseData = res;
        this.skip = this.pageSize * (this.pageNo - 1);

        if (SEARCH_TYPES.business === this.selectType) {
          return this.searchMerchant(this.responseData);
        }
        if (SEARCH_TYPES.ministries === this.selectType) {
          return this.searchCommunity(this.responseData);
        }
        if (SEARCH_TYPES.housing === this.selectType) {
          return this.searchHousing(this.responseData);
        }
        if (SEARCH_TYPES.employment === this.selectType) {
          return this.searchEmployment(this.responseData)
        }
      }
    );

    this.authService.typeOject.subscribe((res: any) => {

      if (res) {
        this.selectType = res;
      }
    });
  }
  onTableSizeChange(event: any = 1) {
    this.pageNo = event;
    this.skip = this.pageSize * (event - 1);
    this.authService.pagination.next({
      skip: this.skip,
      pageNo: this.pageNo,
      selectSort: this.paramObject.sort || this.selectSort
    });
    if (SEARCH_TYPES.business === this.selectType || (this.queryData.keywords === 'businessProfessionals')) {
      return this.searchMerchant(this.responseData);
    }
    if (SEARCH_TYPES.ministries === this.selectType || (this.queryData.keywords === 'ministries')) {
      return this.searchCommunity(this.responseData);
    }
    if (SEARCH_TYPES.housing === this.selectType || (this.queryData.keywords === 'House')) {
      return this.searchHousing(this.responseData);
    }
  }
  searchEmployment(props?: any) {
    let params = {
      jobTitle: props && props.jobTitle ? props.jobTitle : "",
      location: props && props.location ? props.location : "",
      country: props && props.country ? props.country : "",
      city: props && props.city ? props.city : "",
      //state: props && props.state ? props.state : "",
      payMin: props && props.payment ? props.payment[0] : "",
      payMax: props && props.payment ? props.payment[1] : "",
      industry: props && props.industry ? props.industry : "",
      jobType: props && props.jobType ? props.jobType : "",
      //payment: props && props.payment ? props.payment : "",
      remote: props && props.remote ? props.remote : "",
      companyName: props && props.companyName ? props.companyName : "",
      skip: this.skip,
      limit: PAGE_SIZE,
      lat: props && props.lat ? props.lat : "",
      lng: props && props.lng ? props.lng : ""
    }

    let queryObj = { ...this.queryData }
    queryObj.keywords = "employment"
    this.queryData = { ...queryObj }
    this.authService.getEmploymentRequest(GET_EMPLOYMENT, params).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.searchType = "employment"
        this.searchList = res.items;
        this.authService.resultData.next(res.items);
        this.islisting = false;
        this.totalItems = res.total;
        this.searchList.forEach((res: any, index: any) => {
        
          res.photo = res?.images?.length > 0 ? res?.images[0] : null;
          console.log(res.jobBasics)
          this.marArr.push({
            lat: res.jobBasics?.location?.location?.coordinates[0],
            lng: res.jobBasics?.location?.location?.coordinates[1],
            label: index + 1,
            streetAddress: res.address?.streetAddress,
            city: res.address?.city,
            state: res.address?.state,
            country: res.address?.country,
            Business: res.name,
            postalCode: res.address?.postalCode,
            googleAddress: res.address?.googleAddress,
            draggable: false,
          });
        });
        if (this.paramObject.sort || this.selectSort) {
          this.sortList();
        }
      }
      this.listFrom = parseInt(this.skip) + 1;
      this.listTo = parseInt(this.skip + 10) < this.totalItems ? parseInt(this.skip + 10) : this.totalItems;
    });
  }
  searchHousing(props?: any) {
    let params = {
      housingType: props && props.housingType ? props.housingType : "",
      propertyType: props && props.propertyType ? props.propertyType : "",
      sellStatus: props && props.sellStatus ? props.sellStatus : "",
      propertyArea: props && props.propertyArea ? props.propertyArea : "",
      Price: props && props.Price ? props.Price : "",
      additionalInfomation: props && props.additionalInformation ? props.additionalInformation : "",
      pets: props && props.pets ? props.pets : "",
      availableDate: props && props.availableDate ? props.availableDate : "",
      bedRoomCount: props && props.bedRoomCount ? props.bedRoomCount : "",
      bathRoomCount: props && props.bathRooms ? props.bathRooms : "",
      zipCode: props && props.zipCode ? props.zipCode : "",
      location: props && props.location ? props.location : "",
      //city: props && props.city ? props.city : "",
      //state: props && props.state ? props.state : "",
      skip: this.skip,
      limit: PAGE_SIZE,
      lat: props && props.lat ? props.lat : "",
      lng: props && props.lng ? props.lng : ""
    };
    let queryObj = { ...this.queryData }
    queryObj.keywords = "housing"
    this.queryData = { ...queryObj }
    this.authService.getHousingRequest(GET_HOUSING, params).subscribe((res: any) => {

      if (res?.is_success == true) {
        this.searchList = res.items;
        this.islisting = false;
        this.totalItems = res.total;
        this.searchList.forEach((res: any, index: any) => {
          res.photo = res?.images?.length > 0 ? res?.images[0] : null;
          this.marArr.push({
            lat: res.location.coordinates[0],
            lng: res.location.coordinates[1],
            label: index + 1,
            streetAddress: res.address?.streetAddress,
            city: res.address.city,
            state: res.address?.state,
            country: res.address?.country,
            Business: res.name,
            postalCode: res.address?.postalCode,
            googleAddress: res.address?.googleAddress,
            draggable: false,
          });
        });
        if (this.paramObject.sort || this.selectSort) {
          this.sortList();
        }
      }
      this.listFrom = parseInt(this.skip) + 1;
      this.listTo = parseInt(this.skip + 10) < this.totalItems ? parseInt(this.skip + 10) : this.totalItems;
    });
  }
  searchCommunity(props?: any) {

    let data = {
      faith: props && props.faith ? props.faith : this.queryData.faith,
      subFaith: props && props.subFaith ? props.subFaith : this.queryData.subFaith,
      skip: this.skip,
      limit: PAGE_SIZE,
      state: props && props.address ? props.address : "",
      city: props && props.address ? props.address : "",
      zipCode: props && props.address ? props.address : "",
      country: props && props.country ? props.country : "",
      lat: props && props.lat ? props.lat : "",
      lng: props && props.lng ? props.lng : ""
    };
    let queryObj = { ...this.queryData }
    queryObj.keywords = "ministries"
    this.queryData = { ...queryObj }
    this.islisting = true;

    this.authService.getCommunityRequest(data).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.searchType = "ministries"
        this.islisting = false;
        this.searchList = res.items;
        if (this.paramObject.sort || this.selectSort) {
          this.sortList();
        }
        this.totalItems = res.total;
        this.searchList.forEach((res: any, index: any) => {
          this.marArr.push({
            lat: res.address?.location?.coordinates[0],
            lng: res.address?.location?.coordinates[1],
            label: index + 1,
            streetAddress: res.address?.streetAddress,
            city: res.address.city,
            state: res.address?.state,
            country: res.address?.country,
            Business: res.name,
            postalCode: res.address?.postalCode,
            googleAddress: res.address?.googleAddress,
            draggable: false,
          });
        });
      }
      this.listFrom = parseInt(this.skip) + 1;
      this.listTo = parseInt(this.skip + 10) < this.totalItems ? parseInt(this.skip + 10) : this.totalItems;
    });
  }
  searchMerchant(props?: any) {
    let params = {
      businessId: props && props.businessId ? props.businessId : "",
      tagId: props && props.tagId ? props.tagId : "",
      location: props && props.location ? props.location : "",
      city: props && props.address ? props.address : "",
      state: props && props.address ? props.address : "",
      zipCode: props && props.address ? props.address : "",
      country: props && props.country ? props.country : "",
      lat: props && props.lat,
      lng: props && props.lng,
      skip: this.skip,
      limit: PAGE_SIZE
    };

    this.islisting = true;
    let queryObj = { ...this.queryData }
    queryObj.keywords = "Business & Professionals"
    this.queryData = { ...queryObj }
    this.authService.getMerchantRequest(GET_BUSINESS_LIST, params).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.searchType = "Business & Professionals"
        this.islisting = false;
        this.searchList = res.items;
        if (this.paramObject.sort || this.selectSort) {
          this.sortList();
        }
        this.searchList.forEach((res: any, index: any) => {
          this.marArr.push({
            lat: res.address.location.coordinates[0],
            lng: res.address.location.coordinates[1],
            label: index + 1,
            streetAddress: res.address?.streetAddress,
            city: res.address.city,
            state: res.address?.state,
            country: res.address?.country,
            Business: res.name,
            postalCode: res.address?.postalCode,
            googleAddress: res.address?.googleAddress,
            draggable: false,
          });
        });
        this.totalItems = res.total;

      }
      this.listFrom = parseInt(this.skip) + 1;
      this.listTo = (parseInt(this.skip + 10) < this.totalItems) ? parseInt(this.skip + 10) : this.totalItems;
    });
  }
  detail(id: any) {
    if (
      this.responseData?.hasOwnProperty("businessId") ||
      this.queryData?.keywords === "Business & Professionals"
    ) {
      this.router.navigate(["/detail-page"], {
        queryParams: {
          keyword: "Business & Professionals",
          id: id,
        },
      });
    }

    if (this.responseData?.hasOwnProperty("faith") || this.queryData?.keywords === "ministries") {
      this.router.navigate(["/detail-page"], {
        queryParams: {
          keyword: "ministries",
          id: id,
        },
      });
    }

    if (this.responseData?.hasOwnProperty("housingType") || this.queryData?.keywords === "house") {
      this.router.navigate(["/detail-page"], {
        queryParams: {
          keyword: "house",
          id: id,
        },
      });
    }
    if (this.responseData?.hasOwnProperty("employment") || this.queryData?.keywords === "employment") {
      this.router.navigate(["/detail-page"], {
        queryParams: {
          keyword: "house",
          id: id,
        },
      });
    }
  }

  contact(id: any) {
    if (this.responseData?.hasOwnProperty("businessId") || this.queryData?.keywords === "businessProfessionals") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "businessProfessionals",
          id: id,
        },
      });
    }

    if (this.responseData?.hasOwnProperty("faith") || this.queryData?.keywords === "ministries") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "ministries",
          id: id,
        },
      });
    }

    if (this.responseData?.hasOwnProperty("housingType") || this.queryData?.keywords === "house") {
      this.router.navigate(["/contact-page"], {
        queryParams: {
          keyword: "house",
          id: id,
        },
      });
    }
  }

  sortList(evnt?) {
    let obj = { ...this.paramObject }
    obj['sort'] = this.selectSort

    let newArr = [];
    if (obj.sort == 'asc') {
      newArr = this.searchList.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      })
    } if (obj.sort == 'desc') {
      newArr = this.searchList.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
        return 0;
      })
    }

    this.authService.pagination.next({
      skip: this.skip,
      pageNo: this.pageNo,
      selectSort: obj.sort || this.selectSort
    });

  }

  clicklisting() {
    this.isList = true;
    this.isbox = false;
    this.isMap = false;
  }

  clickBox() {
    this.isList = false;
    this.isbox = true;
    this.isMap = false;
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

  setUrl(photo: string) {
    if (photo != null) {
      const [baseUrl, imgUrl] = photo.split('uploads');
      return `https://services.ravel.faith/uploads/${imgUrl}`
    }
    return "";
  }
  ngOnDestroy() {
    this.yourSubscription.unsubscribe();

  }
}
