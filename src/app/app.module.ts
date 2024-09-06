import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { HospitalsNearMeComponent } from './Components/hospitals-near-me/hospitals-near-me.component';
import { FormsModule } from '@angular/forms';
import { PolicestationsNearMeComponent } from './Components/policestations-near-me/policestations-near-me.component';
import { ArticlesComponent } from './Components/articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PagenotfoundComponent,
    HomepageComponent,
    HospitalsNearMeComponent,
    PolicestationsNearMeComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
