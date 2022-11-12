import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { Options } from "ng5-slider";
import {
  SELECT_BUSINESS_TYPE,
  GET_BUSINESS_TYPE,
  GET_BUSINESS_LIST,
  PAGE_SIZE,
  GET_FAITHS,
  SEARCH_TYPES,
  GET_HOUSING,
  HOUSING_TYPE,
  SELL_STATUS,
  HOUSING_PROPERTY_TYPE,
  PETS_ALLOWED,
  PARKING,
  LAUNDRY,
  FLOORING,
  FURNISHED,
  SMOKING,
  POOL,
  HOTTUB,
  EVCHARGING,
  WHEELCHAIRACCESIBLE,
  Business_Filter,
  Ministries_Filter,
  Housing_Filter,
  Employment_Filter,
  Company_Name,
  REMOTE_POSITION,
  JOB_TYPES,
  GET_EMPLOYMENT,
  SEARCH_OPTIONS
} from "../../../../utils/utils";
import { Location } from "@angular/common";
import { ThisReceiver } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-sidebar-search",
  templateUrl: "./sidebar-search.component.html",
  styleUrls: ["./sidebar-search.component.css"],
})
export class SidebarSearchComponent implements OnInit, OnDestroy {
  keyword = 'name';
  value: number = 0;
  highValue: number = 1000;
  priceOptions: Options = {
    floor: 100,
    ceil: 5000
  };
  PropertyOptions:Options = {
    floor: 10,
    ceil: 1000
  };

