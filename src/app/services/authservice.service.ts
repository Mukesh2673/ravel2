import { Injectable, NgZone } from "@angular/core";
import { Router, UrlSegmentGroup } from "@angular/router";
import { environment } from "../../environments/environment";
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { JwtHelperService } from "@auth0/angular-jwt";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// ttt

import Swal from "sweetalert2";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Location } from "@angular/common";


@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  defaultBounds: any;
  data: any;
  user: any;
  InputBusinessData=new Subject();
  SharingData = new Subject();
  shareQueryParams = new Subject();
  SkipSharing = new Subject();
  typeOject = new Subject();
  businessTypes = new Subject();
  pagination = new Subject();
  selectedData = new Subject();
  resultData=new Subject();

  constructor(
    public ngZone: NgZone,
    public router: Router,
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) { 
  }

  getToken() {
    let token = "Bearer " + localStorage.getItem("token");
    return token;
  }

  getHeader() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: this.getToken(),
    });

    const httpOptions = {
      headers: headers,
      // params: { 'showLoader': 'yes' }
    };
    return httpOptions;
  }
  loginWithSocailMedia(data: any) {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/socialLogin`, data)
      .pipe(
        map(user => {

          user = user.data;
          if (user && user.token) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(user.token);
            localStorage.setItem("token", user.token);
            //localStorage.setItem("currentUser", JSON.stringify(decodedToken));
            //this.currentUserSubject.next(decodedToken);
          }
          return user;
        })
      );
  }
  // village video api
  villagevideo() {
    return this.http.post(
      `${environment.baseUrl}/admin/getOverAllVideos`,
      this.getHeader()
    );
  }
  //village video api
  getEventdata(lat: any, long: any) {
    return this.http.get(
      `${environment.baseUrl}/events/list?lat=${lat}&long=${long}`
    );
  }
  //slider video api
  slidervideo() {
    let skip = 0;
    let limit = 5;
    // return this.http.get(
    //   `${environment.baseUrl}/admin/getCarouselVideos?skip=${skip}&limit=${limit}`

    // );
    return this.http.get(`${environment.baseUrl}/getOverAllVideos`);
  }
  getperpetualList(lat: any, long: any) {
    let skip = 0;
    let limit = 10;
    return this.http.get(
      `${environment.baseUrl}/perpetualList?lat=${lat}&long=${long}&skip=${skip}&limit=${limit}`
    );
  }
  videoVillage() {
    return this.http.get(`${environment.baseUrl}/getOverAllVideos`);
  }


  uservideoVillage() {
    return this.http.get(
      `${environment.baseUrl}/user/getOverAllVideos`,
      this.getHeader()
    );
  }
  SearchResult(data: any) {
    let rec = {
      search: data,
      skip: 0,
      limit: 10,
    };
    return this.http.post(`${environment.baseUrl}/community/claim/list`, rec);
  }
  SearchResultAuth(data: any) {
    let rec = {
      faith: data.faith,
      // subFaith: data.subFaith,
      search: data.data,
      skip: data.skip ? data.skip : 0,
      limit: data.limit ? data.limit : 10,
      location: data.location
    };
    return this.http.post(
      `${environment.baseUrl}/user/search/community`,
      rec,
      this.getHeader()
    );
  }

  login(obj: any) {
    return this.http.post<any>(`${environment.baseUrl}/auth/login`, obj).pipe(
      map((user) => {
        user = user.data;
        return user;
      })
    );
  }
  successMessage(msg: any, type: any) {
    return Swal.fire({
      icon: type,
      title: msg,
    });
  }
  eventbyUser() {
    console.log("enent by user");

    return this.http.get(
      `${environment.baseUrl}/user/affiliationEvents?skip=0&limit=10`,
      this.getHeader()
    );
  }
  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  // // Sign in with Google
  // GoogleAuth() {
  //   console.log("iam googleauth")
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }
  // // Auth logic to run auth providers
  // AuthLogin(provider:any) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //   .then((result) => {
  //      return result

  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }
  OAuthProvider(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        })
      }).catch((error) => {
        window.alert(error)
      })
  }
  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }
  GetToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            let userToken = idToken;
            resolve(userToken);
          });
        }
      });
    })
  }
  xAccessToeknHeader() {
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    headers = headers.append("Authorization", this.getToken());
    headers.append('Origin', environment.baseUrl);
    let options = {
      headers: headers
    };
    return options;
  }


  BusinessList() {
    let rec = {
      // search: data,
      skip: 0,
      limit: 10,
    };
    return this.http.get(
      `${environment.baseUrl}/comman/getBussinessType?skip=${rec.skip}&limit=${rec.limit}`
    );
  }

  BusinessSearchList(data: any) {
    let rec = {
      search: "",
      skip: 0,
      limit: 10,
    };
    let search = this.http.post(
      `${environment.baseUrl}/community/claim/list?businessId=${data.businessId}&specilizationId=${data.specializationId}&businessType=${data.businessType}`,
      rec
    );
    return search;
  }

  getRequest(url: string, params?: any) {
    return this.http.get(`${environment.baseUrl}${url}?skip=${params.skip}&limit=${params.limit}`);
  }

  getMerchantRequest(url: string, params?: any) {
    params.location=params.location ? JSON.stringify(params.location):'';
    params.lng=params.lng ? params.lng:""
    params.lat=params.lat ? params.lat:""
    let address=params.city || params.state || params.zipCode
    return this.http.get(`${environment.baseUrl}${url}?skip=${params.skip}&limit=${params.limit}&bussinessId=${params.businessId}&tagId=${params.tagId}&location=${params.location}&lat=${params.lat}&lng=${params.lng}&address=${address}`, this.getHeader());
  }


  getCommunityRequest(data: any) {
   let address=data.city || data.state || data.zipCode
    let rec = {
      faith: data.faith,
      subFaith: data.subFaith,
      search: data.data,
      skip: data.skip ? data.skip : 0,
      limit: data.limit ? data.limit : 10,
      country:data.country ?data.country :'',
      address:address,
      long:data.lng,
      lat:data.lat,
      };
  return this.http.post(
      `${environment.baseUrl}/user/search/communitysearch`,
      rec,
      this.getHeader()
    );
  }

  getDetailsById(url: string, params?: any) {
    return this.http.get(`${environment.baseUrl}${url}/${params.id}`, this.getHeader());
  }

//  getHousingRequest(url: string, params?: any) {
//     return this.http.get(`${environment.baseUrl}${url}?skip=${params.skip}&limit=${params.limit}&housingType=${params.housingType}&propertyType=${params.propertyType}&sellStatus=${params.sellStatus}&location=${params.location}&Price=${params.Price}&additionalInformation=${params.additionalInfomation}&bathRoomCount=${params.bathRoomCount}&bedRoomCount=${params.bedRoomCount}&pets=${params.pets}&propertyArea=${params.propertyArea}`, this.getHeader());
//   } 
getEmploymentRequest(url:string,params?:any){
  let record= {
    location:params.Location,
    country:params.country,
    city: params.city,
    companyName: params.companyName,
    jobTitle: params.jobTitle,
    jobType: params.jobType,
    payMin:params.payMin,
    payMax:params.payMax,
    paymentRange:params.payment,
    remotejobs:params.remote,
    industry: params.industry,
    lat:params.lat,
    long:params.lng,
    skip:0,
    limit:params.limit,
    };
    return this.http.post(
      `${environment.baseUrl}/jobLists`,
      record,
      this.getHeader()
    );
  }
getHousingRequest(url: string, params?: any){
  const information=params?.additionalInfomation
  const infoArray = Object.entries(information);
  const filtered = infoArray.filter(([key, value]) => value != '');
  var additionalInfomation={}
  if(filtered.length>0)
  {
    additionalInfomation=params.additionalInfomation
  }
   additionalInfomation=JSON.stringify(additionalInfomation);
  return this.http.get(`${environment.baseUrl}${url}?skip=${params.skip}&limit=${params.limit}&housingType=${params.housingType}&propertyType=${params.propertyType}&sellStatus=${params.sellStatus}&zipCode=${params.zipCode}&Price=${params.Price}&additionalInformation=${additionalInfomation}&bathRoomCount=${params.bathRoomCount}&bedRoomCount=${params.bedRoomCount}&pets=${params.pets}&propertyArea=${params.propertyArea}&location=${params.location}&lat=${params.lat}&lng=${params.lng}`, this.getHeader());
}
  contactUsEmail(obj: any) {
    return this.http.post<any>(`${environment.baseUrl}/user/contactUs`, obj).pipe(
      map((user) => {
        user = user.data;
        return user;
      })
    );
  }
}
