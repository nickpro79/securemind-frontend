import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { HospitalsNearMeComponent } from './Components/hospitals-near-me/hospitals-near-me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolicestationsNearMeComponent } from './Components/policestations-near-me/policestations-near-me.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PagenotfoundComponent,
    HomepageComponent,
    HospitalsNearMeComponent,
    PolicestationsNearMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