  paymentOptions:Options = {
    floor: 0,
    ceil: 100000,
 };
  searchLocation: any = "";
  remoteData:any=[];
  jobTypeData:any=[];
  industryData:any=[];
  countryData:any=[];
  companyData:any=[];
  searchData:any=[];
  city:any="";
  state:any="";
  industry:any="";
  jobType:any="";
  companyName:any="";
  remote:any="";
  businessType!: any;
  searchJobs:any="";
  //inputBusiness: any = "";
  inputBusiness:any=""
  filterArray:any="";
  specializationMain = false;
  specializationSubtype: boolean = false;
  housingFilters: boolean = false;
  specializationHousingSubtype: boolean = false;
  ministrySubtype: boolean = false;
  subBusinessItem: any;
  testimage!: any;
  apiStatus = false;
  typeArr!: any;
  selectSubCategory: any = "";
  selectSubCategory1: any = "";
  selectHousingSellStatus: any = "";
  selectCategoryType: any = "";
  zipCode:any="";
  companies:any=[];
  pageNo: any;
  pageSize: any = 10;
  searchList: any;
  islisting: any;
  marArr: any = [];
  housingType: any = "";
  housingPropertyType!: any;
  housingSellStatus!: any;
  availableDate: any = "";
  petsAllowed: any = "";
  selectPetsAllowed: any = "";
  parking: any = "";
  selectedParking: any = "";
  laundry: any = "";
  selectedLanundry: any = "";
  flooring: any = "";
  selectedFlooring: any = "";
  furnished: any = "";
  selectedFurnished: any = "";
  smoking: any = "";
  selectedSmoking: any = "";
  pool: any = "";
  selectedPool: any = "";
  hotTub: any = "";
  selectedHotTub: any = "";
  evecharging: any = "";
  selectedEvecharging: any = "";
  wheelChairAccesible: any = "";
  selectedWheelChairAccesible: any = "";
  bedRooms: any = "";
  bathRooms: any = "";
  priceSlider: any = "";
  paymentSlider:any="";
  propertySize: any = "";
  paramObject: any;
  sort: any
  currentLocation:any="";
  selectedKeyword: any = '--Choose--';
  constructor(
    private authService: AuthserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {

    this.businessType = SELECT_BUSINESS_TYPE;
    this.companies= Company_Name;
    this.jobTypeData=JOB_TYPES;
    this.searchData=SEARCH_OPTIONS
    this.remoteData= REMOTE_POSITION
    this.housingSellStatus = SELL_STATUS;
    this.housingType = HOUSING_TYPE;
    this.housingPropertyType = HOUSING_PROPERTY_TYPE;
    this.paramObject = this.activatedRoute.snapshot.queryParams;
      //this.currentLocation={coordinates:[JSON.parse(this.paramObject.address).lat,JSON.parse(this.paramObject.address).lng]};  
      if (this.paramObject.businessId || (this.paramObject.keywords === 'Business & Professionals') || this.paramObject?.hasOwnProperty("businessId")){
      this.inputBusiness = SEARCH_TYPES.business;
      this.inputBusiness=this.paramObject.keywords;
      this.getBusinessType();
      this.specializationMain = true;
      if (this.paramObject.businessId) {

        this.selectCategoryType = this.paramObject.businessId || "";
        this.specializationSubtype = true;
      }
      if (this.paramObject.tagId) {
        this.selectSubCategory = this.paramObject.tagId || "";
        this.searchLocation = this.paramObject.location;
      }

    }

    if (this.paramObject.faith || (this.paramObject.keywords === 'ministries') || this.paramObject?.hasOwnProperty("faith")) {
      this.inputBusiness = SEARCH_TYPES.ministries;
      this.specializationMain = true;
      this.getFaith();
      this.selectCategoryType = this.paramObject.faith || "";
      this.searchLocation = this.paramObject.location;
    }
    if (this.paramObject.housingType || (this.paramObject.keywords === 'house') || this.paramObject?.hasOwnProperty("housingType")) {
      this.typeArr = this.housingSellStatus;
      this.inputBusiness=this.paramObject.keywords;
      this.selectCategoryType = this.paramObject.housingType || '';
      this.inputBusiness = SEARCH_TYPES.housing;
      this.specializationMain = true;
      this.getHousing();
      if (this.paramObject.housingType) {
        this.specializationSubtype = true;
        this.subBusinessItem = HOUSING_PROPERTY_TYPE;
      }

      if (this.paramObject.propertyType) {
        this.specializationHousingSubtype = true;
        this.selectSubCategory = this.paramObject.propertyType || '';
      }
      if (this.paramObject.sellStatus) {
        this.selectHousingSellStatus = this.paramObject.sellStatus || '';
      }

      this.searchLocation = this.paramObject.location;
    }

    if (this.paramObject.housingType || (this.paramObject.keywords === 'employment') || this.paramObject?.hasOwnProperty("housingType")) {
      this.inputBusiness=SEARCH_TYPES.employment;
      this.searchLocation = this.paramObject.location;
      this.getEmployment(); 
    }
    this.authService.pagination.subscribe((res: any) => {
      this.sort = '';
      this.pageNo = res.pageNo;
      this.sort = res.selectSort || '';
      this.setQueryParams();
    });
    this.filterSubCategory(this.inputBusiness);
    
  }


/* >>>>>>>>>>>>>>>>>>>>>>>>>>Select Location>>>>>>>>>>>>>>>>>>> */
selectCountry(item) {
  this.searchLocation=item.name;
}
onChangeCountry(val: string) {
  this.searchLocation=val;
  }

/*>>>>>>>>>>>>>>>select Business Type>>>>>>>>>>>>> */
selectBusinessType(item){
  this.inputBusiness=item.name;
  this.selectBusiness(item);
  this.onTableDataChange(item);
}
onChangeBusinessType(val:string){
this.inputBusiness=val;
this.selectBusiness(val);
this.onTableDataChange(val);

}

/*>>>>>>>>>>>> jobType>>>>>>>>>>>>>>>>>>>>>>>>> */
selectjobType(item)
  {
    this.jobType=item.name
  }
onChangejobType(val: string) {
  this.jobType=val;
  }
  
/* ==>>>>>>>>>>>>>>>Industry>>>>>>>>>>>>>>>>>>>>> */
selectIndustry(item)
{
 this.industry=item.name
}
onChangeIndustry(val:string){
this.industry=val;
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>Select Remote >>>>>>>>>>>>>>>>>>>> */
selectRemote(item)
{
  this.remote=item;
}
onChangeRemoteSearch(val:string)
{
  this.remote=val;

}
/* >>>>>>>>>>>>>>>>>>>>>>>>>Select Company>>>>>>>>>>>>>>>>>>>> */
selectCompany(item)
{
this.companyName=item.name
}
onChangeCompanySearch(val:string){
this.companyName=val;

/*  this.companies=this.companies.filter((item) =>{ 
return item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
}).slice(0,5); */
}
 ngOnInit(): void {   }
  
  selectBusiness(e: any) {
    this.specializationMain = false;
    this.specializationSubtype = false;
    this.specializationHousingSubtype = false;
    this.housingFilters= false;
    this.selectCategoryType = "";
    this.selectSubCategory = "";
    this.selectHousingSellStatus = "";
    this.searchLocation = "";
    this.authService.typeOject.next({
      inputBusiness: this.inputBusiness,
      selectCategoryType: this.selectCategoryType,
    });
    this.filterSubCategory(this.inputBusiness);
    if (this.inputBusiness === "Business & Professionals"){
      return this.getBusinessType();
    } else if (this.inputBusiness === "Ministries") {
      return this.getFaith();
    }
    else if (this.inputBusiness === "House") {
     this.specializationMain = true;
      return (this.typeArr = this.housingSellStatus);
    }
    else if (this.inputBusiness === "Employment") {
      this.getEmployment();
    }
  }
/* ------------filter category-------- */
 filterSubCategory(selectedType){
  if(selectedType=="Ministries")
  {
    this.filterArray=Ministries_Filter
  }
  else if(selectedType=="Business & Professionals")
  {
    this.filterArray=Business_Filter
  }
  else if(selectedType=="House")
  {
    this.filterArray=Housing_Filter
  }
 else if(selectedType="Employment")
 {
  this.filterArray=Employment_Filter
 }
 else{
  this.filterArray=""
 }
 }
/* --------------------------------- */
  resultBasisOnType(props: any) {
    if (SEARCH_TYPES.business === this.inputBusiness) return props.category;
    if (SEARCH_TYPES.ministries === this.inputBusiness) return props.name;
    if (SEARCH_TYPES.housing === this.inputBusiness) return props.name;
  }

  resultBasisOnCategory(props: any) {
  
    if (SEARCH_TYPES.business === this.inputBusiness) return props.tag;
    if (SEARCH_TYPES.ministries === this.inputBusiness) return props.name;
    if (SEARCH_TYPES.housing === this.inputBusiness) return props.name;
  }

  resultBasisOnHousingStatus(props: any) {

    if (SEARCH_TYPES.housing === this.inputBusiness) return props.name;
  }

  changeSubCategory(event: any) {
    this.selectSubCategory = event.target.value;
    if (
      SEARCH_TYPES.housing === this.inputBusiness &&
      this.selectSubCategory != ""
    ){
      this.housingFilters= true;
      this.petsAllowed = PETS_ALLOWED;
      this.parking = PARKING;
      this.laundry = LAUNDRY;
      this.flooring = FLOORING;
      this.furnished = FURNISHED;
      this.smoking = SMOKING;
      this.pool = POOL;
      this.hotTub = HOTTUB;
      this.evecharging = EVCHARGING;
      this.wheelChairAccesible = WHEELCHAIRACCESIBLE;
    }
    else {
      this.housingFilters= false;
    }

  }
  
  changeHousingSellStatus(event: any) {
    this.selectHousingSellStatus = event.target.value;
    if (
      SEARCH_TYPES.housing === this.inputBusiness &&
      this.selectHousingSellStatus != ""
    ) {
      this.housingFilters= true;
      this.petsAllowed = PETS_ALLOWED;
      this.parking = PARKING;
      this.laundry = LAUNDRY;
      this.flooring = FLOORING;
      this.furnished = FURNISHED;
      this.smoking = SMOKING;
      this.pool = POOL;
      this.hotTub = HOTTUB;
      this.evecharging = EVCHARGING;
      this.wheelChairAccesible = WHEELCHAIRACCESIBLE;
    }
    else {
      this.housingFilters= false;
    }

  }

  onTableDataChange(event: any) {
    this.pageNo = event;
    this.authService.typeOject.next(this.inputBusiness);
    if (SEARCH_TYPES.business === this.inputBusiness){
      this.authService.SharingData.next({
        businessId: this.selectCategoryType,
        tagId: this.selectSubCategory,
        p: this.pageNo,
        country: this.searchLocation,
        city:this.city,
        state:this.city,
        zipCode:this.city
        //city:this.city,
        //state:this.state,
        //lat:this.currentLocation.coordinates[0],
        //lng:this.currentLocation.coordinates[1]
      });
    }

    if (SEARCH_TYPES.ministries === this.inputBusiness) {
      this.authService.SharingData.next({
        faith: this.selectCategoryType,
        subFaith: this.selectSubCategory,
        p: this.pageNo,
        address:this.city,
        country: this.searchLocation,
        //zipCode:this.zipCode,
        //city:this.city,
        //lat:this.currentLocation.coordinates[0],
        //lng:this.currentLocation.coordinates[1]
        });
    }
    if (SEARCH_TYPES.housing === this.inputBusiness) {
      this.authService.SharingData.next({
        housingType: this.selectCategoryType,
        sellStatus: this.selectHousingSellStatus,
        pets: this.selectPetsAllowed,
        additionalInformation: {
          Parking: this.selectedParking,
          EVCharging: this.selectedEvecharging,
          Flooring: this.selectedFlooring,
          Furnished: this.selectedFurnished,
          HotTub: this.selectedHotTub,
          Laundry: this.selectedLanundry,
          Pool: this.selectedPool,
          Smoking: this.selectedSmoking,
          wheelchairAccesible: this.selectedWheelChairAccesible
        },
        availableDate: this.availableDate,
        bedRoomCount: this.bedRooms,
        bathRooms: this.bathRooms,
        Price: this.priceSlider,
        propertyArea: this.propertySize,
        propertyType: this.selectSubCategory,
        location: this.searchLocation,
        //zipCode:this.zipCode,
        //city:this.city,
        //state:this.state,
        p: this.pageNo,
        //lat:this.currentLocation.coordinates[0],
        //lng:this.currentLocation.coordinates[1]
      });

      }

    if (SEARCH_TYPES.employment === this.inputBusiness){
      this.authService.SharingData.next({
        jobTitle:this.searchJobs,
        location: this.searchLocation,
        country:this.searchLocation,
        city:this.city,
        //state:this.state,
        industry:this.industry,
        jobType:this.jobType,
        payment:this.paymentSlider,
        remote:this.remote.name,
        companyName:this.companyName,
        //lat:this.currentLocation.coordinates[0],
        //lng:this.currentLocation.coordinates[1]
      });
      
    }
    let t = this.setQueryParams();
  }
  changeCategory(event: any) {
    this.specializationHousingSubtype=this.selectCategoryType != "Purchase"  && this.inputBusiness == 'House'  
    this.specializationSubtype = false;
    this.selectCategoryType;
    let subcategory = [];
    if (this.typeArr.length != 0) {
      this.typeArr.forEach((type: any) => {
        if (type._id === this.selectCategoryType && SEARCH_TYPES.business === this.inputBusiness) {
          this.specializationSubtype = true;
          return (this.subBusinessItem = type.name);
        }
        else if (type._id === this.selectCategoryType && SEARCH_TYPES.ministries === this.inputBusiness) {
          this.specializationSubtype = true;
          return (this.subBusinessItem = type.subcategory);

        }
        else if (type.name === this.selectCategoryType && SEARCH_TYPES.housing === this.inputBusiness) {
          this.specializationSubtype = true;
          return (this.subBusinessItem = HOUSING_PROPERTY_TYPE);
        }
      });
      if (!event.target.value) {
        this.specializationSubtype = false;
        this.specializationHousingSubtype = false;
        this.housingFilters= false;
      }
    }

  }
removeDuplicateObjectFromArray(array, key) {
    return array.filter((obj, index, self) =>
        index === self.findIndex((el) => (
            el[key] === obj[key]
        ))
    )
}
  getEmployment(){
    let params = {
      skip: 0,
      limit: 100,
    };
  this.authService.getEmploymentRequest(GET_EMPLOYMENT,params).subscribe((res: any) => {
    if(res?.is_success == true) {
          this.authService.resultData.next(res.items);
        this.islisting = false;
        this.searchList.forEach((res: any, index: any) => {
          res.photo = res?.images?.length > 0 ? res?.images[0] : null;
     /*      this.marArr.push({
            lat: res.location?.coordinates[0],
            lng: res.location?.coordinates[1],
            label: index + 1,
            streetAddress: res.address?.streetAddress,
            city: res.address?.city,
            state: res.address?.state,
            country: res.address?.country,
            Business: res.name,
            postalCode: res.address?.postalCode,
            googleAddress: res.address?.googleAddress,
            draggable: false,
          }); */
        });
        }
        
      });
    this.authService.resultData.subscribe(
      (res: any) => {
        this.industryData=this.countryData=this.companies=[];
        res.forEach((t)=>{
          this.industryData=[...this.industryData,{name:t.jobBasics.industry}]
          this.countryData=[...this.countryData,{name:t.jobBasics.location.country}]
          this.companies=[...this.companies,{name:t.jobPost.companyName}]
        })
        this.industryData=this.removeDuplicateObjectFromArray(this.industryData,'name');
        this.countryData=this.removeDuplicateObjectFromArray(this.countryData,'name');
        this.companies=this.removeDuplicateObjectFromArray(this.companies,'name');
      });  
  }
  getHousing(){
      let params = {
        skip: 0,
        limit: 100,
      };
      this.authService.getRequest(GET_HOUSING, params).subscribe((res: any) => {
        if (res?.is_success == true) {
          this.specializationMain = true;
          this.typeArr = res.items;
        }
      });
  }
  getFaith() {
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService.getRequest(GET_FAITHS, params).subscribe((res: any) => {
      if (res?.is_success == true) {
        this.specializationMain = true;
        let subtest=[]
        this.typeArr=res.items;
      }
    });
  }
  getBusinessType() {
    let params = {
      skip: 0,
      limit: 100,
    };
    this.authService.getRequest(GET_BUSINESS_TYPE, params).subscribe(
      (res: any) => {
        if (res?.is_success == true) {
          this.typeArr = res.items;
          this.authService.businessTypes.next(res.items);
          this.specializationMain = true;
        }
        this.apiStatus = true;
        this.typeArr.forEach((type: any) => {
          if (
            type._id === this.selectCategoryType &&
            SEARCH_TYPES.business === this.inputBusiness
          ) {
            return (this.subBusinessItem = type.name);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setQueryParams() {
    if (SEARCH_TYPES.business === this.inputBusiness) {
      const url = this.router
        .createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            businessId: this.selectCategoryType,
            tagId: this.selectSubCategory,
            p: this.pageNo,
            sort: this.sort
          },
        })
        .toString();
      this.location.go(url);
    } else if (SEARCH_TYPES.ministries === this.inputBusiness) {
      const url = this.router
        .createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            faith: this.selectCategoryType,
            tagId: this.selectSubCategory,
            location: this.searchLocation ? this.searchLocation : "",
            p: this.pageNo,
            sort: this.sort,
          },
        })
        .toString();
        this.location.go(url);
    } else if (SEARCH_TYPES.housing === this.inputBusiness) {
      const url = this.router
        .createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            housingType: this.selectCategoryType ? this.selectCategoryType : "",
            propertyType: this.selectSubCategory,
            sellStatus: this.selectHousingSellStatus
              ? this.selectHousingSellStatus
              : "",
            location: this.searchLocation ? this.searchLocation : "",
            p: this.pageNo,
            sort: this.sort
          },
        })
        .toString();
      this.location.go(url);
    }
  }
  
  ngOnDestroy() { }

}
