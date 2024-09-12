import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { HospitalsNearMeComponent } from './Components/hospitals-near-me/hospitals-near-me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolicestationsNearMeComponent } from './Components/policestations-near-me/policestations-near-me.component';
import { ArticlesComponent } from './Components/articles/articles.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {MatIconModule} from '@angular/material/icon';
import { QuestionnaireComponent } from './Components/questionnaire/questionnaire.component';
import { RecommendationsComponent } from './Components/recommendations/recommendations.component';
import { ExercisesComponent } from './Components/exercises/exercises.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { CounselorProfilePopupComponent } from './Components/counselor-profile-popup/counselor-profile-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PagenotfoundComponent,
    HomepageComponent,
    HospitalsNearMeComponent,
    PolicestationsNearMeComponent,
    ArticlesComponent,
    QuestionnaireComponent,
    RecommendationsComponent,
    ExercisesComponent,
    CounselorProfilePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient( withInterceptors( [authInterceptor] )),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
