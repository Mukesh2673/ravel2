import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthserviceService } from './services/authservice.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { NgxPaginationModule } from 'ngx-pagination';
import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';
import { NgbNavItem } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
   // NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // NgxPaginationModule,
    NgxShimmerLoadingModule,
    // NgModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDArqSEl_-nTIzV4RTF4Kdp52L5byE9CRI'
    })
    
  ],
  providers: [AuthserviceService,{provide: LocationStrategy, useClass: HashLocationStrategy},NgbNavItem], 
  bootstrap: [AppComponent]
})
export class AppModule { }
