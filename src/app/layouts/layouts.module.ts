import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { VideoVillageComponent } from './video-village/video-village.component';
import { SearchComponent } from './search/search.component';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapComponent } from './map/map.component';
import { SearchWrapperComponent } from './search-module/search-wrapper/search-wrapper.component';
import { SidebarSearchComponent } from './search-module/sidebar-search/sidebar-search/sidebar-search.component';
import { SearchResultComponent } from './search-module/search-result/search-result/search-result.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ContactComponent } from './contact/contact.component';
import { ImgFallbackDirective } from 'ngx-img-fallback';
import { ImagePreloadDirective } from '../services/fallback';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    SignInComponent,
    VideoVillageComponent,
    SearchComponent,
    MapComponent,
    SearchWrapperComponent,
    SidebarSearchComponent,
    SearchResultComponent,
    DetailPageComponent,
    ContactComponent,
    ImagePreloadDirective,

    
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    Ng2SearchPipeModule,
    //BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDArqSEl_-nTIzV4RTF4Kdp52L5byE9CRI'
    }),
    NgxSliderModule,
    Ng5SliderModule
  ],
  providers: [AuthserviceService],

})
export class LayoutsModule { }
