import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { VideoVillageComponent } from './video-village/video-village.component';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { SearchWrapperComponent } from './search-module/search-wrapper/search-wrapper.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent
  },
  
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'sign-in',
    component:SignInComponent
  },
  {
    path:'video-village',
    component:VideoVillageComponent
  },
  {
    path:'search-wrapper',
    component:SearchComponent
  },
  {
    path:'map-results',
    component:MapComponent
  },
  {
    path:'search',
    component:SearchWrapperComponent
  },
  {
    path:'detail-page',
    component:DetailPageComponent
  },
  {
    path:'contact-page',
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
