import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { HospitalsNearMeComponent } from './Components/hospitals-near-me/hospitals-near-me.component';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { PolicestationsNearMeComponent } from './Components/policestations-near-me/policestations-near-me.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';

const routes: Routes = [
/*   { path: '', redirectTo: '/home', pathMatch: 'full' },
 */  { path: 'home', component: HomepageComponent },
  {path:'hospitals-near-me',component:HospitalsNearMeComponent},
  {path:'police-stations-near-me', component:PolicestationsNearMeComponent},
  {path:'login', component:LoginpageComponent},
  {path:'register',component:RegisterpageComponent},
  {path:'**',component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
